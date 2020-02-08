<!--<template>-->
<!--  <div class="dashboard-container">-->
<!--&lt;!&ndash;    <div class="dashboard-text">name:{{name}}</div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>&ndash;&gt;-->
<!--      <div class="calenderTitle">-->
<!--          <div class="calenderItem" v-for="item of calenderTitel">{{item}}</div>-->
<!--      </div>-->
<!--      &lt;!&ndash; 日历内容 &ndash;&gt;-->
<!--      <div class="calenderInside">-->
<!--          <div class="calenderItem" v-for="item of calenderArray">{{item}}</div>-->
<!--      </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import { mapGetters } from 'vuex'-->
<!--// export default {-->
<!--// name: 'dashboard',-->
<!--// computed: {-->
<!--//   ...mapGetters([-->
<!--//     'name',-->
<!--//     'roles'-->
<!--//   ])-->
<!--// },-->
<!--// data() {-->
<!--//   return {-->
<!--//     value: new Date()-->
<!--//   }-->
<!--// }-->
<!--// }-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      // 获取当前时间戳(后期采用服务器时间)-->
<!--      timestamp: (new Date()).getTime(),-->
<!--      // 当前年份-->
<!--      nowYear: null,-->
<!--      // 当前月份-->
<!--      nowMonth: null,-->
<!--      // 当前日期-->
<!--      nowDate: null,-->
<!--      // 当前星期-->
<!--      nowDay: null,-->
<!--      // 日期标题-->
<!--      calenderTitel: ['日', '一', '二', '三', '四', '五', '六'],-->
<!--      // 日期内容-->
<!--      calenderArray: []-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 拆分年月日星期-->
<!--    getNowDate() {-->
<!--      // 将时间戳转换为日期对象-->
<!--      const theTime = typeof (timestamp) === 'object' ? this.timestamp : new Date(this.timestamp)-->
<!--      this.nowYear = theTime.getFullYear()-->
<!--      this.nowMonth = theTime.getMonth() + 1-->
<!--      this.nowDate = theTime.getDate()-->
<!--      this.nowDay = theTime.getDay() // 星期日为0,其余星期对应数值-->
<!--      this.getFirstDay()-->
<!--    },-->
<!--    getFirstDay() {-->
<!--      let firstDayWeek = null-->
<!--      // 获取当月1号的星期-->
<!--      firstDayWeek = new Date(this.nowYear + '/' + this.nowMonth + '/' + '01').getDay()-->
<!--      console.log('当前月份1号的星期')-->
<!--      console.log(firstDayWeek)-->
<!--      // 当月天数-->
<!--      const nowMonthDay = this.getNowMonthDay(this.nowYear, this.nowMonth)-->
<!--      console.log('nowMonthDay')-->
<!--      console.log(nowMonthDay)-->
<!--      const arr = []-->
<!--      // 根据当月1号的星期数来给渲染数组前面添加对应数量的空格-->
<!--      for (let indexEmpty = 0; indexEmpty < parseInt(firstDayWeek); indexEmpty++) {-->
<!--        arr.push('')-->
<!--      }-->
<!--      // 通过函数判断当前月份有多少天,并根据天数填充渲染数组-->
<!--      for (let indexNum = 1; indexNum < nowMonthDay + 1; indexNum++) {-->
<!--        arr.push(indexNum)-->
<!--      }-->
<!--      // 深拷贝日历渲染数组(由于后期可能会改成签到日历,数组的每一项可能是object所以深拷贝)-->
<!--      this.calenderArray = JSON.parse(JSON.stringify(arr))-->
<!--    },-->
<!--    // 计算当前年份是否为闰年-->
<!--    isLeapYear(year) {-->
<!--      return (year % 400 === 0 || year % 4 === 0) && year % 100 !== 0-->
<!--    },-->
<!--    // 计算当前月份有多少天-->
<!--    getNowMonthDay(year, month) {-->
<!--      return [null, 31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28)-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    // 将时间戳转换拆分为具体数值-->
<!--    this.getNowDate()-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style rel="stylesheet/scss" lang="scss" scoped>-->
<!--/*.dashboard {*/-->
<!--/*  &-container {*/-->
<!--/*    margin: 30px;*/-->
<!--/*  }*/-->
<!--/*  &-text {*/-->
<!--/*    font-size: 30px;*/-->
<!--/*    line-height: 46px;*/-->
<!--/*  }*/-->
<!--/*}*/-->
<!--.calenderTitle, .calenderInside{-->
<!--    margin: 0 auto;-->
<!--    display: flex;-->
<!--    flex-wrap: wrap;-->
<!--    width: 700px;-->
<!--}-->
<!--.calenderItem{-->
<!--    width: 100px;-->
<!--    height: 100px;-->
<!--}-->
<!--</style>-->

<template>
    <div id='calendar'>
        <!-- 年份 月份 -->
        <div class='month'>
            <ul>
                <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
                <li class='arrow' @click='pickPre(currentYear,currentMonth)'>上个月</li>
                <li class='year-month'>
                    <span class='choose-year'>{{ currentYear }}年</span>
                    <span class='choose-month'>{{ currentMonth }}月</span>
                </li>
                <li class='arrow' @click='pickNext(currentYear,currentMonth)'>下个月</li>
            </ul>
        </div>
        <!-- 星期 -->
        <ul class='weekdays'>
            <li>S</li>
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>S</li>
        </ul>
        <!-- 日期 -->
        <ul class='days'>
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li  v-for='(dayobject,i) in days' :key='i'>
                <!--本月-->
                <!--如果不是本月  改变类名加灰色-->
                <span v-if='dayobject.day.getMonth()+1 != currentMonth' class='other-month' @click="getDayTime(dayobject.day)">{{ dayobject.day.getDate() }}</span>
                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else>
                      <!--今天  同年同月同日-->
                            <span v-if='dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()' class='active' @click="getDayTime(dayobject.day)">{{ dayobject.day.getDate() }}</span>
                            <span v-else @click="getDayTime(dayobject.day)">{{ dayobject.day.getDate() }}</span>
                        </span>
            </li>
        </ul>
        <!--事件展示-->
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="time"
                    label="日期"
                    width="500px">
            </el-table-column>
            <el-table-column
                    prop="event"
                    label="事件"
                    width="300px">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          currentDay: 1,
          currentMonth: 1,
          currentYear: 1970,
          currentWeek: 1,
          days: [],
          tableData: [{ time: '', event: '' }]
        }
      },
      created: function() {
        // 在vue初始化时调用
        this.initData(null)
      },
      methods: {
        initData: function(cur) {
          // var leftcount = 0 // 存放剩余数量
          var date
          if (cur) {
            date = new Date(cur)
          } else {
            var now = new Date()
            var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
            d.setDate(35)
            date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
          }
          this.currentDay = date.getDate()
          this.currentYear = date.getFullYear()
          this.currentMonth = date.getMonth() + 1
          this.currentWeek = date.getDay() // 1...6,0
          if (this.currentWeek === 0) {
            this.currentWeek = 7
          }
          var str = this.formatDate(
            this.currentYear,
            this.currentMonth,
            this.currentDay
          )
          this.days.length = 0
          // 今天是周日，放在第一行第7个位置，前面6个
          // 初始化本周
          for (var i = this.currentWeek; i >= 0; i--) {
            var d2 = new Date(str)
            d2.setDate(d2.getDate() - i)
            var dayobjectSelf = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
            dayobjectSelf.day = d2
            this.days.push(dayobjectSelf) // 将日期放入data 中的days数组 供页面渲染使用
          }
          // 其他周
          for (var j = 1; j <= 35 - this.currentWeek; j++) {
            var d3 = new Date(str)
            d3.setDate(d3.getDate() + j)
            var dayobjectOther = {}
            dayobjectOther.day = d3
            this.days.push(dayobjectOther)
          }
        },
        getDayTime(el) {
          this.$prompt('请输入事件', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            this.$data.tableData[0].time = el.toString()
            console.log(this.$data.tableData[0].time)
            this.$data.tableData[0].event = value
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        },
        pickPre: function(year, month) {
          // setDate(0); 上月最后一天
          // setDate(-1); 上月倒数第二天
          // setDate(dx) 参数dx为 上月最后一天的前后dx天
          var d = new Date(this.formatDate(year, month, 1))
          d.setDate(0)
          this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },
        pickNext: function(year, month) {
          var d = new Date(this.formatDate(year, month, 1))
          d.setDate(35)
          this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year, month, day) {
          var y = year
          var m = month
          if (m < 10) m = '0' + m
          var d = day
          if (d < 10) d = '0' + d
          return y + '-' + m + '-' + d
        }
      }
    }
</script>
<style>
    #calendar {
        font-size: 12px;
        width: 100%;
        margin: 0 auto;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    .month {
        width: 100%;
        color: #333333;
    }
    .month ul {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        height: 35px;
    }
    .year-month {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 10px;
    }
    .choose-month {
        text-align: center;
        font-size: 12px;
    }
    .arrow {
        padding: 15px;
        color: #999999;
    }

    .month ul li {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 3px;
    }
    .weekdays {
        margin: 0;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        color: #999;
        justify-content: space-around;
    }
    .weekdays li {
        display: inline-block;
        width: 13.6%;
        text-align: center;
    }
    .days {
        padding: 10px;
        background: #ffffff;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }
    .days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding-bottom: 4px;
        padding-top: 10px;
        font-size: 12px;
        color: #000;
    }
    .days li .active {
        padding: 6px 10px;
        border-radius: 50%;
        background: #00b8ec;
        color: #fff;
    }
    .days li .other-month {
        padding: 5px;
        color: gainsboro;
    }
    .days li:hover>span>span {
        padding: 6px 10px;
        border-radius: 50%;
        background: #e1e1e1;
        color: #fff;
    }
</style>