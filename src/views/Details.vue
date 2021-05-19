<template>
    <div id="details">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="" />
        <div class="content">
            <!-- <h1 v-if="detailsData">{{ detailsData .title }}</h1> -->
            <van-row @click.stop="$router.push(`/user-page/${detailsData.userId }`)" type="flex" justify="space-between" align="center" class="avatar-name-time">
                <div><van-image fit="cover" round  :src="detailsData.userImage" class="avatar" /></div>
                <div class="time-name">
                    <p class="name">{{ detailsData.username }}</p>
                    <p class="time">
                        <!-- <span class="label">#&nbsp;热门</span> -->
                        <span class="time">{{ format(detailsData.createdAt,'YYYY-MM-dd HH:mm') }}</span>
                    </p>
                </div>
                <div v-if="!isShowAttention" class="button-box"><Button @click.stop="watch" size="mini" :class="['button', { 'active': isWatch }]">{{ isWatch ? '已关注' : '关注' }}</Button></div>
            </van-row>
            <div v-if="$route.params.type === '0'" class="html" v-html="detailsData.content"></div>
            <div v-else-if="$route.params.type === '2'" class="shuo-shuo">
                <p class="text">{{ detailsData.content || detailsData.title }}</p>
                <grid :border="false" :column-num="3" :square="true" class="img-list">
                    <grid-item v-for="(item, index) in detailsData.imageList" :key="item"><van-image width="100%" height="100%" fit="cover" lazy-load :src="item" @click="showImg(index, detailsData.imageList)" class="item" /></grid-item>
                </grid>
            </div>
            <div v-else class="album">
                <div v-for="(item, index) in detailsData.imageList" :key="item" class="img"><van-image v-if="item" width="100%" lazy-load :src="item" @click="showImg(index, detailsData.imageList)" alt="" /></div>
            </div>
        </div>
        <div class="comment-list">
            <van-row type="flex" justify="space-between" align="top" class="title">
                <p class="comment-text">评论</p>
                <p class="readNumber">{{ detailsData.readNumber }}阅读</p>
                <div class="likeNumber">{{ detailsData.likeNumber }}点赞</div>
            </van-row>
            <template v-if="commentList.length !== 0">
                <van-row v-for="item in commentList" :key="item.id" type="flex" justify="space-between" align="top" class="item" @click="$router.push(`/user-page/${item.id}`)">
                    <div><img :src="item.userImage" class="avatar"></div>
                    <div class="right">
                        <van-row type="flex" justify="space-between" align="top" class="name-time">
                            <p class="name">{{ item.username }}</p>
                            <p class="time">{{ format(item.createdAt,'YYYY-MM-dd HH:mm') }}</p>
                        </van-row>
                        <p class="text">{{ item.content }}</p>
                    </div>
                </van-row>
            </template>
            <Empty v-else description="暂无评论" />
        </div>
        <van-row type="flex" justify="space-between" align="top" class="comment">
            <div @click="showCommentInput = true" class="input">请输入评论内容</div>
            <div class="like" @click="like">
                <p class="like-icon">
                    <van-icon v-if="isLike" size="0.7rem" color="#355AAF" name="good-job" />
                    <van-icon v-else size="0.7rem" color="#6c7b8a" name="good-job-o" />
                </p>
                <!-- <p class="nub">{{ detailsData.likeNumber }}</p> -->
            </div>
        </van-row>
        <popup v-model="showCommentInput" :style="{ height: '100%' }" position="bottom" class="comment-input">
            <van-nav-bar fixed left-arrow @click-left="showCommentInput = false" placeholder title="发布美评" />
            <div class="textarea"><field v-model="commentTxt" type="textarea" rows="10" placeholder="请输入评论内容" /></div>
            <div class="button"><Button @click="comment" :loading="loading" round block color="#355AAF">提交</Button></div>
        </popup>
    </div>
</template>

<script>
import { watch, cancelWatch, ifWatch } from '../services'
import { Button, Grid, GridItem, ImagePreview, Popup, Field, Empty } from 'vant'
import AV from 'leancloud-storage'
import { format } from '../utils/index'

export default {
    name: 'details-page',
    components: {
        Button,
        Grid,
        GridItem,
        Popup,
        Field,
        Empty
    },
    data () {
        return {
            commentTxt: '',
            showCommentInput: false,
            loading: false,
            imgList: {
                images: [],
                startPosition: 1
            },
            detailsData: {},
            userData: {},
            commentList: [],
            isWatch: false
        }
    },
    computed: {
        isShowAttention () {
            if (!AV.User.current()) return true
            else return this.userId !== AV.User.current().id
        },
        isLike () {
            let list = []
            if (this.userData.likeList) list = this.userData.likeList.filter(i => i.id === this.detailsData.id)
            // console.log(this.detailsData.id, this.userData.likeList)
            return list.length !== 0
        },
        _class () {
            let _class = ''
            // console.log(this.$route.params)
            switch (this.$route.params.type) {
            case '0':
                _class = 'ArticleList'
                break
            case '1':
                _class = 'AlbumList'
                break
            case '2':
                _class = 'TalkList'
                break
            }
            return _class
        }
    },
    async created () {
        // console.log(this.$route.params.id)
        await this.getDetails()
        if (AV.User.current()) {
            this.getUserData()
            this.getWatch()
        }
        this.getCommentList()
        this.addReadNumber()
    },
    mounted () {
    },
    methods: {
        format (date, fmt) {
            return format(date, fmt)
        },
        showImg (index, imageList) {
            this.imgList.startPosition = index
            this.imgList.images = imageList
            ImagePreview(this.imgList)
        },
        async comment () {
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            if (this.commentTxt) {
                this.loading = true
                const _class = this._class
                const CommentList = AV.Object.extend('CommentList')
                const commentList = new CommentList()
                const uesr = AV.Object.createWithoutData('_User', AV.User.current().id)
                // const articleList = AV.Object.createWithoutData(_class, this.detailsData.id)
                commentList.set('content', this.commentTxt)
                commentList.set('userData', uesr)
                commentList.set('id', this.detailsData.id)
                commentList.set('className', _class)
                await commentList.save()
                const articleList = AV.Object.createWithoutData(_class, this.$route.params.id)
                // articleList.equalTo('objectId', this.$route.params.id)
                articleList.increment('commentNumber', 1)
                await articleList.save()
                this.loading = false
                this.$toast({
                    message: '发布成功',
                    onClose: () => {
                        this.showCommentInput = false
                    }
                })
                this.getCommentList()
            } else this.$toast('请输入评论内容')
        },
        // 获取用户信息
        async getUserData () {
            const User = AV.Object.createWithoutData('_User', AV.User.current().id)
            await User.fetch().then(data => {
                this.userData = {
                    likeList: data.get('likeList')
                }
            })
        },
        // 获取内容详情
        async getDetails () {
            const _class = this._class
            const articleList = new AV.Query(_class)
            articleList.equalTo('objectId', this.$route.params.id)
            articleList.include('createUser')
            const detailsData = await articleList.first().then(data => data)
            // console.log(detailsData)
            this.detailsData = {
                id: detailsData.id,
                createdAt: detailsData.createdAt,
                ...detailsData.attributes,
                ...detailsData.get('createUser').attributes
            }
            // console.log(this.detailsData)
        },
        // 获取评论列表
        async getCommentList () {
            const commentList = new AV.Query('CommentList')
            commentList.equalTo('id', this.$route.params.id)
            commentList.include('userData')
            const listData = await commentList.find()
            this.commentList = listData.map(i => {
                console.log(i.get('userData'))
                return {
                    id: i.id,
                    content: i.get('content'),
                    createdAt: i.createdAt,
                    username: i.get('userData').get('username'),
                    userImage: i.get('userData').get('userImage')
                }
            })
        },
        // 关注
        async watch () {
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            const userId = this.detailsData.createUser.id
            if (!this.isWatch) {
                await watch(userId)
            } else {
                await cancelWatch(userId)
            }
            this.isWatch = !this.isWatch
        },
        // 点赞
        async like () {
            const item = this.detailsData
            if (!AV.User.current()) {
                this.$router.push('/login')
                return false
            }
            // console.log(item)
            const _class = this._class
            const like = AV.Object.createWithoutData(_class, item.id)
            like.set('likeNumber', this.isLike ? item.likeNumber - 1 : item.likeNumber + 1)
            await like.save()
            const uesr = AV.Object.createWithoutData('_User', AV.User.current().id)
            const articleList = AV.Object.createWithoutData(_class, item.id)
            this.isLike ? uesr.remove('likeList', articleList) : uesr.add('likeList', articleList)
            await uesr.save()
            await this.getUserData()
            !this.isLike ? item.likeNumber-- : item.likeNumber++
        },
        // 增加阅读数量
        async addReadNumber () {
            const _class = this._class
            const articleList = AV.Object.createWithoutData(_class, this.$route.params.id)
            articleList.increment('readNumber', 1)
            await articleList.save()
        },
        // 是否关注
        async getWatch () {
            // console.log(this.detailsData.createUser)
            this.isWatch = await ifWatch(this.detailsData.createUser.id)
        }
    }
}
</script>
<style lang="scss">
#details {

    .html {
        p  {
            line-height: 1.5;
            font-size: 30px;
            color: #333;
        }
        .mp-article-caption {
            display: none;
        }
        .mp-article-images-item {
            width: 100%!important;
        }
        img {
            margin: 10px 0;
            max-width: 100%!important;
        }
        video {
            display: none;
        }
    }
    .van-grid-item__content {
        padding: 10px 8px;
    }
}
</style>
<style lang="scss" scoped>
#details {
    padding-bottom: 105px;
    .content {
        padding: 0 30px 30px;
        background: #fff;
    }
    h1 {
        padding: 30px 0 40px;
        font-size: 34px;
        line-height: 1;
        text-align: center;
    }
    .avatar-name-time {
        padding-top: 20px;
        margin-bottom: 20px;
        p  {
            line-height: 1;
        }
        .time-name {
            flex: 1;
        }
        .avatar {
            width: 80px;
            height: 80px;
            margin-right: 20px;
            vertical-align: top;
        }
        .name {
            margin-bottom: 10px;
            font-size: 30px;
            color: #333;
        }
        .time {
            font-size: 24px;
            color: #999;
        }
        .label {
            color: #7bc1ff;
            margin-right: 10px  ;
        }
        .button-box {
            flex: 1;
            text-align: right;
        }
        .button {
            width: 136px;
            height: 48px;
            background-color: #EBCE58;
            border-radius: 24px;
            border: solid 1px #EBCE58;
            font-size: 24px;
            color: #fff;
            line-height: 48px;
            &.active {
                background-color: #fff;
                color: #EBCE58;
            }
        }
    }
    .shuo-shuo .text {
        font-size: 30px;
        color: #000;
        line-height: 1.5;
    }
    .img-list {
        margin-top: 20px;
        // .item {
        //     width: 100%;
        //     height: 100%;
        // }
    }
    .album {
        margin: 0 -30px;
        .img {
            width: 100%;
            // min-height: 100px;
            font-size: 0;
            .van-image {
            }
        }
    }
    .comment-list {
        margin-top: 20px;
        padding: 0 23px;
        background: #fff;
        .title {
            padding: 30px 0px;
            border-bottom: 1px solid #E6E6E6;
            line-height: 1;
            font-size: 30px;
            color: #999;
            .comment-text {
                margin-right: 40px;
                color: #333;
            }
            .readNumber {
                flex: 1;
            }
        }
        .item {
            padding-top: 20px;
        }
        .avatar {
            width: 80px;
            height: 80px;
            margin-right: 30px;
        }
        .name {
            font-size: 30px;
            color: #333;
        }
        .time {
            font-size: 24px;
            color: #999;
        }
        .right {
            flex: 1;
        }
        .text {
            margin-top: 15px;
            margin-right: -30px;
            padding-bottom: 20px;
            padding-right: 30px;
            border-bottom: 1px solid #eee;
            font-size: 26px;
            color: #666;
            line-height: 1.5;
        }
    }
}
.comment {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 25px 18px;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    background: #fff;
    line-height: 1;
    .input {
        flex: 1;
        height: 44px;
        margin-right: 25px;
        padding: 10px 30px;
        // box-sizing: border-box;
        background-color: #bfbfbf;
        border-radius: 27px;
        opacity: 0.38;
        line-height: 1;
        font-size: 24px;
        line-height: 44px;
    }
    .like {
        width: 80px;
        text-align: center;
        .nub {
            font-size: 24px;
            color: #6c7b8a;
        }
    }
}
.comment-input {
    .textarea {
        margin: 30px;
        box-sizing: border-box;
        box-shadow: 0px 2px 20px 0px rgba(50, 51, 94, 0.10);
        border: 1px solid #eee;
    }
    .button {
        padding: 30px;
    }
}
</style>
