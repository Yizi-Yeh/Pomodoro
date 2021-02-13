import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)

export default new Vuex.Store({
  state: {
    alarm: 'alarm1.mp3',
    todos: [],
    current: '',
    finished: [],
    isBreak: false,
    timeleft: time,
    // 0 = 停止
    // 1 = 倒數中
    // 2 = 暫停
    status: 0
  },
  mutations: {
    changeStatus (state, data) {
      state.status = data
    },
    selectAlarm (state, data) {
      state.alarm = data
    },
    addTodo (state, data) {
      state.todos.push({
        name: data,
        edit: false,
        model: data
      })
    },
    delTodo (state, index) {
      state.todos.splice(index, 1)
    },
    editTodo (state, index) {
      // 將編輯打開
      state.todos[index].edit = true
    },
    changeTodo (state, index) {
      // 將編輯關閉
      state.todos[index].edit = false
      state.todos[index].name = state.todos[index].model
    },
    cancelTodo (state, index) {
      state.todos[index].edit = false
      state.todos[index].model = state.todos[index].name
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else {
      // 抓取陣列的第一個東西，改變陣列長度
        state.current = state.todos.shift().name
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      // 完成事項丟入finished
      // 清空
      // 時間重設
      state.finished.push(state.current)
      state.current = ''

      if (state.todos.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.timeleft = state.isBreak ? timeBreak : time
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
