<template>
    <div id="home">
        <div class="top">
            <van-row type="flex" align="center" justify="center" class="">
                <template v-if="caseNumber">
                    <img src="../assets/logo.png" class="logo">
                    <p class="name">尚学</p>
                </template>
                <van-row type="flex" align="center" class="box">
                    <span class="address" @click="showLocation">深圳</span>
                    <van-icon color="#17387C" name="arrow-down" />
                    <span class="vertical">丨</span>
                    <van-icon color="#17387C" size="0.4rem" name="search" />
                    <span class="placeholder" @click="$router.push('/search-stadium')">请输入场馆</span>
                </van-row>
                <router-link to="/message-list"><img class="news" src="../assets/home-xiaoxi.png" alt=""></router-link>
            </van-row>
        </div>
        <van-row type="flex" align="center" class="navigation">
            <router-link v-for="item in navigationList" :key="item.text" :to="`/stadium-list?title=${item.text}&value=${item.value}`" class="item">
                <div><img :src="item.src" alt=""></div>
                <p class="title">{{ item.text }}</p>
            </router-link>
        </van-row>
        <h2>热门场馆</h2>
        <StadiumList :listLength="1"/>
        <p v-if="caseNumber" class="caseNumber">{{ caseNumber }}</p>
        <basic-footer/>
    </div>
</template>

<script>
import StadiumList from '../components/stadium-list'
import typeList from '../json/sports-category'
import { Dialog } from 'vant'

export default {
    name: 'home',
    components: {
        StadiumList
    },
    data () {
        return {
            navigationList: typeList,
            center: {
                lat: 0,
                lng: 0
            }
        }
    },
    computed: {
        caseNumber () {
            const domain = document.domain
            let text = null
            switch (domain) {
            case 'www.dayiweb.xyz':
                text = '鲁ICP备20012315号'
                break
            case '60.205.186.43':
                text = '鲁ICP备20012315号'
                break
            }
            return text
        }
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        showLocation () {
            Dialog.alert({
                title: '提示',
                message: '暂时只支持广州地区，其他地区即将上线'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#home {
    .logo {
        width: 50px;
        margin-right: 6px;
    }
    .name {
        margin-right: 16px;
        font-size: 32px;
        color: #fff;
        line-height: 1;
    }
    .top {
        height: 460px;
        padding: 35px 36px;
        box-sizing: border-box;
        background: url('../assets/home-bg-1.png') no-repeat;
        background-size: 100%;
        line-height: 1;
        color: #17387C;
        .box {
            flex: 1;
            padding: 15px 30px;
            border-radius: 36px;
            background: #fff;
            opacity: 0.8;
        }
        .address {
            font-size: 30px;
            margin-right: 6px;
        }
        .vertical {
            font-size: 30px;
            opacity: 0.5;
        }
        .placeholder {
            font-size: 24px;
            margin-left: 53px;
        }
        .news {
            width: 48px;
            margin-left: 30px;
        }
    }
    .navigation {
        position: relative;
        z-index: 2;
        margin: -70px 36px 27px;
        padding: 18px 0 34px;
        background: #FFFFFF;
        box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.06);
        border-radius: 30px;
        flex-wrap: wrap;
        font-size: 26px;
        text-align: center;
        .item {
            width: 110px;
            margin: 10px 12px;
            img {
                width: 110px;
            }
        }
    }
    h2 {
        position: relative;
        margin: 0 36px;
        padding-left: 20px;
        font-size: 32px;
        font-weight: 500;
        color: #17387C;
        &::after {
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 7px;
            height: 34px;
            margin: auto;
            background: #355AAF;
            border-radius: 6px;
        }
    }
    .caseNumber {
        padding: 20px 0 40px;
        font-size: 28px;
        color: #888;
        text-align: center;
    }
}
</style>
