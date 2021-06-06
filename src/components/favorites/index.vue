<template>
    <div id="favorites-star">
        <van-icon v-if="!userData" name="star-o" size="20" @click="$router.push('/login')" />
        <template>
            <van-icon v-if="!isFavoritesList" name="star-o" size="20" @click="addFavoritesList" />
            <van-icon v-else name="star" color="#FF6600" size="20" @click="deleteFavoritesList" />
        </template>
    </div>
</template>

<script>
// import { getVenueList } from './services'
import { addFavoritesList, deleteFavoritesList, ifFavoritesList } from '../../services'
import AV from 'leancloud-storage'

export default {
    name: 'favorites-star',
    components: {
    },
    props: {
        details: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            userData: AV.User.current(),
            isFavoritesList: ifFavoritesList(this.details.view_num)
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        // 判断是否收藏
        ifFavoritesList () {
            return ifFavoritesList(this.details.view_num)
        },
        // 添加收藏
        addFavoritesList () {
            addFavoritesList(this.details)
            this.isFavoritesList = ifFavoritesList(this.details.view_num)
        },
        // 删除收藏
        deleteFavoritesList () {
            deleteFavoritesList(this.details.view_num)
            this.isFavoritesList = ifFavoritesList(this.details.view_num)
        }
    }
}
</script>
<style lang="scss" scoped>
#favorites-star {
    // height: 100%;
}
</style>
