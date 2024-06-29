<template>
    <div>
        
            订单情况
            
                <el-row :gutter="10" style="height: 250px;">
                    <el-col :span="3">
                      <div style="margin-top: 120px;">
                        <el-button type="primary" @click="zuoyi"><el-icon><ArrowLeftBold /></el-icon></el-button>
                </div></el-col>
                <el-col :span="18">
              <div class="smcard" >
            <el-descriptions :title="onedd.createid" column="4" direction="vertical" class="smcardin" >
                <el-descriptions-item label="用户">{{onedd.buyuser}}</el-descriptions-item>
                <el-descriptions-item label="价格">{{onedd.paymon}}</el-descriptions-item>
                <el-descriptions-item label="店铺">{{onedd.dpmc}}</el-descriptions-item>
                <el-descriptions-item label="类型">
                  <el-tag size="small">{{onedd.sfwm==1?"外卖":"自提"}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="订单信息"
                  >
                  
                  <el-descriptions title="" column="6" direction="vertical" size="small">
                    <el-descriptions-item label="名字：">{{shopcar.name}}</el-descriptions-item>
                    <el-descriptions-item label="加料：" >
                        <el-tag  size="small" v-for="(item,index) in jl" :key="index" >{{item}}</el-tag>
                    </el-descriptions-item>
                  <el-descriptions-item label="杯型">{{shopcar.bx}}</el-descriptions-item>
                  <el-descriptions-item label="温度">{{shopcar.wd}}</el-descriptions-item>
                  <el-descriptions-item label="糖度">{{shopcar.td}}</el-descriptions-item>
                  <el-descriptions-item label="数量">{{shopcar.bjz}}</el-descriptions-item>
                  <el-descriptions-item v-if="xl" label="......"></el-descriptions-item>
                  </el-descriptions>
                  
                  </el-descriptions-item>
                 
              </el-descriptions>
              <el-tag  size="large" >{{getExtraText(onedd.sfzf)}}</el-tag>
              <el-button @click="fsqc(onedd.createid)" type="primary" v-if="onedd.sfzf==='1'" style="margin-left: 40px;">发送取餐</el-button>
            </div>
            </el-col>
            <el-col :span="3" style="padding-left: 0px;" ><div style="margin-top: 120px;">
              <el-button type="primary" @click="youyi"><el-icon><ArrowRightBold /></el-icon></el-button>
              </div>
            </el-col>
          </el-row>
       
    </div>
</template>
<script>
import request from '../../utils/requestf';
import {ArrowLeftBold,
    ArrowRightBold,
} from '@element-plus/icons-vue'
export default {
    name: 'Ddqk',
    data() {
        return {
            userdl:{},
            dd:[],
            inde:0,
            onedd:[],
            shopcar:{},
            jl:[],
            xl:false,

        }
    },
    components:{
        ArrowLeftBold,
        ArrowRightBold,
    },
    created() {
        this.loaddd();
    },
    mounted(){
        this.jsq = setInterval(() => {
            this.loaddd();
        }, 5000);
    },
    beforeDestroy() {
        clearInterval(this.jsq);
    },
    methods:{
        // 加载订单
        loaddd(){
            // 调用接口
            this.userdl=JSON.parse(localStorage.getItem("user"));
            if(this.userdl!=null){
            if(this.userdl.userzt=='3'){
            request.get("/nc/superselall?u="+this.userdl.user).then(res =>{
                if(res.code=='200'){
                    console.log(res);
                    this.dd=res.data;
                    this.onedd=this.dd[0];
                    if(JSON.parse(this.onedd.shoppingcar).length>1){
                        this.xl=true;
                    }else{
                        this.xl=false;
                    }
                    this.shopcar=JSON.parse(this.onedd.shoppingcar)[0];
                    this.jl=this.shopcar.jl;
                    console.log(this.jl);
                }
            });
        }else if (this.userdl.userzt == "1") {
                        this.userdp = JSON.parse(localStorage.getItem("shop"));
                        if (this.userdp != null) {
                            request.get("/nc/seldd?d=" + this.userdp.dpmc).then(res => {
                                if (res.code == '200') {
                                    this.dd=res.data;
                                    this.onedd=this.dd[0];
                                    if(JSON.parse(this.onedd.shoppingcar).length>1){
                                        this.xl=true;
                                    }else{
                                        this.xl=false;
                                    }
                                    this.shopcar=JSON.parse(this.onedd.shoppingcar)[0];
                                    this.jl=this.shopcar.jl;
                                    console.log(this.jl);
                                  
                                }
                            })
                        }
                    }
        }
        },
        // 上一单
        zuoyi(){
            this.inde--;
            if(this.inde<0){
                this.inde=this.dd.length-1;
            }
            this.onedd=this.dd[this.inde];
            console.log(this.onedd.shoppingcar);
            this.shopcar=JSON.parse(this.onedd.shoppingcar)[0];
            if(JSON.parse(this.onedd.shoppingcar).length>1){
                        this.xl=true;
                    }else{
                        this.xl=false;
                    }
            this.jl=this.shopcar.jl;
        },
        // 下一单
        youyi(){
            this.inde++;
            if(this.inde>this.dd.length-1){
                this.inde=0;
            }
            this.onedd=this.dd[this.inde];
            
            this.shopcar=JSON.parse(this.onedd.shoppingcar)[0];
            if(JSON.parse(this.onedd.shoppingcar).length>1){
                        this.xl=true;
                    }else{
                        this.xl=false;
                    }
            this.jl=this.shopcar.jl;
            console.log(this.jl);
        },
        //按钮文字
        getExtraText(sfzf) {
			      // 根据 sfzf 的值返回不同的文字
				  var wz="";
				  if(sfzf==="0"){
					  wz='已取消';
				  }else if(sfzf==="1"){
					  wz='制作中';
				  }else if(sfzf==="2"){
					  wz='取餐中';
				  }else if(sfzf==="3"){
					  wz="已完成"
				  }
			      return wz;
			    },
                // 发送取餐
                fsqc(ddid){
                    request.post("/nc/fsqc?i="+ddid).then(res =>{
                        if(res.code=='200'){
                            this.$message({
                                type: 'success',
                                message: '发送成功!'
                            })
                            this.loaddd();
                        }else{
                            this.$message({
                                type: 'error',
                                message: '发送失败!'
                            })
                        }
                    })
                }
        
    }
}
</script>
<style>
    /* 描述卡片样式 */
    .smcard{
        padding: 10px 10px 10px 10px;
        margin-top: 10px;
        border-radius: 20px;
    box-shadow:   

0 2px 4px rgba(0, 0, 0, 0.2),   

0 8px 16px rgba(0, 0, 0, 0.2),   

0 16px 32px rgba(0, 0, 0, 0.2);  
    }
    /* 描述卡片内部样式 */
    .smcardin{
       width:100%; 
       height: 230px;
    }
</style>