<template>
    <div>
          <!-- 左侧侧边栏 -->
                <!-- 网站图标 -->
                <el-card class="box-card" >
                    <div style="margin-top: 50px;width: 100%;text-align: center;height: 50px;">
                    <img
                    style="width: 50px;border-radius: 10px;"
                    src="http://naic.asia/后端网站logo.png"
                    alt="Element logo"
                    
                  />
                </div>
                <div class="flex-grow" />
                <!-- 各项操作 -->
                <div style="margin-top: 10%;">
                <el-menu
                default-active="home"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                router
              >

                <el-menu-item index="home">
                  <el-icon><icon-menu /></el-icon>
                  <template #title>
                    <span>主页</span>
                  </template>
                </el-menu-item>
                <el-menu-item v-if="ljxs" index="user">
                  <el-icon><User /></el-icon>
                  <template #title>用户管理</template>
                </el-menu-item>
                <el-menu-item v-else @click="tctx()">
                  <el-icon><User /></el-icon>
                  <template #title>用户管理</template>
                </el-menu-item>
                <el-sub-menu index="3" >
                  <template #title>
                    <el-icon><MilkTea /></el-icon>
                    <span>奶茶</span>
                  </template>
                  <el-menu-item-group title="奶茶管理">
                    <el-menu-item index="ncdd">奶茶订单</el-menu-item>
                    <el-menu-item v-if="ljxs"index="ncgg">奶茶规格</el-menu-item>
                    <el-menu-item  index="ncpl">奶茶品类</el-menu-item>
                    <el-menu-item  index="ncsp">奶茶商品</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4" >
                  <template #title>
                    <el-icon><House /></el-icon>
                    <span>店铺</span>
                  </template>
                  <el-menu-item-group title="店铺管理">
                    <el-menu-item index="storeinfo">店铺信息</el-menu-item>
                    <el-menu-item v-if="ljxs" index="dystore">对应店铺</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="5" v-if="ljxs" >
                  <template #title>
                    <el-icon><Setting /></el-icon>
                    <span>小程序设置</span>
                  </template>
                  <el-menu-item-group  title="小程序设置">
                    <el-menu-item  index="yhj">优惠券</el-menu-item>
                    <el-menu-item  index="gn">功能栏</el-menu-item>
                    <el-menu-item  index="mygn">我的功能栏</el-menu-item>
                    <el-menu-item  index="indexqyl">首页权益栏</el-menu-item>
                    <el-menu-item  index="wj">文件条款</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item @click="tctx()"  v-else >
                  <el-icon><Setting /></el-icon>
                  <template #title>
                   
                    <span>小程序设置</span>
                  </template>
                </el-menu-item>
              
        
              </el-menu>
            </div>
            <div class="flex-grow" />
            <!-- 显示模式 -->
            <div style="display: flex; flex-direction: column;">
                <el-text tag="b" class="mx-1">Mode</el-text>
              <el-switch
              style="transform: rotate(90deg); height: 70px; "
              v-model="isDark"
              inline-prompt
              size="large"
              :active-icon="Sunrise"
              :inactive-icon="MoonNight"
              @change="toggleDark"
              :active-action-icon="Sunny"
              :inactive-action-icon="Moon"
              
          />

        </div>
                </el-card>
    </div>
</template>
<script>
      import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Sunny,
  Moon,
  Sunrise,
  MoonNight,
  User,
  MilkTea,
  House,

} from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css';
    import { useToggle } from '@vueuse/shared';
    import { useDark } from "@vueuse/core";
import { isDark } from '.././components/dark.ts';
const toggleDark = useToggle(isDark);
import { ElMessage } from 'element-plus'
export default {
  name:'Leftaside',
  components: {
    Document,
        IconMenu,
        Location,
        Setting,
        User,
        MilkTea,
        House,
  },
  data() {
    return {
        isCollapse:true,
        Sunny,
        Moon,
        Sunrise,
        MoonNight,
        toggleDark,
        isDark,
        userdl:[],
        ljxs:false,
       
    }
   
  },
  created(){
    this.userdl = JSON.parse(localStorage.getItem("user"));
    // console.log(this.userdl);
    if(this.userdl!=null){
    if(this.userdl.userzt==="3"){
      this.ljxs=true;
    }else{
      this.ljxs=false;
    }
  }
  },
  methods:{
    tctx(){
      ElMessage({
                          message: "权限不足",
                          type: 'warning',
                        })
    }
  }
}
</script>
<style>
    /* 侧边栏盒子 */
.box-card {
  width: 74%;
  height: 90%;
  margin-left: 2%;
  padding: 1px 1px 1px 1px;
  border-radius: 20px;
}
  /* 间距 */
  .flex-grow {
    height: 120px;
    margin-bottom: 10%;
    flex-grow: 1;
  }

</style>