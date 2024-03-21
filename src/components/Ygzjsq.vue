<template>
    <div>
        <div class="statistic-card">
        <el-statistic value="">
            
            
            <template #title>
              <div style="display: inline-flex; align-items: center">
                {{ti}}
                </div>
            </template>
        </el-statistic>
        <el-icon v-if="timerRunning" style="margin-top: 1%;padding-top: 10px;"><CoffeeCup style="margin-top: 10px;" /></el-icon>
        
        <el-icon v-else style="margin-top: 1%;padding-top: 10px;"><EditPen style="margin-top: 10px;" /></el-icon>
        <el-text class="mx-1" type="primary">您今天已工作了{{formattedTime}}</el-text>
        <el-button type="primary" round class="but" @click="toggleTimer">{{buttext}}</el-button>
        </div>
    </div>
</template>
<script>
    import { CoffeeCup,EditPen } from "@element-plus/icons-vue";
    export default {
       data() {
           return {
            ti:'已工作时间',

      buttext:'休息片刻',
      workingTime: 0,
        timerRunning: false,
      timeElapsed: 0,
      timer: null,
      pauseTime:0,
           }
       },
       components: {
        CoffeeCup,
        EditPen,
       },
       created() {

    // this.toggleTimer();
    // this.startTime=Date.now();
     // 从 cookie 中获取上次保存的工作时间
     const savedWorkingTime =localStorage.getItem('workingTime');
    if (savedWorkingTime) {
      this.workingTime = parseInt(savedWorkingTime);
    }
    // 创建定时器，每秒更新工作时间并保存到 cookie
    this.timer = setInterval(() => {
      this.workingTime++;
      if(localStorage.getItem('workingTime')){
        if(localStorage.getItem('starttime')==null){
        // console.log(year,month,day);
        var starttime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
        localStorage.setItem('starttime', starttime);
      }
        this.setTime();
      }
      localStorage.setItem('workingTime', this.workingTime); 
    }, 1000);
  },
  
  computed: {

    formattedTime() {
      this.timeElapsed=this.workingTime;
        // console.log(this.timeElapsed);
      const hours = Math.floor((this.timeElapsed / 3600)%60);
      const minutes = Math.floor((this.timeElapsed / 60)%60);
      const seconds = this.timeElapsed % 60;
      return `${hours < 10 ? '0' : ''}${hours}小时${minutes < 10 ? '0' : ''}${minutes}分${seconds < 10 ? '0' : ''}${seconds}秒`;
     
    }
  },
  beforeDestroy() {
    // 销毁组件前清除定时器
    clearInterval(this.timer);
  },
  methods: {
    toggleTimer() {
      this.timerRunning = !this.timerRunning;
      if (this.timerRunning) {
        this.buttext="继续工作";
        clearInterval(this.timer);
      } else {
        this.buttext="休息片刻";
        // console.log(this.getCookie('workingTime'));
        this.timer = setInterval(() => {
          if(localStorage.getItem('workingTime')){
            this.workingTime=Number(localStorage.getItem('workingTime'));
            this.workingTime++;
            localStorage.setItem('workingTime', this.workingTime);
          }
          else{
            this.workingTime=0;
            localStorage.setItem('workingTime', this.workingTime);
          }
          }, 1000);
      }
    },


        //设置工作过期时间
    secondToDate(second) {
    if (!second) {
    return 0;
    }
    var time = 0;
    if (second >= 24 * 3600) {
    time= parseInt(second / (24 * 3600));
    second %= 24 * 3600;
    }
    
    //alert(time);
    return time;
    },
    setTime() {
    var starttime = localStorage.getItem('starttime');
    var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
     var currentTime = this.secondToDate((timestamp - starttime));
    //  console.log(starttime);
    //  console.log(timestamp);
    //  console.log(currentTime);
    if(currentTime>=1){
      this.workingTime=0;

      var starttime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
      localStorage.setItem('starttime', starttime);
     localStorage.removeItem("workingTime");
    }
    },  
  
  },
 


  // destroyed() {
  //   clearInterval(this.timer);
  // }
    }
</script>
<style>
    .statistic-card {
  height: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}
/* 按钮样式 */
.but{
    /* position: absolute; */
  bottom: 10px;
  right: 10px;
  margin-left: 60%;
  display: none; /* 默认隐藏 */
}
.statistic-card:hover .but {
  display: block; /* 鼠标悬停时显示 */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; /* 设置淡入淡出的过渡效果 */
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>