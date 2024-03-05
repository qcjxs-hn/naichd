<template>
    <div class="dark ">
        <!-- 头部 -->
        <!-- <Header ></Header> -->
        <!-- 主体 -->
       
        <div class="ztys" >
            <el-card style="width: 100%;height: 100%;border-radius: 20px;">
            <el-container class="containys">
    
                <el-aside style=" margin-left: 2%;margin-top: 4%;" width="140px">
                    <Leftaside></Leftaside>
                </el-aside>
                <el-main style="margin-top: 4%;">
                    <div style="display:flex;" >
                    <!-- 内容 -->
                
                <router-view style="flex:1;"></router-view>
                </div>
               </el-main>
            <el-aside style=" margin-right: 1%;margin-top: 4%;" width="380px">
               
               <Rightaside></Rightaside>
            </el-aside>
        </el-container>

    </el-card>
    </div>
    </div>
</template>
<script>
    import Rightaside  from "../components/Rightaside.vue";
    import Leftaside  from "../components/Leftaside.vue";
    export default {
        name:'HomePage',
        components:{
            // Header
            Leftaside,
            Rightaside,
        }
    }
</script>
<style>
    /* 主体盒子 */
    .ztys{
    width: 100%;
    height: 960px;
    /* background-color: #F3F3F3; */
    border-radius: 20px;
    box-shadow:   

0 2px 4px rgba(0, 0, 0, 0.2),   

0 8px 16px rgba(0, 0, 0, 0.2),   

0 16px 32px rgba(0, 0, 0, 0.2);  
    }
    .containys{
    margin-top: 1%;
    height: 90%;
}
</style>