<template>
    <div id="article-list-page">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder :title=" $route.query.keys ? $route.query.keys : '搜索'" />
        <Sticky v-if="!$route.query.keys" :offset-top="46">
            <Search class="search" v-model="keys" @search="search" shape="round" placeholder="搜索你感兴趣的内容和用户" />
        </Sticky>
        <Article-list ref="articleList" :get-list="getArticleList" :type="2" />
        <!-- <basic-footer /> -->
    </div>
</template>

<script>
import { Search, Sticky } from 'vant'
import ArticleList from '../components/article-list'
import AV from 'leancloud-storage'
export default {
    name: 'article-list-page',
    components: {
        Search,
        ArticleList,
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
        async getArticleList (index = 1, size = 10) {
            const articleList = new AV.Query('TalkList')
            articleList.skip((index - 1) * size)
            articleList.limit(size)
            articleList.contains('content', this.keys)
            articleList.descending('likeNumber')
            articleList.include('createUser')
            let list = await articleList.find()
            // console.log(list)
            list = list.map(item => {
                const user = item.get('createUser')
                console.log(user)
                return {
                    username: user.get('username'),
                    userImage: user.get('userImage'),
                    userId: user.id,
                    id: item.id,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    ...item.attributes
                }
            })
            // console.log(list)
            return list
        },
        search () {
            this.$refs.articleList.onRefresh()
        }
    }
}
</script>
<style lang="scss">
#article-list-page {
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
