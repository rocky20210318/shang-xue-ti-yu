<template>
    <div id="social">
        <div class="top">
            <h1 class="title">圈子</h1>
            <van-row type="flex" justify="space-between" align="center" class="search-release">
                <Search v-model="keys" shape="round" class="search" @click="$router.push('/search')" />
                <router-link to="/publish-talk"><img src="../assets/bianji.png" alt=""></router-link>
            </van-row>
            <div class="tag">
                <router-link to="/search?keys=篮球"><img src="../assets/lanqiu.png" alt=""></router-link>
                <router-link to="/search?keys=足球"><img src="../assets/zuqiu.png" alt=""></router-link>
                <router-link to="/search?keys=羽毛球"><img src="../assets/yumaoqiu.png" alt=""></router-link>
                <router-link to="/search?keys=乒乓球"><img src="../assets/pingpangqiu.png" alt=""></router-link>
            </div>
        </div>
        <Tabs v-model="active" color="#355AAF" class="list">
            <Tab title="推荐">
                <Article-list :get-list="getTalk" :type="2" />
            </Tab>
            <Tab title="关注">
                <Article-list :get-list="getAttention" :type="2" />
            </Tab>
        </Tabs>
        <basic-footer />
    </div>
</template>

<script>
import { getTalk, getAttention } from '../services'
import { Search, Tab, Tabs } from 'vant'
import ArticleList from '../components/article-list'

export default {
    name: 'social',
    components: {
        Search,
        Tab,
        Tabs,
        ArticleList
    },
    data () {
        return {
            keys: '',
            active: 0
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        async getTalk (index = 1, size = 10) {
            return await getTalk(index, size)
        },
        async getAttention (index = 1, size = 10) {
            return await getAttention(index, size)
        }
    }
}
</script>
<style lang="scss">
#social {
    // .van-tabs__nav--line {
    //     margin: 0 -32px;
    // }
    .van-tabs__content {
        padding: 0 32px;
    }
    .van-hairline--top-bottom::after {
        display: none;
    }
    .van-tab {
        width: 100px;
        flex: none;
    }
}
</style>
<style lang="scss" scoped>
#social {
    > .top {
        padding: 0 32px;
        background: #fff;
    }
    // background: #fff;
    h1 {
        padding: 20px 0;
        font-size: 48px ;
        font-weight: 500;
    }
    .search-release {
        .search {
            flex: 1;
            padding: 0;
            margin-right: 20px;
        }
        img {
            width: 44px;
        }
    }
    // background: #fff;
    // height: 100%;
    .tag {
        padding: 36px 0px;
        overflow: auto;
        white-space: nowrap;
        // width: 120px;
        a {
            display: inline-block;
            margin-right: 24px;
        }
        img{
            width: 200px;
        }
    }
    .list {
    }
}
</style>
