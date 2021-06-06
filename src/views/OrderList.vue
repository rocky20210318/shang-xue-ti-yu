<template>
    <div id="order-list">
        <Search v-model="keys" show-action placeholder="请输入场馆名称" class="search" @search="search" />
        <Tabs v-model="showType" sticky animated swipeable color="#121314" @change="getOrderList">
            <Tab name="-1" title="全部订单"/>
            <Tab name="0" title="待支付"/>
            <Tab name="1" title="待消费"/>
            <Tab name="2" title="已消费"/>
        </Tabs>
        <div class="list" v-if="listData.length > 0">
            <router-link v-for="item in listData" :key="item.orderId" class="item" :to="`/order-details/${item.orderId}`">
                <van-row type="flex" justify="space-between" align="center" class="title-type">
                    <p class="title">{{ item.name }}</p>
                    <p v-if="item.status === 0" class="type orange">待支付</p>
                    <p v-if="item.status === 1" class="type blue">待消费</p>
                    <p v-if="item.status === 2" class="type">已使用</p>
                </van-row>
                <van-row type="flex" justify="space-between" align="center" class="img-data">
                    <div class="img"><van-image width="100%" height="100%" fit="cover" lazy-load :src="item.image_url" /></div>
                    <div class="data">
                        <div class="type"><span class="labe">项目：</span>{{ typeName(item.category_id) }}</div>
                        <div><span class="labe">场次：</span>{{ item.activeList[0].venue + ' ' + item.activeList[0].time }}</div>
                    </div>
                </van-row>
                <van-row type="flex" justify="space-between" align="center" class="time-price">
                    <p class="time">下单日期：{{ format(item.createdAt, 'YYYY-MM-dd') }}</p>
                    <p class="lable">总价:</p>
                    <p class="price">¥{{ item.price * item.activeList.length }}</p>
                </van-row>
            </router-link>
        </div>
        <div v-else class="no-list">
            <div class="img"><img src="../assets/kongzhuangtai-1.png" alt=""></div>
            <p class="text">暂时没有订单</p>
        </div>
        <basic-footer/>
    </div>
</template>

<script>
import { format } from '../utils/index'
import typeList from '../json/sports-category'
import { getOrderList } from '../services'
import { Search, Tabs, Tab } from 'vant'

export default {
    name: 'order-list',
    components: {
        Search,
        Tabs,
        Tab
    },
    data () {
        return {
            keys: '',
            showType: this.$route.query.showType || '-1',
            listData: []
        }
    },
    computed: {
    },
    async created () {
        this.getOrderList()
    },
    mounted () {
    },
    methods: {
        format (date, fmt) {
            // console.log(new Date(date).getTime())
            return format(new Date(date), fmt)
        },
        typeName (id) {
            const data = typeList.filter(i => i.value + '' === id)
            return data[0].text
        },
        search () {},
        getOrderList () {
            const status = Number(this.showType) === -1 ? '' : Number(this.showType)
            // console.log(getOrderList(status))
            this.listData = getOrderList(status)
        }
    }
}
</script>
<style lang="scss" scoped>
#order-list{
    .list {
        .item {
            display: block;
            margin: 20px 36px;
            padding: 35px 38px;
            background: #fff;
            box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.06);
            border-radius: 30px;
            line-height: 1;
        }
        .title-type {
            .title {
                font-size: 32px;
                font-weight: 500;
                color: #303030;
            }
            .type {
                // width: 90px;
                // height: 40px;
                padding: 6px 14px;
                background: #D8D8D8;
                border-radius: 27px;
                font-size: 24px;
                color: #fff;
                text-align: center;
                &.orange {
                    background: #FF6600;
                }
                &.blue {
                    background: #355AAF;
                }
            }
        }
        .img-data {
            margin: 30px 0;
            .img {
                width: 209px;
                height: 139px;
                margin-right: 25px;
            }
            .data {
                flex: 1;
                font-size: 32px;
                color: #303030;
                .labe {
                    color: #777;
                }
                .type {
                    margin-bottom: 24px;
                }
            }
        }
        .time-price {
            font-size: 32px;
            color: #999;
            .price {
                font-size: 44px;
                color: #355AAF;
            }
            .lable {
                flex: 1;
                margin-right: 10px;
                color: #303030;
                text-align: right;
            }
        }
    }
    .no-list {
        padding-top: 100px;
        text-align: center;
        .img {
            img {
                width: 500px;
            }
        }
        .text {
            font-size: 30px;
            color: #666;
        }
    }
}
</style>
