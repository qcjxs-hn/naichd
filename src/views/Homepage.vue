<template>
    

  <div>
    <el-space direction="vertical" style="align-items:normal;width: 100%;">
      <!-- 盒子顶部栏 -->
    <div>
                <el-row :gutter="10">
                    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                        <div class="grid-content ep-bg-purple-light">
                    <el-space direction="vertical" alignment="left"  :size="size">
                          <el-text tag="b" size="large">你好,超级管理员：{{username}}</el-text>
                          <el-text >欢迎来到奶茶小程序后台管理系统。</el-text>
                    </el-space>
                    </div>
                </el-col>
                    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    </el-col>
                    
                    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
                      ><div class="grid-content ep-bg-purple-light">
                        <el-space >
                        <el-card shadow="hover" class="el-care-right-an" ><el-icon class="el-care-right-an-i"><Search /></el-icon></el-card>
                        <el-card shadow="hover" class="el-care-right-an" ><el-icon class="el-care-right-an-i"><Bell /></el-icon></el-card>
                    </el-space>
                      </div></el-col>
                  </el-row>
              </div>
               <!-- 盒子中部栏 -->
              <div style="margin-top: 2%;">
                <el-row :gutter="10" style="width: 100%;">
                  <el-col :span="8"><div class="box-card1">
                    <!-- 订单情况 -->
                    <Ddqk></Ddqk>
                  </div></el-col>
                  <el-col :span="8"><div class="box-card1">
                    <el-space direction="vertical" style="align-items:normal;width: 100%;">
                      <el-card class="box-card2">
                        
                        <el-row>
                          <el-col :span="8">
                           <!-- 数字显示 -->
                           <Szxs :ti="cardwz0" :ts="cardwzts0" :nu="currentMonthDataCount" :bfb="currentMonthDatabfb"></Szxs>
                          </el-col>
                          <el-col :span="16">
                            <!-- 图形显示 -->
                            <Txxs :bfb="currentMonthDatabfb"></Txxs>
                            </el-col>
                            </el-row>
                      </el-card>
                      <el-card class="box-card2" style="margin-top: 4%;">
                        <el-row>
                          <el-col :span="8">

                           <!-- 数字显示 -->
                           <Szxs :ti="cardwz1"  :ts="cardwzts1" :nu="calculateOrderCount" :bfb="calculateOrderbfb"></Szxs>
                          </el-col>
                          <el-col :span="16">
                            <!-- 图形显示 -->
                            <Txxs :bfb="calculateOrderbfb"></Txxs>
                            </el-col>
                            </el-row>
                      </el-card>
                    </el-space>
                  </div></el-col>
                  <el-col :span="8"><div class="box-card1">
                    <el-space direction="vertical" style="align-items:normal;width: 100%;">
                      <el-card class="box-card2">
                      
                      <!-- 已工作时间 -->
                      <Ygzjsq></Ygzjsq>
                      </el-card>
                      <el-card class="box-card2" style="margin-top: 4%;">
                        <!-- 新增代办 -->
                        <Xzdb></Xzdb>
                      </el-card>
                    </el-space>
                  </div></el-col>
                </el-row>
              </div>
               <!-- 盒子底部栏 -->
              <div style="margin-top: 5%;">
                <el-row :gutter="10" style="width: 100%;">
                  <el-col :span="8"><el-card class="box-card3">
                   
                    <Dppm  style="width: 100%;height: 100%;"></Dppm>
                    </el-card>
                    </el-col>
                    <el-col :span="16"><el-card class="box-card3">
                      
                      <Ddsj></Ddsj>
                    </el-card>
                    </el-col>
                    </el-row>

              </div>
            </el-space>   
    </div>
</template>
<script>
import request from '../../utils/requestf';
import {Search,
  Bell,
} from '@element-plus/icons-vue'
import Ddqk from '../components/ddqk.vue'
import { useTransition } from '@vueuse/core'
import Szxs from '../components/Szxs.vue'
import Txxs from '../components/Txxs.vue'
import Ygzjsq from '../components/Ygzjsq.vue'
import Xzdb from '../components/Xzdb.vue'
import Dppm from '../components/Dppm.vue'
import Ddsj from '../components/Ddsj.vue'
export default {
  name: 'Home',
  data() {
    return {
       username:'',
       userdl:[],
       source:0,
       cardwz0:'新增用户',
       cardwzts0:'一个月内登录该产品的用户数',
       cardwz1:'新增订单',
       cardwzts1:'一个月内下单的订单数',
       cardwz2:'新增代办',
       currentMonthDataCount:0,
       currentMonthDatabfb:'',
       data:[],
       dddata:[],
       calculateOrderCount:0,
       calculateOrderbfb:'',
    }
   
  },

  components: {
        Search,
        Bell,
        Ddqk,
        Szxs,
        Txxs,
        Ygzjsq,
        Xzdb,
        Dppm,
        Ddsj,
  },
  created(){
    this.loadname();
    this.loadxzyh();
    this.loadxzdd();
   
  },
  methods: {
    //加载登录名字
    loadname(){
      this.userdl=JSON.parse(localStorage.getItem("user"));
      
      console.log(this.userdl);
      if(this.userdl!=null){
        this.username=this.userdl.user;
      }else{
        this.$router.push("/login");
      }
    },
    outputValue(){
      return useTransition(this.source, {duration: 1500,});
    },
  // 加载新增用户
    loadxzyh(){
            this.userdl=JSON.parse(localStorage.getItem("user"));
            if(this.userdl!=null){
            request.get("/user/superselalluser?u="+this.userdl.user).then(res =>{
                if(res.code=='200'){
                  // console.log(res.data);
                  this.data=res.data;
                  this.currentMonthDatabfb=this.currentMonthChangePercentage();
                }
              })
            }
          
    },
// 新增订单
    loadxzdd(){
      this.userdl=JSON.parse(localStorage.getItem("user"));
            if(this.userdl!=null){
            request.get("/nc/superselall?u="+this.userdl.user).then(res =>{
                if(res.code=='200'){
                  this.dddata=res.data;
                  this.calculateOrderbfb=this.calculateOrderCountChange();
          }
      })
    }
    },
    // ==============计算用户个数==============
   // 计算当前月份数据相对于上个月份的百分比变化
   currentMonthChangePercentage() {
    // 获取当前日期
    const currentDate = new Date();
    // 获取当前月份
    const currentMonth = currentDate.getMonth()+1; // 注意月份从 0 开始，需要加 1
    // 获取上个月份
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1; // 如果当前月份是 1 月，则上个月份为 12 月，否则为当前月份减 1
    // console.log(currentMonth,lastMonth,this.data);
    // 筛选出当前月份的数据数量
    this.currentMonthDataCount = this.data.filter(item => {
      // 获取数据项的创建日期
      // console.log(item);
      const createDate = new Date(item.createdate);
      // 获取数据项的月份
      const itemMonth = createDate.getMonth()+1; // 注意月份从 0 开始，需要加 1
      // console.log(itemMonth);
      // 返回月份为当前月份的数据项
      return itemMonth === currentMonth;
    }).length;
    // console.log(this.currentMonthDataCount);
    // 筛选出上个月份的数据数量
    const lastMonthDataCount = this.data.filter(item => {
      // 获取数据项的创建日期
      const createDate = new Date(item.createdate);
      // 获取数据项的月份
      const itemMonth = createDate.getMonth() + 1; // 注意月份从 0 开始，需要加 1
      // 返回月份为上个月份的数据项
      return itemMonth === lastMonth;
    }).length;
    // 计算当前月份数据相对于上个月份的百分比变化
    return (((this.currentMonthDataCount - lastMonthDataCount) / lastMonthDataCount) * 100).toFixed(0)+"";
  },
   // ==============计算订单数量变化======================
  calculateOrderCountChange() {
   const currentDate = new Date();
   const currentMonth = currentDate.getMonth() + 1;
   const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
   this.calculateOrderCount = this.dddata.filter(item => {
     const createDate = new Date(item.createdate);
     const itemMonth = createDate.getMonth() + 1;
     return itemMonth === currentMonth;
   }).length;
   const lastMonthDdDataCount = this.dddata.filter(item => {
     const createDate = new Date(item.createdate);
     const itemMonth = createDate.getMonth() + 1;
     return itemMonth === lastMonth;
   }).length;
   return (((this.calculateOrderCount - lastMonthDdDataCount) / lastMonthDdDataCount) * 100).toFixed(0)+"";
   }
  }
}
</script>
<style>
  /* 盒子 */
  .box-card1 {
  width: 100%;
  height: 260px;
  /* margin-left: 2%; */
  padding: 1px 1px 1px 1px;
  border-radius: 20px;
}
/* 小盒子 */
.box-card2 {
  width: 100%;
  height: 140px;
  /* margin-left: 2%; */
  padding: 1px 1px 1px 1px;
  border-radius: 20px;
}
/* 底部大盒子 */
.box-card3 {
  width: 100%;
  height: 320px;
  /* margin-left: 2%; */
  padding: 1px 1px 1px 1px;
  border-radius: 20px;
}

/* 顶部右边按钮 */
.el-care-right-an{
    width: 50px;
    height: 50px;
    padding-left: -10px;
    border-radius: 20px;
    text-align: center;
}
.el-care-right-an-i{
    margin-left: -2px;
}
/* 间距 */
.flex-grow {
    height: 150px;
    margin-bottom: 10%;
  flex-grow: 1;
}

</style>