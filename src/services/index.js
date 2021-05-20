import AV from 'leancloud-storage'
// import request from './request'
import { api } from '../utils/api'
// const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/

/**
 * 获取短信验证码
 * @param phoneNumber required
 * @returns {Promise<void>}
 */
export async function requestSmsCode (phoneNumber) {
    await AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phoneNumber,
        template: 'login',
        sign: '天天悬赏'
    })
}

/**
 * 通过验证码登录或者注册
 * @param phoneNumber required
 * @param smsCode required
 * @returns {Promise<User>}
 */
export async function signUpOrlogInWithMobilePhone (phoneNumber, smsCode) {
    await AV.User.signUpOrlogInWithMobilePhone(phoneNumber, smsCode)
}

export async function getVenueList (pageIndex, pageSize, parmas) {
    const data = await api.get('/getnext', {
        page: pageIndex,
        ...parmas
    })
    return data
}

/**
 * 获取用户信息
 * @returns {Promise<User>}
 */
export function getUserData () {
    return JSON.parse(localStorage.getItem('UserData')) || null
}

/**
 * 退出登录
 */
export async function logOut () {
    const response = await AV.User.logOut()
    // localStorage.clear()
    return response
}

/**
 * 删除账号

 * @returns {Promise<User>}
 */
// export async function deleteAccount () {
//     const userId = getUserData().userId
//     const response = await request(`${apiPrefix}/wx/auth/clear?userId=${userId}`, {
//         method: 'POST'
//     })
//     return response.data
// }

// 获取说说列表
export async function getTalk (index = 1, size = 10, createUser) {
    const talkList = new AV.Query('TalkList')
    talkList.skip((index - 1) * size)
    talkList.limit(size)
    // console.log(index, size)
    talkList.descending('readNumber')
    talkList.include('createUser')
    if (createUser) talkList.equalTo('createUser', createUser)
    // articleList.addDescending('readNumber')
    let list = await talkList.find()
    list = list.map(item => {
        return {
            id: item.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            ...item.attributes
        }
    })
    // console.log(list)
    return list
}

// 获取关注的说说列表
export async function getAttention (index = 1, size = 10) {
    let userWatchList = await getWatchList()
    userWatchList = userWatchList.map(i => i.get('watchUser'))
    console.log(userWatchList)
    const articleList = new AV.Query('TalkList')
    articleList.skip((index - 1) * size)
    articleList.limit(size)
    articleList.descending('readNumber')
    articleList.containedIn('createUser', userWatchList)
    articleList.include('createUser')
    let list = await articleList.find()
    console.log(list)
    list = list.map(item => {
        return {
            id: item.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            ...item.attributes
        }
    })
    // console.log(list)
    return list
}

// 获取关注列表
export async function getWatchList (data = AV.User.current(), count) {
    const watchList = new AV.Query('WatchList')
    watchList.equalTo('createUser', data)
    watchList.include('watchUser')
    return !count ? await watchList.find() : await watchList.count()
}

// 获被取关注列表
export async function getFollowedList (data = AV.User.current(), count) {
    const watchList = new AV.Query('WatchList')
    watchList.equalTo('watchUser', data)
    watchList.include('createUser')
    return !count ? await watchList.find() : await watchList.count()
}

// 是否关注
export async function ifWatch (id) {
    const watchList = await getWatchList()
    const list = watchList.filter(i => {
        return i.get('watchUser').id === id
    })
    return list.length > 0
}

// 关注
export async function watch (userId) {
    const createUser = AV.User.current()
    const watchUesr = AV.Object.createWithoutData('_User', userId)
    const WatchList = AV.Object.extend('WatchList')
    const watchList = new WatchList()
    watchList.set('watchUser', watchUesr)
    watchList.set('createUser', createUser)
    watchList.save()
}

// 取消关注
export async function cancelWatch (userId) {
    const createUser = AV.User.current()
    const watchUesr = AV.Object.createWithoutData('_User', userId)
    // const WatchList = AV.Object.extend('WatchList')
    const watch = new AV.Query('WatchList')
    watch.equalTo('watchUser', watchUesr)
    watch.equalTo('createUser', createUser)
    const watchData = await watch.first()
    // console.log(watchData.id)
    const watchList = AV.Object.createWithoutData('WatchList', watchData.id)
    watchList.destroy()
}

// 设置体育馆详情页信息
export function setStadiumDetails (data) {
    localStorage.setItem('stadiumDetails', JSON.stringify(data))
}

// 获取体育馆详情页信息
export function getStadiumDetails () {
    const stadiumDetails = localStorage.getItem('stadiumDetails')
    return stadiumDetails ? JSON.parse(stadiumDetails) : {}
}

// 获取后五天
export function getDateStr () {
    function GetDateStr (AddDayCount) {
        const dd = new Date()
        const text = ['一', '二', '三', '四', '五', '六', '日']
        dd.setDate(dd.getDate() + AddDayCount)
        // const y = dd.getFullYear()
        const m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)
        const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
        return {
            time: m + '-' + d,
            day: text[dd.getDay()]
        }
    }
    const time = []
    // console.log(GetDateStr(0))
    for (let i = 0; i < 5; i++) {
        // console.log(i)
        time.push(GetDateStr(i))
    }
    return time
}

// 创建订单
export function addOrder (data) {
    const userId = AV.User.current().id
    const orderList = getOrderList()
    orderList.push(data)
    localStorage.setItem('order-' + userId, JSON.stringify(orderList))
}

// 获取订单列表
export function getOrderList () {
    const userId = AV.User.current().id
    let orderList = localStorage.getItem('order-' + userId)
    orderList = orderList ? JSON.parse(orderList) : []
    return orderList
}

// 获取订单详情
export function getOrder (id) {
    const orderList = getOrderList()
    const order = orderList.filter(i => Number(id) === i.orderId)
    return order[0]
}
