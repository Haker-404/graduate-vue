import { login, getInfo } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'
import store from '../index'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    seq: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SEQ: (state, seq) => {
      state.seq = seq
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log(userInfo)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.resp
          commit('SET_TOKEN', data.msg)
          commit('SET_SEQ', username)
          console.log('请求后台')
          console.log(response)
          resolve()
        }).catch(error => {
          console.log('后台抛错', error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(store.getters.seq).then(response => {
          const data = response.user
          if (data.name && data.seq > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', '管理员')
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
