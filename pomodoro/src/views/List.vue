<template lang="pug">
  #list
    b-container
      b-row
       b-col(cols="12")
         b-form-group(label="新增事項" invalid-feedback="請至少兩個字" :state="state")
           b-form-input(v-model="newtodo" trim :state="state" @keydown.enter="addTodo")
         b-btn(variant="dark" @click="addTodo") 新增
         b-table(:items="todos" :fields="fields")
           template(#cell(name)="data")
              b-form-input(
                v-if="data.item.edit"
                v-model="data.item.model"
                trim
                :state="stateTodo(data.item.model)"
                @keydown.enter="changeTodo(data.index)"
              )
              span(v-else) {{ data.item.name }}
           template(#cell(action)="data")
             span(v-if="data.item.edit")
              b-btn(variant="success" @click="changeTodo(data.index)")
                font-awesome-icon(:icon="['fas', 'check']")
              b-btn(variant="danger" @click="cancelTodo(data.index)")
                font-awesome-icon(:icon="['fas', 'undo']")
             span(v-else)
              b-btn(variant="dark" @click="editTodo(data.index)")
                font-awesome-icon(:icon="['fas', 'pen']")
              b-btn(variant="danger" @click="delTodo(data.index)")
                font-awesome-icon(:icon="['fas', 'times']")
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      newtodo: '',
      fields: [
        {
          // 綁定key label為欄位名稱
          key: 'name',
          label: '名稱'
        },
        {
          // 綁定key label為欄位名稱
          key: 'action',
          label: '操作'
        }
      ]
    }
  },
  computed: {
    // 驗證
    state () {
      if (this.newtodo.length === 0) {
        return null
      } else if (this.newtodo.length < 2) {
        return false
      } else {
        return true
      }
    },
    // vuex回來的
    todos () {
      return this.$store.state.todos
    }
  },
  methods: {
    addTodo () {
    // 若驗證通過
      if (this.state) {
        this.$store.commit('addTodo', this.newtodo)
        this.newtodo = ''
      }
    },
    // 刪除欄位
    delTodo (index) {
      this.$store.commit('delTodo', index)
    },
    editTodo (index) {
      this.$store.commit('editTodo', index)
    },
    stateTodo (data) {
      if (data.length < 2) {
        return false
      } else {
        return true
      }
    },
    changeTodo (index) {
      // 驗證通過後，可修正
      const valid = this.stateTodo(this.todos[index].model)
      if (valid) {
        this.$store.commit('changeTodo', index)
      }
    },
    cancelTodo (index) {
      this.$store.commit('cancelTodo', index)
    }
  }
}
</script>
