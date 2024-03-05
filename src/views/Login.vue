<template>
    <div class="dljmsy">

  <el-dialog class="dlys" v-model="dialogVisible" :close-on-click-modal="false" :modal="false" :title="dbwzxs" align-center="true" :show-close="false" width="500" draggable center>
    <el-container>
      <el-header> <h1 v-if="qh=='0'&&show" style="text-align: center;">扫码登录</h1></el-header>
      <el-main  id="smao">
        <div v-if="!loggedIn" style="text-align: center;">
          <canvas ref="qrCanvas"></canvas>
          <p v-if="!qrScanned">请使用微信扫描二维码登录</p>
          <p v-else>等待扫码...</p>
        </div>
        <div style="text-align: center;" v-else>
          <p>登录成功！</p>
          <p>欢迎您，{{ userName }}</p>
        </div>
      </el-main>
      <el-main v-if="qh=='1'" >
        <div v-if="!loggedIn" style="text-align: center;">
        <el-form  :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password2" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
        </div>
        <div style="text-align: center;" v-else>
          <p>登录成功！</p>
          <p>欢迎您，超级管理员：{{ userName }}</p>
        </div>
      </el-main>
      <el-footer>
        <el-link type="primary" @click="qjgldl()" v-if="show">{{dibwzxs}}</el-link>
      </el-footer>
    </el-container>
   
    
  
  </el-dialog>
      
      </div>
</template>
<script>
    import QRCode from 'qrcode';
    import request from '../../utils/requestf';
    import { ElMessage } from 'element-plus'
    import md5 from 'md5'
    /* eslint-disable */
    export default {
        name:'Login',
        data() {
        return {
            qrScanned: false,
            loggedIn: false,
            dialogVisible:true,
            userName: '',
            show:true,
            code:'',
            qh:'0',
            dl:[],
            form:{
              user:'',
              password:'',
            },
            password2:'',
            passwordjm:'',
            dbwzxs:'管理员登录',
            dibwzxs:'超级管理员登录',
        };
    },
    async created(){
    await this.getCode();
    this.generateQRCode();
    },
    mounted() {
    
    this.checkLoginStatus();
  },
  methods: {
    async getCode() {
      
            const response = await request.get("/admin/gc");
            console.log(response);
            if (response.code =="200") {
                console.log(response.data);
                this.code = response.data;
                this.intervalId = setInterval(this.checkLoginStatus, 5000);
            }
      
    },
    async generateQRCode() {
        const canvas = this.$refs.qrCanvas;
        const qrUrl = 'http://hhh.free.idcfengye.com/hqxx?code=' + this.code;
        console.log(this.code, qrUrl);
        await QRCode.toCanvas(canvas, qrUrl);
    },
    checkLoginStatus() {
        // 检查登录状态的逻辑
        // 如果已经登录，则设置 loggedIn 为 true，并设置 userName
        request.get("/admin/cu?c="+this.code).then((res1) => {
        // console.log(res1.data);
          if(res1.data!=null&&res1.code!=-1){
            request.get("/admin/cadl?u="+res1.data).then((res2) => {
              if(res2.code=="200"){
                console.log(res2.data.data);
                if(res2.data!=null){
                  this.dl=res2.data.data;
                  this.loggedIn=true;
                  this.show=false;
                  localStorage.setItem("user",JSON.stringify(res2.data.data))
                  clearInterval(this.intervalId);
                  //是否有昵称
                  if(res2.data.data.nickname!=""){
                  this.userName=res2.data.data.nickname;
                  }else{
                    this.userName=res2.data.data.user;
                  }
                  this.$router.push('/home')
                }
              }
            })
          }else{
            if(res1.msg!=null){
              ElMessage({
                message: res1.msg,
                type: 'warning',
              })
            }
          }
        })
    },
    //登录切换
    qjgldl(){
      if(this.qh=="0"){
        this.qh="1";
        document.getElementById("smao").style.display="none";
        this.dibwzxs="管理员登录";
        this.dbwzxs="超级管理员登录";
      }else{
        this.qh="0";
        document.getElementById("smao").style.display="";
        this.dibwzxs="超级管理员登录";
        this.dbwzxs="管理员登录";
      }
    },
    onSubmit(){
      if(this.form.user == ''){
                this.$message({
                    message: '账号不能为空',
                    type: 'error'
                });
                return;
            }
            else if(this.password2 == ''){
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                });
                return;
            }else{
                this.passwordjm=md5(this.password2);
                console.log(this.passwordjm);
                this.form.password=this.passwordjm;
                request.post("/admin/sal",this.form).then(res1 =>{
                  console.log(res1);
                  if(res1.code=='200'){
                    if(res1.data.code=="-1"){
                      this.$message({
                          message: res1.data.msg,
                          type: 'error',
                      });
                      return;
                    }else if(res1.data.code=="-2"){
                      this.$message({
                          message: res1.data.msg,
                          type: 'error',
                      });
                      return;
                    }else{
                      this.$message({
                          message: '登录成功！',
                          type: 'success',
                      });
                      this.dl=res1.data.data;
                                        //是否有昵称
                        if(res1.data.data.nickname!=""){
                        this.userName=res1.data.data.nickname;
                        }else{
                          this.userName=res1.data.data.user;
                        }
                        this.$router.push('/home');
                      this.form={};
                      this.password2="";
                      this.loggedIn=true;
                      this.show=false;
                    localStorage.setItem("user",JSON.stringify(res1.data.data))  //存储用户信息到浏览器
                    // this.$router.push("/index")
                    }
                    
                  }
                })
            }

    }
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
 /* 设置背景图片 */
   .dljmsy{
    height: 1440px;
    background-image: url('../assets/dljm.jpg');
    background-size: 100% 100%; /* 背景图片将按比例缩放，以适应背景区域 */
    background-repeat: no-repeat; /* 防止背景图片重复 */
    background-attachment: fixed; /* 背景图片将固定在视图上，不会随页面滚动 */
    background-position: center; /* 背景图片在背景区域中居中显示 */
   } 
   /* 登录样式 */
   .dlys
   {
    top: 220px;
   }
</style>