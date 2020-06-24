<template>
  <div class="time-filter">
    <div class="select-groups">
      <div class="select-button" :class="{active: selectDate === 'all'}" @click="selectDateHandle('all')">
        全部<span class="select-num">{{timeCount.totalCount}}</span>
        <div class="selectTag" v-show="selectDate === 'all'">
          <div class="tag-line"></div>
        </div>
      </div>
      <div class="select-button" :class="{active: selectDate === 'week'}" @click="selectDateHandle('week')">
        近一周<span class="select-num">{{timeCount.weeklyCount}}</span>
        <div class="selectTag">
          <div class="tag-line"></div>
        </div>
      </div>
      <div class="select-button" :class="{active: selectDate === 'month'}" @click="selectDateHandle('month')">
        近一月<span class="select-num">{{timeCount.monthlyCount}}</span>
        <div class="selectTag"  v-show="selectDate === 'month'">
          <div class="tag-line"></div>
        </div>
      </div>
    </div>
    <!--日期选择器-->
    <el-date-picker
      size="small"
      type="daterange"
      style="width: 250px;margin: 0 20px;"
      v-model="dateArr"
      :picker-options="pickerOptions"
      range-separator="——"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      @change="pickerChange"
    >
    </el-date-picker>
    <!--<div class="select-data">-->
      <!--<el-date-picker-->
        <!--v-model="params.startTime"-->
        <!--type="date"-->
        <!--size="small"-->
        <!--placeholder="开始时间"-->
        <!--value-format="timestamp"-->
        <!--style="width: 140px;height: 32px">-->
      <!--</el-date-picker>-->
      <!--<div class="line"></div>-->
      <!--<el-date-picker-->
        <!--v-model="params.endTime"-->
        <!--type="date"-->
        <!--size="small"-->
        <!--placeholder="结束时间"-->
        <!--value-format="timestamp"-->
        <!--style="width: 140px;height: 32px">-->
      <!--</el-date-picker>-->
      <!--<el-button-->
        <!--class="filter-button"-->
        <!--size="small"-->
        <!--style="vertical-align: top"-->
        <!--@click="pickerChange">筛选</el-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'timeFilter',
    props: {
      timeCount: {
        type: Object,
        default: () => {}
      /*//  {
        totalCount: 0,
        monthlyCount: 0,
        weeklyCount: 0
      }*/
      }
    },
    data () {
      return {
        total: 0,
        selectDate: 'all',
        searchVal: '',
        dateArr: [],
        params: {
          endTime: null,
          startTime: null
        },
        timeRange: null,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const t = new Date().getTime()
              picker.$emit('pick', [t, t])
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const t = new Date().getTime() - 3600 * 1000 * 24
              picker.$emit('pick', [t, t])
            }
          }, {
            text: '本周',
            onClick (picker) {
              const nowWeek = new Date().getDay()
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (nowWeek - 1))
              end.setTime(end.getTime())
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '上周',
            onClick (picker) {
              const nowWeek = new Date().getDay()
              const end = new Date()
              const start = new Date()
              const weekTime = 7 * 3600 * 1000 * 24
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (nowWeek - 1) - weekTime)
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (7 - nowWeek) - weekTime)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick (picker) {
              const nowYear = new Date().getFullYear()
              const nowMonth = new Date().getMonth()
              const end = new Date().getTime()
              const start = new Date(nowYear, nowMonth, 1)
              picker.$emit('pick', [start * 1, end])
            }
          }]
        }
      }
    },
    methods: {
      // 日期切换项
      // 后端按照日期计算（不按照时间点）/具体时间点也是由后端计算
      selectDateHandle (key) {
        this.selectDate = key
        let nowDate = new Date().toLocaleDateString()
        let now = +new Date(nowDate)
        let Map = {
          week: {
            end: now,
            start: (now - 6 * 86400000)
          },
          month: {
            end: now,
            start: (now - 29 * 86400000)
          },
          all: {
            start: '',
            end: ''
          }
        }
        let start = Map[key].start || null
        let end = Map[key].end || null
        this.params.startTime = start || ''
        this.params.endTime = end || ''
        this.timeRange = start ? [start, end] : []
        this.pickerChange()
      },
      pickerChange (val) {
        this.params.startTime = val && val[0]
        this.params.endTime = val && val[1]
        if (this.params.startTime > this.params.endTime) {
          this.$message.warning('结束时间不能小于开始时间！')
          return
        }
        this.$emit('pickerChange', this.params)
      }
    }
  }
</script>

<style scoped lang="scss">
  .time-filter{
    display: flex;
    align-items: center;
    .select-groups{
     display: flex;
     height: 32px;
     margin-left: 24px;
     border-radius: 16px;
     border: solid 1px #ececec;
     .select-button{
       width: 88px;
       position: relative;
       font-size: 12px;
       line-height: 32px;
       border-right: 1px solid #ececec;
       cursor: pointer;
       .select-num{
         color: #cdcdcd;
         margin-left: 4px;
       }
       &:last-child{
         border: none
       }
       .selectTag{
         display: none;
         position: absolute;
         bottom: -3px;
         width: 100%;
         .tag-line{
           height: 2px;
           width: 40px;
           margin: 0 auto;
           background-color: #ED6C00;
         }
       }
     }
     .active{
       font-weight: bold;
       .selectTag{
         display: block;
       }
     }
   }
    .select-data{
      margin-left: 24px;
      .line{
        display: inline-block;
        border-top: 2px solid black;
        width: 9px;
        .filter-button{
          height: 32px;
          border: none;
          background-color: #eee;
        }
      }
    }
  }
</style>
