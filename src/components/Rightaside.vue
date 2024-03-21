<template>
    <div>
        <el-card class="box-card-right">
            <el-card>
              <el-text tag="b" size="large" style="color: rgb(239, 241, 241);">日历 </el-text>
              <div class="custom-calendar">
                <div class="header">
                  <button @click="prev">&lt;</button>
                  <span>{{ displayDate }}</span>
                  <button @click="next">&gt;</button>
                </div>
                <el-calendar
                style="height: 300px;"
                  v-model="date"
                  :first-day-of-week="1"
                  :events="events"
                  @click="handleDateChange"
                  
                ></el-calendar>
              </div>
            </el-card>
        <el-card v-if="userdl.userzt==='3'"  style="margin-top: 2%;">
          <el-text tag="b" size="large" style="color: rgb(239, 241, 241);">展播栏(可滚动) </el-text>
          <Szzbl></Szzbl>
        </el-card>
        <el-card v-else style="margin-top: 2%;height: 353px;">
          <el-tag tag="b" type="error" size="large" style="margin-top: 50%;margin-left: 20%;">权限不够，无法修改展播栏 </el-tag>
        </el-card>
        </el-card>
    </div>
</template>
<script>
import Szzbl from '../components/Szzbl.vue';
export default {
    name:'Rightaside',
    data() {
    return {
        date: new Date(),
      events: [
        { date: new Date(2024, 1, 14), type: "success", content: "情人节" },
        { date: new Date(2024, 3, 1), type: "info", content: "劳动节" },
        { date: new Date(2024, 10, 11), type: "warning", content: "光棍节" },
      ],
      count:1,
      userdl:[],
       
    }
   
  },
  created(){
    this.userdl = JSON.parse(localStorage.getItem("user"));
  },
  components: {
    Szzbl,
  },
  computed: {
    displayDate() {
      return this.date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
      });
    },
  },
  methods: {
    prev() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    },
    next() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
    },
    handleDateChange() {
      const rq=this.date.toLocaleDateString();
      // console.log(rq);
      const date1 = new Date(rq);
      // 获取年、月、日
      const year = date1.getFullYear();
      const month = String(date1.getMonth() + 1).padStart(2, '0'); // 注意月份是从0开始的，需要加1，并且补零
      const day = String(date1.getDate()).padStart(2, '0'); // 补零

      // 拼接成 yyyy-MM-dd 格式的字符串
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
    },
    load(){
      this.count +=2;
    }
  }
}
</script>
<style>
/* 右侧边栏盒子 */
.box-card-right{
    width: 90%;
  height: 90%;
  margin-left: 2%;
  padding: 1px 1px 1px 1px;
  border-radius: 20px;
}

/* 日历 */
.custom-calendar {
  width: 100%;
  height: 300px;
 
  border-radius: 4px;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
 
}

.header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.header button:hover {
  color: #409eff;
}

.el-calendar {
  padding: 10px;
  height: 200px;
}
.el-calendar__header{
  display: none;
}
/* 天数样式 */
.el-calendar-day{
  width: 30px;
  height: 30px;
  border-radius: 8px;
}
.el-calendar-table .el-calendar-day{
  width: 30px;
  height: 30px;
}

/* 日历样式 */
.prev{
  border-radius: 8px;
}
.current{
  border-radius: 8px;
}
.next{
  border-radius: 8px;
}
/* 右下角列表 */

.infinite-list {
  height: 315px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>