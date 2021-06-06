<template>
    <div id="my">
        <div class="user-data">
            <!-- <van-row type="flex" align="center" justify="space-between" class="">
                <p class="title">我的</p>
                <router-link to="/message-list"><van-icon name="comment-o" size=".65rem" color="#fff" class="comment-o" /></router-link>
            </van-row> -->
            <van-row type="flex" align="center">
                <div>
                    <img v-if="!userData.userImage" class="user-img" :src="userData.userImage" alt="">
                    <img v-else class="user-img" :src="userData.userImage" alt="">
                </div>
                <router-link v-if="!userData.username" class="user-name" to="/login">登陆/注册</router-link>
                <template v-else>
                    <router-link to="/edit-user">
                        <p class="user-name">{{ userData.username }}</p>
                        <div class="vip">
                            <span>{{ userData.remarks || '点击编辑' }}</span>
                            <van-icon color="#eee" size="16px" name="edit" class="icon" />
                            <!-- <Button size="mini" color="linear-gradient(180deg,#fcd755 0%,#d81e06 100%)" class="button" to="member">点击编辑</Button> -->
                        </div>
                    </router-link>
                    <!-- <router-link to="/edit-user"><van-icon class="edit" color="#fff" size="24  px" name="edit" /></router-link> -->
                </template>
            </van-row>
        </div>
        <div><router-link to="/"><img src="" alt=""></router-link></div>
        <CellGroup class="features">
            <!-- <Cell title="地址管理" is-link to="/address-list?switchable=false" /> -->
            <Cell title="我的订单" is-link to="/order-list" />
            <Cell title="我的收藏" is-link to="/collect" />
            <Cell title="关注用户" is-link :to="`/watch-list/${userId}`" />
            <Cell title="消息" is-link to="/message-list" />
            <Cell title="联系客服" is-link @click="customer" />
            <Cell title="设置" is-link to="/set" />
        </CellGroup>
        <p class="privacy-agreement">查看用<router-link to="/agreement">《用户协议》</router-link>及<router-link to="/privacy">《隐私协议》</router-link></p>
        <basic-footer />
    </div>
</template>

<script>
import { Cell, CellGroup, Dialog } from 'vant'
import { logOut } from '../services'
import AV from 'leancloud-storage'

export default {
    name: 'my',
    components: {
        Cell,
        CellGroup,
        [Dialog.Component.name]: Dialog.Component
    },
    data () {
        return {
            userId: AV.User.current().id,
            userData: {
                username: '',
                remarks: ''
            },
            collectionNub: 0
        }
    },
    computed: {
    },
    async created () {
        await this.getUserData()
        // console.log(getCouponsList())
        // this.collectionNub = getCouponsList().length
    },
    mounted () {
    },
    methods: {
        async getUserData () {
            console.log(this.userId)
            const User = AV.Object.createWithoutData('_User', this.userId)
            await User.fetch().then(data => {
                this.userData = {
                    username: data.get('username'),
                    userImage: data.get('userImage'),
                    remarks: data.get('remarks')
                }
                console.log(this.userData)
            })
        },
        logOut () {
            this.$toast('已退出登陆')
            logOut()
            setTimeout(() => {
                this.$router.push('/home')
            }, 1.5 * 1000)
        },
        customer () {
            Dialog({
                title: '提示',
                message: '客服热线：020-84581103'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#my {
    padding: 0 24px;
    .setting {
        margin-top: 10px;
        float: right;
    }
    .privacy-agreement {
        margin-top: 50px;
        font-size: 24px;
        color: #888;
        text-align: center;
        a {
            color: #121212;
        }
    }
    .user-data {
        height: 400px;
        margin: 0 -24px;
        padding: 130px 36px 0;
        box-sizing: border-box;
        background: url('../assets/my-top-bg.png') no-repeat;
        background-size: 100% auto;
        .title {
            padding: 30px 0 30px;
            font-size: 36px;
            color: #fff;
        }
        .user-img {
            width: 120px;
            height: 120px;
            // padding: 20px;
            margin-right: 32px;
            box-sizing: border-box  ;
            // background: #fff;
            border-radius: 50%;
            vertical-align: top;
        }
        .user-name {
            margin-right: 10px;
            font-size: 36px;
            font-size: 500;
            line-height: 1;
            color: #fff;
            .icon {
                position: relative;
                top: 6px;
                left: 15px;
            }
        }
        .vip {
            position: relative;
            margin-top: 6px;
            color: #eee;
            line-height: 1;
            font-size: 28px;
            // text-decoration: line-through;
            .icon {
                position: relative;
                top: 6px;
                left: 15px;
            }
        }
        .coupon {
            margin-top: 66px;
            padding: 30px;
            color: #fff;
            line-height: 1;
            .icon {
                margin-right: 10px;
            }
            .title {
                margin: 0;
                // margin-left: 10px;
                padding: 0;
                font-size: 28px;
                font-weight: 500;
            }
            .quantity {
                margin-top: 10px;
                font-size: 24px;
                span {
                    margin-right: 16px;
                    font-size: 40px;
                    font-weight: 700;
                }
            }
            .button {
                padding: 14px 34px;
                background-image: linear-gradient(135deg,#ffb990 0%, #ff3241 100%);
                border-radius: 32px;
                font-size: 28px;
                font-weight: 700;
            }
        }
    }
    .order {
        margin: 0px 0 20px;
        padding-bottom: 25px;
        box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        background-color: #ffffff;
        // border-radius: 8px;
        .top {
            padding: 40px 40px 0px 40px;
        }
        .title {
            font-size: 36px;
            color: #121314;
        }
        .all-order {
            font-size: 28px;
            color: #888;
        }
        .icon {
            position: relative;
            top: 3px;
        }
        .img {
            margin-top: 20px;
            // height: 48px;
            // line-height: 48px;
            text-align: center;
            // margin-bottom: 20px;
        }
        img {
            max-width: 150px;
            // min-height: 48px;
            vertical-align: middle;
        }
        .text {
            position: relative;
            top: -40px;
            text-align: center;
        }
    }
    .banner {
        width: 100%;
        // height: 134px;
        border-radius: 8px;
        // background: #000;
        img {
            width: 100%;
            vertical-align: top;
        }
    }
    .features {
        margin: 20px 0 30px;
        background-color: #ffffff;
        box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        overflow: hidden;
        .grid {
            // padding: 0 40px;
        }
        .title {
            padding: 32px 0 40px 26px;
            font-size: 36px;
            color: #121314;
        }
        .item {
            img {
                max-width: 50px;
                // max-height: 36px;
                margin-bottom: 10px;
            }
            .text {
                font-size: 24px;
                color: #4a4a4a;
            }
        }
    }
}
</style>
