<template>
    <div id="nav-footer">
        <tabbar route fixed border placeholder>
            <tabbar-item to="/home">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-1-active.png') : require('../../assets/icon-home-tab-1.png')" />
                </template>
                <span>首页</span>
            </tabbar-item>
            <tabbar-item to="/social">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-2-active.png') : require('../../assets/icon-home-tab-2.png')" />
                </template>
                <span>圈子</span>
            </tabbar-item>
            <tabbar-item to="/order-list">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-3-active.png') : require('../../assets/icon-home-tab-3.png')" />
                </template>
                <span>订单</span>
            </tabbar-item>
            <tabbar-item to="/my">
                <template #icon="props">
                    <img class="icon-img" :src="props.active ? require('../../assets/icon-home-tab-4-active.png') : require('../../assets/icon-home-tab-4.png')" />
                </template>
                <span>我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
    name: 'basic-footer',
    components: {
        Tabbar,
        TabbarItem
    },
    data () {
        return {
            active: 0
        }
    }
}
</script>
<style lang="scss">
#nav-footer {
    .van-tabbar--fixed {
        height: 120px;
        box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.06);
    }
    .van-tabbar-item__icon {
        margin-bottom: 0;
    }
    .van-tabbar-item__text {
        position: relative;
        top: 10px;
        font-size: 22px;
        color: #333333;
    }
    .van-tabbar-item--active {
        .van-tabbar-item__text {
            color: #355AAF;
        }
    }
}
</style>
<style lang="scss" scoped>
.icon-img {
    max-width: 60px;
    max-height: 60px;
}
</style>
