<template>
    <div>
        <!-- <input type="text" v-model="message.msg" placeholder="Enter message" />
        <button @click="sendMessage">Send</button>
        <div v-for="(message, index) in messages" :key="index">{{ message }}</div> -->
      </div>
</template>
<script>
import { ElNotification } from 'element-plus'
    export default {
      data() {
        return {
          messageInput: '',
          messages: [],
          websocket: null,
          dataList: [],
          message: {
          time:null,//时间
          from: '',
          msg: '',
        },
        userdl:[],
        };
      },
      created(){
        
      },
      mounted() {
        this.initWebSocket();
      },
      methods: {
      initWebSocket() {
    
      this.userdl=JSON.parse(localStorage.getItem("user"));
      if(this.userdl!=null){
      if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          
          if (this.websocket != null) {
            this.websocket.close();
            this.websocket = null;
          }
        }
      
           // 开启一个websocket服务
           this.websocket = new WebSocket("wss://127.0.0.1:8443/ws/"+this.userdl.user);
           // 打开事件
           this.websocket.onopen = function () {
             console.log("websocket已打开");
           };
           // 获得消息事件
           this.websocket.onmessage = function (msg) {
            let data = JSON.parse(msg.data)
             if(data.msg=="购买奶茶"){
                  ElNotification({
                    title: '你有一个新的订单！请查收！',
                    message:data.from+"购买了奶茶,请尽快出餐！",
                    type: 'success',
                    duration: 60000,
                  })
                }
           };
           // 关闭事件
           this.websocket.onclose = function () {
             console.log("websocket已关闭");
           };
           // 发生了错误事件
           this.websocket.onerror = function () {
             console.log("websocket发生了错误");
           }  
          }  
    },
        // sendMessage() {
        //   if (typeof (WebSocket) == "undefined") {
        //     console.log("您的浏览器不支持WebSocket");
        //   } else {
        //     console.log("您的浏览器支持WebSocket");
        //     this.message.from=this.userdl.user;
        //     this.message.time=new Date().toLocaleTimeString();
        //     this.websocket.send(JSON.stringify(this.message));
        //     this.message.msg = '';
        //   }
          
        // }
      },
      
    };
    </script>
    <style></style>