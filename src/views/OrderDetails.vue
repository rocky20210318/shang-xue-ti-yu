<template>
    <div id="order-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="预定详情" />
        <div class="data">
            <p class="title">场地信息</p>
            <van-row type="flex" align="center" class="row">
                <p class="label">项目：</p>
                <p class="text">篮球</p>
            </van-row>
            <van-row type="flex" align="center" class="row">
                <p class="label">日期：</p>
                <p class="text">篮球</p>
            </van-row>
            <van-row type="flex" align="top" class="row">
                <p class="label">场次：</p>
                <div class="text">
                    <p>篮球</p>
                    <p>篮球</p>
                </div>
            </van-row>
        </div>
        <div class="data">
            <p class="title">客户信息</p>
            <van-row type="flex" align="center" class="row">
                <p class="label">手机号码：</p>
                <Field type="tel" v-model="phone" placeholder="请输入联系手机号" />
            </van-row>
            <van-row type="flex" align="center" class="row">
                <p class="label">用户姓名：</p>
                <Field v-model="name" placeholder="请输入联系人" />
            </van-row>
        </div>
        <div class="footer">
            <van-row type="flex" justify="space-between" align="center" class="order">
                <p class="amount"><span>￥0</span></p>
                <Button type="primary" hairline round color="linear-gradient(147deg, #FF9313 0%, #FF6600 100%)" class="button">立即支付</Button>
            </van-row>
        </div>
    </div>
</template>

<script>
// import { getDateStr } from '../services'
import { Button, Field } from 'vant'

export default {
    name: 'order-details',
    components: {
        Button,
        Field
    },
    data () {
        return {
            phone: '',
            name: ''
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
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
