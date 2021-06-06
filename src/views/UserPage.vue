<template>
    <div id="my">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="用户信息" />
        <div class="bg" />
        <user-info :user-id="userId" />
        <article-list :get-list="getTalk" :is-show-watch="false" :type="2" />
        <!-- <basic-footer /> -->
    </div>
</template>

<script>
import { getTalk } from '../services'
// import { Tab, Tabs } from 'vant'
import UserInfo from '../components/user-Info'
import ArticleList from '../components/article-list'
// import AlbumList from '../components/album-list'
import AV from 'leancloud-storage'

export default {
    name: 'my',
    components: {
        UserInfo,
        // Tab,
        // Tabs,
        ArticleList
    },
    data () {
        return {
            active: 0,
            userId: this.$route.params.id,
            userData: AV.Object.createWithoutData('_User', this.$route.params.id)
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
            return await getTalk(index, size, this.userData)
        }
    }
}
</script>
<style lang="scss">
#my {
    .van-hairline--top-bottom::after {
        display: none;
    }
}
</style>
<style lang="scss" scoped>
#my {
    background: #fff;
    min-height: 100%;
}
.bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 230px;
    background: #355AAF;
}
</style>
