<template>
    <div id="search-stadium">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder :title=" $route.query.keys ? $route.query.keys : '搜索'" />
        <Sticky v-if="!$route.query.keys" :offset-top="46">
            <Search class="search" v-model="keys" @search="search" shape="round" placeholder="请输入体育馆名称" />
        </Sticky>
        <StadiumList ref="stadiumList" :params="{ keys: keys|| ' ' }" />
        <!-- <basic-footer /> -->
    </div>
</template>

<script>
import { Search, Sticky } from 'vant'
import StadiumList from '../components/stadium-list'

export default {
    name: 'search-stadium',
    components: {
        StadiumList,
        Search,
        Sticky
    },
    data () {
        return {
            keys: this.$route.query.keys || ''
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        search () {
            this.$refs.stadiumList.onRefresh()
        }
    }
}
</script>
<style lang="scss">
#search-stadium {
    .search {
        .van-search__content {
            // background: #424e55;
        }
        .van-field__left-icon .van-icon {
            // color: #fff;
        }
        .van-field__control {
            // color: #Fff;
        }
    }
    .van-hairline--top-bottom::after {
        border-width: 0;
    }
    .van-tabs__nav--line {
        padding: 0 100px;
    }
    .van-tabs__line {
        bottom: 13px;
    }
    .van-tabs--line .van-tabs__wrap {
        height: 70px;
    }
}
</style>
<style lang="scss" scoped>
.search {
    // background: #FF6600;
}
.tab {
}
</style>
