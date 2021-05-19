<template>
    <div id="rule">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="入场须知" />
        <ul class="list">
            <li class="item">1、预订成功后不接受退改。</li>
            <li class="item">2、入场只能穿浅色底运动鞋进场，黑底鞋、皮鞋、高跟鞋、硬底鞋禁止入场。</li>
            <li class="item">3、培训，赛事，团体活动不享受此价格请勿预订，详情请到服务台咨询。</li>
            <li class="item">4、高血压，心脏病等不适合运动的人群请勿入场。</li>
            <li class="item">6、场馆禁止携带易撒饮料、水和属于投放厨余垃圾的物品入场。</li>
            <li class="item">7、禁止打架斗殴、聚众闹事，后果自负。</li>
            <li class="item">8、个人物品请妥善保管、 如发生物品损坏、遗失与球馆无涉，责任自负。</li>
            <li class="item">9、请入场人员遵守本场地的各项规定，如有疑问请随时询问场馆前台。</li>
        </ul>
    </div>
</template>

<script>
// import { getVenueList } from './services'
export default {
    name: 'rule',
    components: {
    },
    data () {
        return {
            keys: '',
            showType: ''
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        search () {}
    }
}
</script>
<style lang="scss" scoped>
#rule{
    .list {
        padding: 36px;
        font-size: 34px;
        color: #303030;
        line-height: 1.5;
        li {
            margin-bottom: 10px;
        }
    }
}
</style>
