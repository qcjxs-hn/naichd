<template>
    <div @click="showPopup">
        <el-row>
            <el-col :span="6">
        <div class="statistic-card">
            <el-statistic :value="dbuserz.length">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    {{ti}}
                    </div>
                </template>
            </el-statistic>
        </div>
        </el-col>
        <el-col :span="18" >
            <div class="dbcardys" v-for="(it,i) in dbuserz.slice(0, 3)" :key="i" >
                <div>
                    <div v-if="it.split(';')[1]=='管理员'" >
                        <el-row>  
                            <el-col :span="2">
                    <el-icon ><User /></el-icon>
                </el-col>
                <el-col :span="22">
                    <el-link @click="tzuser()" :underline="false"  style="font-size: 12px;" class="mx-1" type="primary">{{it.split(';')[0]+glyzcwz+it.split(';')[1]+glyzcwz2}}</el-link>
                </el-col>
                        </el-row>
                    </div>
                    <div v-else-if="it.split(';')[1]=='奶茶'" >
                        <el-row>  
                            <el-col :span="2">
                    <el-icon ><MilkTea /></el-icon>
                </el-col>
                <el-col :span="22">
                    <el-link :underline="false"  style="font-size: 12px;" class="mx-1" type="primary">{{it.split(';')[0]+gml+it.split(';')[1]+gml2}}</el-link>
                </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <el-row>  
                            <el-col :span="2">
                        <el-icon><Link /></el-icon>
                    </el-col>
                    <el-col :span="22">
                    <el-link @click="tzdpdy()" :underline="false" style="font-size: 12px;"  class="mx-1" type="primary">{{it.split(';')[0]}}{{dpbdwz}}{{it.split(';')[1]}},{{dpbdwz2}}</el-link>
                </el-col>
            </el-row>
                </div>
                </div>
            </div>
        </el-col>
        </el-row>
        <!-- 弹出的悬浮窗 -->
    <transition name="zoom">
        <el-dialog v-model="isPopupVisible" class="popup-content" open-delay="0.3"  :title="ti" width="200" height="200" draggable>
            <div class="xfdbcardys" v-for="(it,i) in dbuserz" :key="i" >
                <div>
                    <div v-if="it.split(';')[1]=='管理员'" >
                        <el-row>  
                            <el-col :span="2">
                    <el-icon ><User /></el-icon>
                </el-col>
                <el-col :span="22">
                    <el-link @click="tzuser()" :underline="false"  style="font-size: 16px;" class="mx-1" type="primary">{{it.split(';')[0]+glyzcwz+it.split(';')[1]+glyzcwz2}}</el-link>
                </el-col>
                        </el-row>
                    </div>
                    <div v-else-if="it.split(';')[1]=='奶茶'" >
                        <el-row>  
                            <el-col :span="2">
                    <el-icon ><MilkTea /></el-icon>
                </el-col>
                <el-col :span="22">
                    <el-link :underline="false"  style="font-size: 12px;" class="mx-1" type="primary">{{it.split(';')[0]+gml+it.split(';')[1]+gml2}}</el-link>
                </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <el-row>  
                            <el-col :span="2">
                        <el-icon><Link /></el-icon>
                    </el-col>
                    <el-col :span="22">
                    <el-link @click="tzdpdy()" :underline="false" style="font-size: 16px;"  class="mx-1" type="primary">{{it.split(';')[0]}}{{dpbdwz}}{{it.split(';')[1]}},{{dpbdwz2}}</el-link>
                </el-col>
            </el-row>
                </div>
                </div>
            </div>
          </el-dialog>
      </transition>
    </div>
</template>
<script>
    import request from '../../utils/requestf';
    import { User,Link,MilkTea
} from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
    export default {
        data() {
            return {
                // 统计数据
                ti:'新增代办 ',
                usertj:0,
                data:[],
                data2:[],
                dbuserz:[],
                glyzcwz:'注册了',
                glyzcwz2:'账号等待同意！',
                dpbdwz:'绑定店铺',
                dpbdwz2:'店铺等待审核！',
                gml:'购买了',
                gml2:',请尽快出餐！',
                isPopupVisible: false,
            }
        },
        components:{
            User,
            Link,
        },
        mounted() {
          
        },
        created(){
            this.loadxzcgly();

        },
        methods: {
            loadxzcgly(){
                // 加载数据
            this.userdl=JSON.parse(localStorage.getItem("user"));
            if(this.userdl!=null){
                // 判断权限
                if (this.userdl.userzt == '3') {
            request.get("/user/superselalluser?u="+this.userdl.user).then(res =>{
                if(res.code=='200'){
                  // console.log(res.data);
                  this.data=res.data;
                  for(var i=0;i<this.data.length;i++){
                      if(this.data[i].userzt=="4"){
                        this.dbuserz.push(this.data[i].user+';'+"管理员");
                      }
                  }
                //   console.log(this.dbuserz);
                }
            });
            request.get("/dy/sal?u="+this.userdl.user).then(res2 =>{
                if(res2.code=='200'){
                  this.data2=res2.data;
                  for(var i=0;i<this.data2.length;i++){
                      if(this.data2[i].dpzt=="0"){
                        this.dbuserz.push(this.data2[i].user+';'+this.data2[i].dpmc);
                      }
                  }
                //   console.log(this.dbuserz);
                }
            });
        }else if(this.userdl.userzt==="1"){
            this.userdp = JSON.parse(localStorage.getItem("shop"));
                        if (this.userdp != null) {
                            request.get("/nc/seldd?d=" + this.userdp.dpmc).then(res => {
                                if (res.code == '200') {
                                    this.data3 = res.data;
                                    for(var i=0;i<this.data3.length;i++){
                                        if(this.data3[i].sfzf=="1"){
                                            this.dbuserz.push(this.data3[i].buyuser+';'+"奶茶");
                                            // this.ddtz();
                                        }
                                    }
                                }
                            })
                        }
        }
            }
            },
            // 打开或者关闭模态框
            showPopup() {
                this.isPopupVisible = true;
                },
            hidePopup() {
                this.isPopupVisible = false;
                },
            // 跳转User界面
            tzuser(){
                this.$router.push('/user');
            },
            // 跳转店铺对应界面
            tzdpdy(){
                this.$router.push('/dystore');
            },
              // 订单通知
              ddtz(){
                ElNotification({
                    title: 'Success',
                    message: 'This is a success message',
                    type: 'success',
                    duration: 0,
                })
            }
        }
    }
</script>
<style>
        .statistic-card {
  height: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}
/* 代办卡片效果 */
.dbcardys{
    width: 100%;
    height: 20px;
  /* background-color: #f0f0f0; 设置背景颜色 */
    padding: 10px; /* 设置内边距 */
    border-radius: 5px; /* 设置圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加浮雕效果 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
    
}
.dbcardys:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时改变阴影效果 */
}
/* 悬浮窗代办样式 */
.xfdbcardys{
    width: 96%;
    height: 60px;
  /* background-color: #f0f0f0; 设置背景颜色 */
    padding: 10px; /* 设置内边距 */
    border-radius: 5px; /* 设置圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加浮雕效果 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
    overflow: auto;
}
.xfdbcardys:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时改变阴影效果 */
}


/* 弹出悬浮窗的内容样式 */
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  height: 600px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  transition: transform 0.3s linear; 
  /* transition: 0.3s ease-in-out;
  transform: scale(1.2); */
}

.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.3s ease;
}
.zoom-enter,
.zoom-leave-to {
  transform: scale(0.7);
}
</style>