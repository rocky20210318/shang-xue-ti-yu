<template>
    <div id="venue-site">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="场地预定" />
        <div class="day-list">
            <div v-for="(item, index) in dayList" :key="index" :class="['item', {'active': item.time === activeTime}]" @click="clickTime(item.day)">
                <p class="week">周{{ item.day }}</p>
                <p class="day">{{ item.time }}</p>
            </div>
        </div>
        <div class="body">
            <ul class="time-list">
                <li v-for="item in timeList" :key="item"><p class="item">{{ item }}</p></li>
            </ul>
            <div class="book-list">
                <ul v-for="item in listData" :key="item.text" class="list">
                    <li class="site-item">{{ item.text }}</li>
                    <li
                        v-for="data in item.list"
                        :key="item.text + data.time + data.price"
                        :class="['item', {'active' : data.status === 1}, {'disable' : data.status === 2}]"
                        @click="clickBookList(item.text, data)"
                    >¥{{ data.price }}</li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <van-row v-if="activeList.length === 0" type="flex" justify="space-between" align="center" class="legend">
                <div class="item">
                    <div class="round" />
                    <p class="title">可预定</p>
                </div>
                <div class="item ">
                    <div class="round active" />
                    <p class="title">已选择</p>
                </div>
                <div class="item">
                    <div class="round disable" />
                    <p class="title">已预定</p>
                </div>
            </van-row>
            <template v-else>
                <van-row type="flex" justify="center" align="center" class="book-orderinfo">
                    <div v-for="item in activeList" :key="item.time + item.venue" class="item">
                        <p class="time">{{ item.time }}</p>
                        <p class="text">{{ item.venue }}</p>
                    </div>
                </van-row>
                <van-row type="flex" justify="space-between" align="center" class="order">
                    <p class="amount"><span>￥</span>{{ total }}</p>
                    <Button type="primary" hairline round :loading="isButtinLoading" loading-text="订单生成中..." color="#355AAF" class="button" @click="addOrder">预定场地</Button>
                </van-row>
            </template>
        </div>
    </div>
</template>

<script>
// import { getVenueList } from './services'
import typeList from '../json/sports-category'
import { getDateStr, getStadiumDetails, addOrder } from '../services'
import { Button } from 'vant'

export default {
    name: 'venue-site',
    components: {
        Button
    },
    data () {
        return {
            isButtinLoading: false,
            activeTime: this.$route.query.time,
            // type: Number(this.$route.query.type),
            dayList: getDateStr(),
            details: getStadiumDetails(),
            typeList: typeList,
            listData: [],
            timeList: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        }
    },
    computed: {
        activeList () {
            const activeList = []
            this.listData.forEach(i => {
                i.list.forEach(j => {
                    if (j.status === 1) {
                        activeList.push({
                            venue: i.text,
                            time: j.time
                        })
                    }
                })
            })
            return activeList
        },
        total () {
            return this.details.price * this.activeList.length
        },
        type () {
            return Number(this.details.category_id)
        }
    },
    async created () {
        this.listData = this.getListData()
    },
    mounted () {
    },
    methods: {
        // 获取场地列表
        getListData () {
            const listData = []
            const list = typeList.filter(i => i.value === this.type)
            // console.log(list)
            const nub = list[0].venueSite.length
            const id = Number(this.details.view_num)
            const data = list[0].venueSite[id % nub]
            const venueSite = this.timeList.map(i => {
                return {
                    time: i,
                    status: 0,
                    price: this.details.price
                }
            })
            data.forEach(i => {
                listData.push({
                    text: i,
                    list: JSON.parse(JSON.stringify(venueSite))
                })
            })
            // console.log(listData)
            return listData
        },
        // 切换日期
        clickTime (data) {
            this.activeDay = data
            this.listData = this.getListData()
        },
        // 选中场地
        clickBookList (text, data) {
            const status = data.status
            if (this.activeList.length >= 4 && status === 0) {
                this.$toast('一次最多选择4场地或时段')
                return false
            }
            switch (status) {
            case 0:
                // this.activeList.push(list)
                data.status = 1
                break
            case 1:
                data.status = 0

                break
            }
            // return list
        },
        // 创建订单
        addOrder () {
            this.isButtinLoading = true
            const date = new Date()
            const orderId = date.getTime()
            const data = {
                orderId,
                createdAt: date,
                orderAt: this.activeTime,
                activeList: this.activeList,
                status: 0,
                ...this.details
            }
            addOrder(data)
            this.$toast.loading({
                message: '订单生成中',
                forbidClick: true,
                duration: 1500,
                onClose: () => {
                    this.isButtinLoading = false
                    this.$router.replace(`/order-details/${orderId}`)
                }
            })
            // console.log(data)
            // addOrder()
        }
    }
}
</script>
<style lang="scss" scoped>
#venue-site {
    .day-list {
        margin: 10px 0;
        padding: 35px 20px;
        background: #fff;
        overflow: auto;
        white-space: nowrap;
        .item {
            display: inline-block;
            width: 120px;
            margin: 0 20px;
            text-align: center;
            color: #303030;
            opacity: 0.6;
            &.active {
                position: relative;
                opacity: 1;
                &::after {
                    content: ' ';
                    display: block;
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    right: 0;
                    width: 34px;
                    height: 7px;
                    margin: auto;
                    background: #355AAF;
                    border-radius: 4px;
                }
            }
            .week {
                font-size: 38px;
                font-weight: 500;
            }
            .day {
                font-size: 24px;
            }
        }
    }
    .body {
        position: relative;
        padding-left: 130px;
        padding-bottom: 40px;
        height: 1240px;
        margin-bottom: 130px;
        background: #fff;
        overflow: auto;
        text-align: center;
        .time-list {
            position: absolute;
            top: 0;
            left: 0;
            width: 130px;
            height: 100%;
            padding-top: 94px;
            background: #fff;
            font-size: 32px;
            color: #999;
            line-height: 80px;
            .item {
                height: 80px;
                margin-bottom: 10px;
            }
        }
        .book-list {
            position: absolute;
            // width: 100%;
            width: 620px;
            font-size: 32px;
            color: #999;
            line-height: 78px;
            white-space: nowrap;
            text-align: left;
            overflow: auto;
            .list {
                display: inline-block;
                // width: ;
                text-align: center;
                .site-item {
                    height: 94px;
                    font-size: 32px;
                    color: #303030;
                    line-height: 94px;
                }
                .item {
                    width: 141px;
                    height: 76px;
                    margin: 0 10px 10px 0;
                    border: 1px solid #979797;
                    border-radius: 39px;
                    &.active {
                        background: #355AAF;
                        border-color: #355AAF;
                        border-radius: 39px;
                        color: #fff;
                    }
                    &.disable {
                        background: #ECECEC;
                        border-color: #ECECEC;
                        border-radius: 39px;
                        color: #ECECEC;
                    }
                }
            }
        }
    }
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        box-shadow: 10px 15px 10px 10px rgba(0, 0, 0, 0.5);
        .legend {
            padding: 20px 90px;
            font-size: 32px;
            color: #303030;
            text-align: center;
            .round {
                width: 42px;
                height: 42px;
                margin: 0 auto 10px;
                box-sizing: border-box;
                border: 2px solid #979797;
                border-radius: 50%;
                &.active {
                    background: #355AAF;
                    border-color: #ECECEC;
                }
                &.disable {
                    background: #ECECEC;
                    border-color: #ECECEC;
                }
            }
        }
        .book-orderinfo {
            padding: 20px;
            .item {
                width: 160px;
                margin: 0 10px 0;
                border: 1px solid #355AAF;
                border-radius: 3px;
                font-size: 26px;
                color: #355AAF;
                text-align: center;
                .time {
                    padding: 10px 0;
                    background: #355AAF;
                    color: #fff;
                }
                .text {
                    padding: 20px 0;
                }
            }
        }
        .order {
            padding: 20px 20px 20px;
            border-top: 1px solid #eee;
            .amount {
                font-size: 38px;
                color: #355AAF;
            }
        }
    }
}
</style>
