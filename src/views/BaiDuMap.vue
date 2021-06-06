<template>
    <div id="baidu-map">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" title="定位" />
        <baidu-map :ak="ak" :center="center" :zoom="zoom" class="map">
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
            <bm-local-search :keyword="keyword" :select-first-result="true" :auto-viewport="false" ></bm-local-search>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>
    </div>
</template>

<script>
import { getStadiumDetails } from '../services'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmNavigation, BmLocalSearch, BmScale, BmGeolocation } from 'vue-baidu-map'

export default {
    name: 'baidumap',
    components: {
        BaiduMap,
        BmNavigation,
        BmLocalSearch,
        BmScale,
        BmGeolocation
    },
    data () {
        const details = getStadiumDetails()
        return {
            ak: 'eAq9xppncopNuW38q2jx12qEWVAbzaPa',
            details: details,
            latitude: details.latitude,
            longitude: details.longitude,
            center: {
                lng: details.longitude,
                lat: details.latitude
            },
            zoom: 16,
            keyword: details.name
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        // mapReady ({ BMap, map }) {
        //     console.log(BMap, map)
        //     this.center = {
        //         lng: this.details.longitude,
        //         lat: this.details.latitude
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
#baidu-map {
    height: 100%;
    .map {
        width: 100%;
        height: 100%;
        padding-top: 46PX;
        box-sizing: border-box;
        background: #fff;
    }
}
</style>
