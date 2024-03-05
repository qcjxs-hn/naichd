<template>

  <div>
    <a>{{code}}:{{hashCode}}</a>

    <el-button style="margin-top: 10%;margin-left: 2%;" size="large" type="primary" @click="Login">一键登录</el-button>
  </div>
</template>
<script>
  import { ElMessage } from 'element-plus'
  import request from '../../utils/requestf';
  /* eslint-disable */
  export default {
    name: 'Hqxx',
    data() {
      return {
        dz: '',
        id: '',
        deviceId: '', // 存放设备ID的变量,
        code:'',
        hashCode:'',
      }
    },
    created(){
      this.code=this.$route.query['code'];

    },
    methods: {
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition); // 成功时调用 showPosition 函数
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      },

      // 显示位置信息的函数
      showPosition(position) {
        this.dz = position.coords.latitude + "," + position.coords.longitude;
        const latitude = position.coords.latitude; // 经度
        const longitude = position.coords.longitude; // 纬度
        alert(latitude, longitude);
        // 根据经纬度进行其他操作或发送到服务器等...
      },
      getDeviceId() {
        const uniqueIdentifier = navigator.userAgent; // 这里可以根据自己的需求选择其他属性作为唯一标识
        this.id = uniqueIdentifier;
      },
      createUser(){
        console.log(this.id);
        // 假设这是你的用户代理字符串
         const userAgent = this.id;
        // 提取所需部分
        if(userAgent!=null){
          // 使用正则表达式提取所需部分
          const osInfo = userAgent.match(/\((.*?)\)/)[1]; // 提取括号中的内容
          const appInfo = userAgent.match(/WeChat\/.*?\b/)[0]; // 匹配以 WeChat/ 开头的部分

          // 合并并转换为数字
          const combinedString = osInfo + ' ' + appInfo;
          this.hashCode = this.hashCodeFromString(combinedString);
        }
      },
    hashCodeFromString(str) {
          let hash = 0;
          if (str.length === 0) {
              return hash;
          }
          for (let i = 0; i < str.length; i++) {
              const char = str.charCodeAt(i);
              hash = ((hash << 5) - hash) + char;
              hash &= hash; // 将 hash 转换为 32 位有符号整数
          }
          return hash;
      },
      Login(){
        this.createUser();
        request.post("/admin/rc?u="+this.hashCode+"&c="+this.code).then((result) => {
          if(result.code=="200"){
            // alert(result.data)
            if(result.data==1){
              ElMessage({
                message: '创建成功，等待创建超级管理员确认！',
                type: 'success',
              })
            }else if(result.data==2){
              ElMessage({
                  message: '登录成功！',
                  type: 'success',
                })
            }else if(result.data==3){
              ElMessage({
                message: '会话失效或者二维码失效，请刷新二维码！',
                type: 'warning',
              })
            }else if(result.data==4){
              ElMessage({
                message: '超级管理员暂未同意该账号登录！',
                type: 'warning',
              })
            }
          }
          
        })
      }
    },
    mounted() {
      this.getDeviceId();
      // this.getLocation();

    }
  }
</script>
<style>

</style>