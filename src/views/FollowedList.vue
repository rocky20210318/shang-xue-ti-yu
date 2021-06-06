<template>
    <div id="followed-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="粉丝" />
        <search class="search" v-model="keys" background="#E6E6E6" shape="round" placeholder="" @search="search" @input="search" />
        <div v-if="activeList.length !== 0">
            <router-link :to="`/user-page/${item.id}`" v-for="item in activeList" :key="item.id">
                <van-row type="flex" align="center" class="item">
                    <div><van-image round fit="cover" :src="item.userImage" class="avatar" /></div>
                    <div>
                        <p class="name">{{ item.username }}</p>
                        <p class="remarks van-ellipsis"> {{ item.remarks }}</p>
                    </div>
                    <div class="button">去了解</div>
                </van-row>
            </router-link>
        </div>
        <Empty v-else description="暂无相关用户" />
    </div>
</template>

<script>
import { Search, Empty } from 'vant'
// import AV from 'leancloud-storage'
import { getFollowedList } from '../services'
import AV from 'leancloud-storage'

export default {
    name: 'followed-list',
    components: {
        Search,
        Empty
    },
    data () {
        return {
            keys: '',
            watchList: [],
            activeList: [],
            userId: this.$route.params.id
        }
    },
    computed: {
    },
    async created () {
        this.getFollowedList()
    },
    mounted () {
    },
    methods: {
        async getFollowedList () {
            const User = AV.Object.createWithoutData('_User', this.userId)
            const watchList = await getFollowedList(User)
            this.watchList = watchList.map(i => {
                // console.log(i.get('watchUser'))
                const userData = i.get('createUser')
                return {
                    userImage: userData.get('userImage'),
                    username: userData.get('username'),
                    remarks: userData.get('remarks'),
                    id: userData.id
                }
            })
            this.activeList = [...this.watchList]
            // console.log(this.watchList)
        },
        search () {
            const reg = RegExp(this.keys)
            this.activeList = this.watchList.filter(i => {
                // console.log(this.keys, reg.test(i.username))
                return reg.test(i.username)
            })
        }
    }
}
</script>
<style lang="scss">
#followed-list {
    .van-search__content {
        background: #fff;
    }
}
</style>
<style lang="scss" scoped>
#followed-list {
    .item {
        padding: 20px 24px;
        background: #fff;
        border-bottom: 1px solid #DBDBDB;
        line-height: 1;
    }
    .avatar {
        width: 111px;
        height: 111px;
        margin-right: 40px;
    }
    .name {
        margin-bottom: 20px;
        font-size: 28px;
        color: #333;
    }
    .remarks {
        width: 400px;
        flex: 1;
        font-size: 24px;
        color: #666;
    }
    .button {
        width: 144px;
        padding: 10px 0;
        // height: 46px;
        background: #F5D860;
        border: 2px solid #F5D860;
        border-radius: 4px;
        font-size: 24px;
        color: #333;
        text-align: center;
        line-height: 1;
        // line-height: 46px;
    }
}
</style>
