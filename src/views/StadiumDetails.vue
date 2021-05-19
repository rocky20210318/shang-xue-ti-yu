<template>
    <div id="stadium-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" :border="false" title="" />
        <div class="img-bg"><van-image width="100%" height="100%" fit="cover" lazy-load :src="details.image_url" /></div>
        <div class="title-data">
            <p class="title">{{ details.name }}</p>
            <div class="rate"><Rate color="#F5A848" readonly void-icon="star" void-color="#C3C3C3" size="0.4rem" v-model="details.comment_avg" /></div>
            <div class="rule"><router-link to="/rule" class="van-multi-ellipsis--l2"><b>入场须知</b><br>1.高血压，心脏病等不适合运动的人群请勿入场</router-link></div>
            <p class="time">营业时间：08:00-22:00</p>
            <div class="tag"><span v-for="text in details.tabs" :key="text">{{ text }}</span></div>
        </div>
        <van-row type="flex" align="center" class="address-data">
            <div class="left">
                <van-row type="flex" align="center" class="title">
                    <img src="../assets/address.png" class="address-img">
                    <p class="">场馆地址</p>
                </van-row>
                <p class="address-text van-ellipsis">{{ details.address }}</p>
            </div>
            <div class="dianhua"><img src="../assets/dianhua.png" ></div>
        </van-row>
        <div class="time-data">
            <p class="title">场地预定</p>
            <div class="time-list">
                <div v-for="(item, index) in timeList" :key="index" class="item">
                    <p class="time">{{ item.time }}<br>周{{ item.day }}</p>
                    <router-link :to="`/venue-site?time=${item.time}&day=${item.day}&type=${type}`" class="button">预定</router-link>
                </div>
            </div>
        </div>
        <div class="comment-list">
            <p class="title">评论</p>
            <div class="comment-list">
                <template v-if="commentList.length !== 0">
                    <van-row v-for="item in commentList" :key="item.id" type="flex" justify="space-between" align="top" class="item" @click="$router.push(`/user-page/${item.id}`)">
                        <div><img :src="item.userImage" class="avatar"></div>
                        <div class="right">
                            <van-row type="flex" justify="space-between" align="top" class="name-time">
                                <p class="name">{{ item.username }}</p>
                                <p class="time">{{ format(item.createdAt,'YYYY-MM-dd HH:mm') }}</p>
                            </van-row>
                            <p class="text">{{ item.content }}</p>
                        </div>
                    </van-row>
                </template>
                <Empty v-else description="暂无评论" />
            </div>
        </div>
    </div>
</template>

<script>
import { getStadiumDetails, getDateStr } from '../services'
import { Rate, Empty } from 'vant'

export default {
    name: 'stadium-details',
    components: {
        Rate,
        Empty
    },
    data () {
        return {
            type: this.$route.query.type,
            details: getStadiumDetails(),
            commentList: [],
            timeList: getDateStr()
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
<style lang="scss">
#stadium-details {
    .van-nav-bar {
        background: transparent;
        .van-icon {
            color: #fff;
        }
    }
}
</style>
<style lang="scss" scoped>
#stadium-details {
    .title-data {
        position: relative;
        z-index: 2;
        margin-top: -200px;
        margin-bottom: 10px;
        padding: 21px 36px;
        background: #fff;
        border-radius: 30px 30px 0 0;
        .title {
            margin-bottom: 10px;
            font-size: 42px;
            color: #303030;
            font-weight: 500;
        }
        .rule {
            margin-top: 10px;
            padding: 23px 32px;
            background: rgba(245, 168, 72, 0.09);
            border-radius: 10px;
            font-size: 30px;
            color: #FF6600;
            // overflow: hidden;
            // opacity: 0.09;
        }
        .time {
            margin: 10px 0;
            font-size: 30px;
            color: #999;
        }
        .tag {
            // margin-bottom: 10px;
            font-size: 24px;
            color: #777;
            span {
                display: inline-block;
                padding: 1px 8px;
                border: 1px solid #888;
                border-radius: 16px;
                margin-right: 18px;
            }
        }
    }
    .address-data {
        padding: 30px 36px;
        margin-bottom: 10px;
        background: #fff;
        .left {
            flex: 1;
            width: 500px;
            margin-right: 100px;
        }
        .title {
            margin-bottom: 10px;
            font-size: 32px;
            color: #303030;
        }
        .address-img {
            width: 28px;
            margin-right: 16px;
        }
        .address-text {
            font-size: 32px;
            color: #777;
        }
        .dianhua {
            // flex: 1;
            width: 50px;
            img {
                margin-top: 20px;
                width: 50px;
            }
        }
    }
    .time-data {
        padding: 45px 36px;
        background: #fff;
        .title {
            margin-bottom: 22px;
            font-size: 32px;
            color: #303030;
            font-weight: 500;
        }
        .time-list {
            overflow: auto;
        }
        .item {
            display: inline-block;
            width: 200px;
            height: 214px;
            margin: 0 9px 20px;
            background: #FFFFFF;
            box-shadow: 0px 4px 11px 3px rgba(0, 0, 0, 0.06);
            border-radius: 28px;
            font-size: 32px;
            font-weight: 500;
            color: #303030;
            text-align: center;
            line-height: 1.4;
            .time {
                padding-top: 20px;
            }
            .button {
                display: block;
                width: 150px;
                height: 58px;
                margin: 26px auto 0;
                background: linear-gradient(147deg, #FF9313 0%, #FF6600 100%);
                box-shadow: 0px 4px 8px 0px rgba(255, 134, 13, 0.38);
                border-radius: 29px;
                color: #fff;
                line-height: 58px;
                font-weight: 400;
            }
        }
    }
    .comment-list {
        margin-top: 20px;
        padding: 0 23px;
        background: #fff;
        .title {
            padding: 30px 0px;
            // border-bottom: 1px solid #E6E6E6;
            line-height: 1;
            font-size: 32px;
            color: #303030;
            .comment-text {
                margin-right: 40px;
                color: #333;
            }
            .readNumber {
                flex: 1;
            }
        }
        .item {
            padding-top: 20px;
        }
        .avatar {
            width: 80px;
            height: 80px;
            margin-right: 30px;
        }
        .name {
            font-size: 30px;
            color: #333;
        }
        .time {
            font-size: 24px;
            color: #999;
        }
        .right {
            flex: 1;
        }
        .text {
            margin-top: 15px;
            margin-right: -30px;
            padding-bottom: 20px;
            padding-right: 30px;
            border-bottom: 1px solid #eee;
            font-size: 26px;
            color: #666;
            line-height: 1.5;
        }
    }
}
</style>
