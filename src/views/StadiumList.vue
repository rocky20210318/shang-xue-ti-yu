<template>
    <div id="stadium-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="场馆列表" />
        <Sticky>
            <DropdownMenu>
                <DropdownItem v-model="category_id" :options="options1" @closed="onRefresh" />
                <DropdownItem v-model="sort" :options="options2" @closed="onRefresh" />
                <!-- <DropdownItem v-model="value2" :options="option2" /> -->
            </DropdownMenu>
        </Sticky>
        <StadiumList ref="stadiumList" :params="params" />
    </div>
</template>

<script>
// import { getVenueList } from './services'
import { DropdownMenu, DropdownItem, Sticky } from 'vant'
import StadiumList from '../components/stadium-list'
import typeList from '../json/sports-category'

export default {
    name: 'stadium-list',
    components: {
        StadiumList,
        DropdownMenu,
        DropdownItem,
        Sticky
    },
    data () {
        // console.log(typeList)
        return {
            options1: typeList,
            options2: [
                {
                    text: '优选',
                    value: 0
                },
                {
                    text: '人气推荐',
                    value: 1
                },
                {
                    text: '价格最低',
                    value: 2
                },
                {
                    text: '价格最高',
                    value: 3
                }
            ],
            category_id: Number(this.$route.query.value),
            sort: 0
        }
    },
    computed: {
        params () {
            return {
                category_id: this.category_id,
                sort: this.sort
            }
        }
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        onRefresh () {
            this.$refs.stadiumList.onRefresh()
        }
    }
}
</script>
<style lang="scss" scoped>
#stadium-list {
}
</style>
