<template>
  <div class="app-container">
    <el-row>
    <el-input v-model="key" placeholder="请输入关键词">
      <el-button slot="append" icon="el-icon-search" circle @click="search" ></el-button>
    </el-input>
    </el-row>
    <el-table
            :data="tableData.slice((currentPage-1)*20,currentPage*20)"
            style="width: 100%">
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
import { search } from '@/api/table'

export default {
  data() {
    return {
      key: '',
      tableData: [{
        Name: '',
        Seq: ''
      }],
      currentPage: 1
    }
  },
  methods: {
    search() {
      search(this.key).then(response => {
        this.tableData = []
        console.log(response)
        if (response === null) {
          console.log(1111)
          this.$message({
            message: '无此相关信息，尝试换一个关键词！',
            type: info,
            duration: 2000
          })
        } else {
          for (let i = 0; i < response.length; i++) {
            var info = {}
            info.name = response[i].Name
            info.seq = response[i].Seq
            this.tableData.push(info)
          }
        }
        console.log(response)
      })
    }
  }
}
</script>
