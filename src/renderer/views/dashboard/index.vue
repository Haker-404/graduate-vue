<template>
  <div class="dashboard-container">
<!--    <div class="dashboard-text">name:{{name}}</div>-->
<!--    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
      <div class="calenderTitle">
          <div class="calenderItem" v-for="item of calenderTitel">{{item}}</div>
      </div>
      <!-- 日历内容 -->
      <div class="calenderInside">
          <div class="calenderItem" v-for="item of calenderArray">{{item}}</div>
      </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// export default {
// name: 'dashboard',
// computed: {
//   ...mapGetters([
//     'name',
//     'roles'
//   ])
// },
// data() {
//   return {
//     value: new Date()
//   }
// }
// }
export default {
  data() {
    return {
      // 获取当前时间戳(后期采用服务器时间)
      timestamp: (new Date()).getTime(),
      // 当前年份
      nowYear: null,
      // 当前月份
      nowMonth: null,
      // 当前日期
      nowDate: null,
      // 当前星期
      nowDay: null,
      // 日期标题
      calenderTitel: ['日', '一', '二', '三', '四', '五', '六'],
      // 日期内容
      calenderArray: []
    }
  },
  methods: {
    // 拆分年月日星期
    getNowDate() {
      // 将时间戳转换为日期对象
      const theTime = typeof (timestamp) === 'object' ? this.timestamp : new Date(this.timestamp)
      this.nowYear = theTime.getFullYear()
      this.nowMonth = theTime.getMonth() + 1
      this.nowDate = theTime.getDate()
      this.nowDay = theTime.getDay() // 星期日为0,其余星期对应数值
      this.getFirstDay()
    },
    getFirstDay() {
      let firstDayWeek = null
      // 获取当月1号的星期
      firstDayWeek = new Date(this.nowYear + '/' + this.nowMonth + '/' + '01').getDay()
      console.log('当前月份1号的星期')
      console.log(firstDayWeek)
      // 当月天数
      const nowMonthDay = this.getNowMonthDay(this.nowYear, this.nowMonth)
      console.log('nowMonthDay')
      console.log(nowMonthDay)
      const arr = []
      // 根据当月1号的星期数来给渲染数组前面添加对应数量的空格
      for (let indexEmpty = 0; indexEmpty < parseInt(firstDayWeek); indexEmpty++) {
        arr.push('')
      }
      // 通过函数判断当前月份有多少天,并根据天数填充渲染数组
      for (let indexNum = 1; indexNum < nowMonthDay + 1; indexNum++) {
        arr.push(indexNum)
      }
      // 深拷贝日历渲染数组(由于后期可能会改成签到日历,数组的每一项可能是object所以深拷贝)
      this.calenderArray = JSON.parse(JSON.stringify(arr))
    },
    // 计算当前年份是否为闰年
    isLeapYear(year) {
      return (year % 400 === 0 || year % 4 === 0) && year % 100 !== 0
    },
    // 计算当前月份有多少天
    getNowMonthDay(year, month) {
      return [null, 31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28)
    }
  },
  created() {
    // 将时间戳转换拆分为具体数值
    this.getNowDate()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/*.dashboard {*/
/*  &-container {*/
/*    margin: 30px;*/
/*  }*/
/*  &-text {*/
/*    font-size: 30px;*/
/*    line-height: 46px;*/
/*  }*/
/*}*/
.calenderTitle, .calenderInside{
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 700px;
}
.calenderItem{
    width: 100px;
    height: 100px;
}
</style>
