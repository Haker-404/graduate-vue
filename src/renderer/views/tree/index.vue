<template>
  <div class="app-container">
    <p></p>

    <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="sign_info(value2,true)">已签到</el-button>
      <el-button type="primary" icon="el-icon-search" @click="sign_info(value2,false)">未签到</el-button>
    </div>
    <br/>

      <el-table
              :data="tableData.slice((currentPage-1)*20,currentPage*20)"
              style="width: 100%">
        <el-table-column
                prop="date"
                label="日期"
                width="350">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="350">
        </el-table-column>
        <el-table-column
                prop="seq"
                label="学号">
        </el-table-column>
      </el-table>
    <el-pagination
            :hide-on-single-page="false"
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="tableData.length"
            :current-page="currentPage"
            @current-change="handleCurrent">
    </el-pagination>
  </div>


</template>

<script>
import { getUserList } from '../../api/table'

export default {
  watch: {
  },

  methods: {
    handleCurrent: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    sign_info(value, isSinged) {
      console.log()
      console.log('选择的时间：' + value)
      // this.$store.dispatch('GetUserList', value).then(response => {
      //   console.log('获取用户列表返回的数据：' + response)
      //   this.tableData = response.signInfo
      // })
      getUserList(value, isSinged).then(response => {
        this.tableData.splice(0, this.tableData.length)
        for (let i = 0; i < response.signInfo.length; i++) {
          var info = {}
          info.date = response.signInfo[i].date
          info.name = response.signInfo[i].user.name
          info.seq = response.signInfo[i].user.seq
          this.tableData.push(info)
        }
      })
    }

  },

  data() {
    return {
      tableData: [{
        date: '',
        name: '',
        seq: ''
      }],
      currentPage: 1,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value2: ''
    }
  }
}
</script>

