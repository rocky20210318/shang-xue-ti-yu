<template>
    <div id="collect">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="收藏场地" />
        <template v-if="listData.lenght !== 0">
            <!-- <router-link v-for="item in listData" :key="item.id" :to="`/stadium-details/${item.view_num}`" class="item"> -->
            <van-row v-for="item in listData" :key="item.id" type="flex" align="center" class="item" @click="jump(item)">
                <div class="img"><van-image width="100%" height="100%" fit="cover" lazy-load :src="item.image_url" /></div>
                <div class="rigth">
                    <p class="title van-ellipsis">{{ item.name }}</p>
                    <div class="rate"><Rate color="#F5A848" readonly void-icon="star" void-color="#C3C3C3" size="0.4rem" v-model="item.comment_avg" /></div>
                    <div class="tag"><span v-for="text in item.tabs" :key="text">{{ text }}</span></div>
                    <div class="mod3 flex-col">
                        <div class="outer1 flex-col"><span class="txt4">订</span></div>
                        <span class="word8">场地预定{{ item.price }}元起</span>
                    </div>
                </div>
                </van-row>
        </template>
        <Empty v-else description="暂无收藏场馆" />
    </div>
</template>

<script>
import { Empty, Rate } from 'vant'
import { getFavoritesList, setStadiumDetails } from '../services'

export default {
    name: 'collect',
    components: {
        Empty,
        Rate
    },
    data () {
        return {
            listData: getFavoritesList()
        }
    },
    computed: {
    },
    async created () {
        // console.log(await getVenueList())
    },
    mounted () {
    },
    methods: {
        jump (item) {
            setStadiumDetails(item)
            this.$router.push(`/stadium-details/${item.view_num}`)
        }
    }
}
</script>
<style lang="scss" scoped>
#collect {
    padding: 0 36px;
    .item {
        // display: block;
        margin-top: 32px;
        line-height: 1;
    }
    .img {
        // flex: 1 0;
        width: 270px;
        height: 180px;
        margin-right: 16px;
        border-radius: 20px;
        overflow: hidden;
    }
    .rigth {
        max-width: 380px;
        flex: 1;
    }
    .title {
        margin-bottom: 10px;
        font-size: 32px;
        font-weight: 5009;
        color: #303030;
    }
    .rate {
        margin-bottom: 14px;
    }
    .tag {
        margin-bottom: 10px;
        font-size: 24px;
        color: #777;
        span {
            // display: inline-block;
            padding: 2px 4px;
            border: 1px solid #999;
            border-radius: 16px;
            margin-right: 18px;
        }
    }
    .mod3 {
        // z-index: 165;
        position: relative;
        width: 251px;
        height: 34px;
        border-radius: 17px;
        overflow: hidden;
        border: 1px solid rgba(53, 90, 175, 1);
        align-self: flex-start;
        margin-top: 17px;
    }

    .outer1 {
        // z-index: 166;
        position: absolute;
        left: 0;
        top: 0;
        width: 47px;
        height: 34px;
        background-color: rgba(53, 90, 175, 1);
    }

    .txt4 {
        // z-index: 167;
        position: absolute;
        left: 13px;
        top: 1px;
        width: 24px;
        display: block;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        font-family: PingFangSC-Regular;
        line-height: 33px;
        text-align: center;
    }

    .word8 {
        // z-index: 168;
        position: absolute;
        left: 54px;
        top: 1px;
        width: 173px;
        display: block;
        overflow-wrap: break-word;
        color: rgba(53, 90, 175, 1);
        font-size: 24px;
        font-family: PingFangSC-Regular;
        line-height: 33px;
        text-align: center;
    }
}
</style>
