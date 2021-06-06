<template>
    <div id="order-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="预定详情" />
        <div class="data">
            <p class="title">场地信息</p>
            <van-row type="flex" align="center" class="row">
                <p class="label">项目：</p>
                <p class="text">{{ typeName }}</p>
            </van-row>
            <van-row type="flex" align="center" class="row">
                <p class="label">日期：</p>
                <p class="text">{{ orderDetails.orderAt }}</p>
            </van-row>
            <van-row type="flex" align="top" class="row">
                <p class="label">场次：</p>
                <div class="text">
                    <p v-for="item in orderDetails.activeList" :key="item.time + item.venue">{{ item.venue + ' ' + item.time}}</p>
                </div>
            </van-row>
        </div>
        <div class="data">
            <p class="title">客户信息</p>
            <van-row type="flex" align="center" class="row">
                <p class="label">手机号码：</p>
                <Field type="tel" :disabled="orderDetails.status === 1" v-model="phone" placeholder="请输入联系手机号" />
            </van-row>
            <van-row type="flex" align="center" class="row">
                <p class="label">用户姓名：</p>
                <Field v-model="name" :disabled="orderDetails.status === 1" placeholder="请输入联系人" />
            </van-row>
        </div>
        <!-- <p class="prompt">预订成功后不接受退改</p> -->
        <div class="footer">
            <van-row type="flex" justify="space-between" align="center" class="order">
                <p class="amount"><span>￥{{ total }}</span></p>
                <Button v-if="orderDetails.status === 0" type="primary" hairline round :loading="isButtinLoading" loading-text="支付中" color="linear-gradient(147deg, #FF9313 0%, #FF6600 100%)" class="button" @click="pay">立即支付</Button>
                <Button v-else type="primary" hairline round disabled color="#355AAF" class="button">已支付</Button>
            </van-row>
        </div>
    </div>
</template>

<script>
import typeList from '../json/sports-category'
import { getOrder, getOrderList } from '../services'
import { Button, Field, Dialog } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'order-details',
    components: {
        Button,
        Field
    },
    data () {
        const id = this.$route.params.id
        return {
            isButtinLoading: false,
            phone: AV.User.current().get('mobilePhoneNumber'),
            name: '',
            id: id,
            orderDetails: getOrder(id)
        }
    },
    computed: {
        typeName () {
            const data = typeList.filter(i => i.value + '' === this.orderDetails.category_id)
            return data[0].text
        },
        total () {
            return this.orderDetails.price * this.orderDetails.activeList.length
        }
    },
    async created () {
        this.getOrder()
    },
    mounted () {
    },
    methods: {
        getOrder () {
            this.orderDetails = getOrder(this.id)
            // console.log(this.orderDetails)
        },
        pay () {
            const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/
            if (this.phone !== '') {
                if (!PHONE_EXP.test(this.phone)) {
                    this.$toast('手机号格式不正确')
                    return false
                }
            } else {
                this.$toast('请输入联系手机号')
                return false
            }
            if (this.name === '') {
                this.$toast('请输入联系人姓名')
                return false
            }
            Dialog.confirm({
                title: '提示',
                message: '预订成功后不接受退改。'
            }).then(() => {
                const phone = AV.User.current().get('mobilePhoneNumber')
                const userId = AV.User.current().id
                this.isButtinLoading = true
                setTimeout(() => {
                    if (phone === '17896316684') {
                        const orderList = getOrderList()
                        // console.log(orderList)
                        orderList.forEach(i => {
                            if (Number(this.orderDetails.orderId) === i.orderId) i.status = 1
                        })
                        localStorage.setItem('order-' + userId, JSON.stringify(orderList))
                        this.$router.push('/order-list')
                    } else {
                        this.$router.push('/credit-card')
                    }
                }, 1500)
            }).catch(() => {
                // on cancel
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#order-details{
    .data {
        margin-bottom: 10px;
        padding: 50px 55px 0;
        background: #fff;
        font-size: 32px;
        color: #303030;
        line-height: 1;
        p {
            margin-bottom: 30px;
        }
        .title {
            font-weight: 500;
        }
        .label {
            // flex: 1;
            // width: 00px;
            color: #777777;
        }
        .van-cell {
            margin-bottom: 30px;
            width: 300px;
            padding: 0;
            height: auto;
            line-height: 1;
            font-size: 32px;
        }
    }
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        box-shadow: 10px 15px 10px 10px rgba(0, 0, 0, 0.5);
    }
    .order {
        padding: 20px 20px 20px;
        border-top: 1px solid #eee;
        .amount {
            font-size: 28px;
            span {
                font-size: 38px;
                color: #355AAF;
            }
        }
    }
}
</style>
