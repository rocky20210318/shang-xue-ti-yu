<template>
    <div id="user-Info">
        <!-- <div v-if="!isShowAttention" class="set"><router-link to="/set"><van-icon name="setting-o" /></router-link></div> -->
        <van-row type="flex" justify="space-between" align="center" class="name-message-avatar">
            <div><van-image fit="cover" round  :src="userData.userImage" class="avatar" /></div>
            <div class="name-message">
                <div>
                    <field v-model="userData.userName" ref="userName" placeholder="点击编辑用户名" readonly class="name" />
                </div>
                <div>
                    <field v-model="userData.remarks" placeholder="点击编辑个性签名" readonly  class="message" />
                </div>
            </div>
            <!-- <div v-if="!isShowAttention" @click="edit"><img src="../../assets/edit.png" maxlength="10" class="edit" /></div> -->
        </van-row>
        <van-row type="flex" justify="space-between" align="center" class="information">
            <router-link :to="`/watch-list/${userData.userId}`" class="item">
                <p class="nub">{{ userData.watchList }}</p>
                <p class="type">关注</p>
            </router-link>
            <router-link :to="`/followed-list/${userData.userId}`" class="item">
                <p class="nub">{{ userData.followedList }}</p>
                <p class="type">粉丝</p>
            </router-link>
            <router-link to="" class="item">
                <p class="nub">{{ userData.readNumber }}</p>
                <p class="type">被阅读</p>
            </router-link>
        </van-row>
        <div v-if="isShowAttention" class="attention" >
            <p v-if="!isWatch" @click="watch(userData)" class="button">关注</p>
            <p v-else @click="watch(userData)" class="button active">已关注</p>
        </div>
    </div>
</template>

<script>
import { watch, cancelWatch, ifWatch, getWatchList, getFollowedList } from '../../services'
import { Field } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'user-Info',
    components: {
        Field
    },
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            userData: {
                userName: '',
                remarks: '',
                readNumber: 0,
                watchList: 0,
                followedList: 0
            },
            isWatch: false
        }
    },
    computed: {
        isShowAttention () {
            if (!AV.User.current()) return true
            else return this.userId !== AV.User.current().id
        }
    },
    async created () {
        await this.getUserData()
        if (AV.User.current() && !this.isShowAttention) {
            this.getIsWatch()
        }
    },
    methods: {
        showList () {},
        async getUserData () {
            const User = AV.Object.createWithoutData('_User', this.userId)
            const userData = await User.fetch()
            this.userData = {
                userId: userData.id,
                userName: userData.get('username') || userData.get('mobilePhoneNumber'),
                remarks: userData.get('remarks'),
                userImage: userData.get('userImage'),
                readNumber: userData.get('readNumber') || 0,
                watchList: 0,
                followedList: 0
            }
            const watchList = await getWatchList(User, true)
            const followedList = await getFollowedList(User, true)
            // console.log(watchList, followedList)
            this.userData.watchList = watchList
            this.userData.followedList = followedList
        },
        edit () {
            this.$router.push('/edit-user')
        },
        async getIsWatch () {
            this.isWatch = await ifWatch(this.userId)
        },
        async watch () {
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            const userId = this.userId
            if (!this.isWatch) {
                await watch(userId)
            } else {
                await cancelWatch(userId)
            }
            this.isWatch = !this.isWatch
        }
    }
}
</script>
<style lang="scss">
#user-Info {
    .name-message {
        .van-field {
            padding: 0;
            .van-field__control {
                color: #4a4a4a;
            }
        }
        .message {
            .van-field__control {
                color: #6c7b8a;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
#user-Info {
    position: relative;
    z-index: 1;
    margin: 70px 20px 20px;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(50, 51, 94, 0.18);
    border-radius: 20px;
}
.name-message-avatar {
    padding: 60px 34px 39px;
    .name-message {
        padding: 0;
        flex: 1;
    }
    .avatar {
        width: 100px;
        height: 100px;
        vertical-align: top;
        margin-right: 18px;
    }
    .name {
        font-size: 34px;
        color: #4a4a4a;
    }
    .message {
        font-size: 22px;
        color: #6c7b8a;
    }
    .edit {
        width: 32px;
        vertical-align: middle;
        margin-left: 10px;
    }
}
.information {
    padding-bottom: 21px;
    .item {
        width: 33.33%;
        text-align: center;
        font-size: 28px;
        color: #000;
        .type {
            font-size: 22px;
            color: #999;
        }
    }
}
.attention {
    position: relative;
    z-index: 2;
    padding: 30px 0;
    box-shadow: 0px 5px 20px 0px rgba(12, 197, 207, 0.18);
    .button {
        width: 50%;
        height: 48px;
        margin: auto;
        border: solid 1px #355AAF;
        background-color: #355AAF;
        border-radius: 24px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 48px;
        letter-spacing: 3px;
        &.active {
            background: #fff;
            color: #355AAF;
        }
    }
}
.set {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 44px;
    color: #666;
}
</style>
