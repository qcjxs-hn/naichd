<template>
    <div>
          <!-- 左侧侧边栏 -->
                <!-- 网站图标 -->
                <el-card class="box-card" >
                    <div style="margin-top: 50px;width: 100%;text-align: center;height: 50px;">
                    <img
                    style="width: 50px"
                    src="http://naic.asia/hhhhh.png"
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
                <el-menu-item index="user">
                  <el-icon><User /></el-icon>
                  <template #title>用户管理</template>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon><document /></el-icon>
                  <template #title>Navigator Three</template>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon><setting /></el-icon>
                  <template #title>Navigator Four</template>
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

} from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css';
    import { useToggle } from '@vueuse/shared';
    import { useDark } from "@vueuse/core";
import { isDark } from '.././components/dark.ts';
const toggleDark = useToggle(isDark);
export default {
  name:'Leftaside',
  components: {
    Document,
        IconMenu,
        Location,
        Setting,
        User,
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
       
    }
   
  },

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
</style>