<template>


  <div>
    <el-space direction="vertical" style="align-items:normal;width: 100%;">
      <!-- 盒子顶部栏 -->
      <div>
        <el-row :gutter="10">
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content ep-bg-purple-light">
              <el-space direction="vertical" alignment="left" :size="size">
                <el-popover :visible="visible" placement="top" :width="160">
                  <p>是否退出登录?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="small" text @click="visible = false">点错了</el-button>
                    <el-button size="small" type="primary" @click="tcdl()"
                      >确认</el-button
                    >
                  </div>
                  <template #reference>
                <el-text tag="b" @click="visible = true" size="large">你好,{{pdgly()}}：{{username}}</el-text>
              </template>
            </el-popover>
                <el-text>欢迎来到奶茶小程序后台管理系统。</el-text>
              </el-space>
            </div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          </el-col>

          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content ep-bg-purple-light">
              <el-space>
                <el-card shadow="hover" @click="sear()" class="el-care-right-an"><el-icon class="el-care-right-an-i">
                    <Search />
                  </el-icon></el-card>
                <el-card  @click="ckxx()" shadow="hover" class="el-care-right-an"><el-icon class="el-care-right-an-i">
                    <Bell />
                  </el-icon></el-card>
              </el-space>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 盒子中部栏 -->
      <div style="margin-top: 2%;">
        <el-row :gutter="10" style="width: 100%;">
          <el-col :span="8">
            <div class="box-card1">
              <!-- 订单情况 -->
              <Ddqk></Ddqk>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="box-card1">
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
                      <Szxs :ti="cardwz1" :ts="cardwzts1" :nu="calculateOrderCount" :bfb="calculateOrderbfb"></Szxs>
                    </el-col>
                    <el-col :span="16">
                      <!-- 图形显示 -->
                      <Txxs :bfb="calculateOrderbfb"></Txxs>
                    </el-col>
                  </el-row>
                </el-card>
              </el-space>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="box-card1">
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
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 盒子底部栏 -->
      <div style="margin-top: 5%;">
        <el-row :gutter="10" style="width: 100%;">
          <el-col :span="8"><el-card class="box-card3">

              <Dppm style="width: 100%;height: 100%;"></Dppm>
            </el-card>
          </el-col>
          <el-col :span="16"><el-card class="box-card3">

              <Ddsj></Ddsj>
            </el-card>
          </el-col>
        </el-row>

      </div>
    </el-space>
    <div>
      <el-dialog v-model="dialogVisible" title="消息" width="900"  style="border-radius: 20px;height: 800px;" draggable>
        <div>
          <!-- {{xxtab}}{{xxtabvalue}} -->
          <el-tabs v-model="xxtabvalue" type="card" editable class="demo-tabs" @edit="handleTabsEdit"
            tabPosition="left">
            <el-tab-pane v-for="(item,i) in xxtab" :key="i" :label="mzcl(item)" :name="mzcl(item)">
              <div>
                <!-- {{clgrxx(xxtabvalue)}} -->
                <!-- 聊天窗口 -->
                <div class="container">
                  <!-- 聊天消息列表 -->
                  <div ref="messageList" class="message-list">
                    <div v-for="(message, index) in clgrxx(xxtabvalue)" :key="index" class="chat-container">
                      <el-row >
                        <el-col :span="12">                     
                           <!-- 左边对话框 -->
                           <!-- class="left-bubble message" :class="{ 'self': message.user === user }" -->
                          <div  v-if="message.user != userdl.user"
                            >
                          <el-row  :gutter="20" style="padding-left: 0px;">
                              <el-col :span="4">
                              
                                <div>
                                  <!-- <img :src="clurl(message)" alt="avatar">  -->
                                  <el-avatar :size="40" src="https://empty" @error="errorHandler(message)">
                                  <img
                                  :src="clurl(message)"
                                  />
                                </el-avatar>
                              </div>
                             
                            </el-col>
                            <el-col :span="20">
                              <div style="margin-top: 20px;">
                                <!-- <el-card style="height: auto;width: auto;"> -->
                                  <div class="message" >
                                <el-text class="mx-1" style="background-color:#FFFFFF ; " type="primary">{{ message.content }}</el-text> 
                              </div>
                                <!-- </el-card> -->
                                <el-text class="mx-1" type="info">{{ message.time }}</el-text>
                                
                              </div>
                            </el-col>
                              </el-row>
                          
                          </div>
                        </el-col>
                        <el-col :span="12" >
                          <!-- 右边对话框 -->
                          <!--  class="right-bubble message" :class="{ 'self': message.user === user }" -->
                          <div v-if="message.user == userdl.user" >
                            <el-row  :gutter="20">
                              <el-col :span="20" style="padding-right: 0;">
                                <div style="margin-top: 20px;display: flex; justify-content: flex-end;">
                                  <div class="message" style="background-color:#0099FF ;">
                                    <el-text class="mx-1" type="primary" style="color: #FFFFFF;">{{ message.content }}</el-text> 
                                  </div>
                                  
                                </div>
                                <el-text style="display: flex; justify-content: flex-end;" class="mx-1" type="info">{{ message.time }}</el-text>
                            </el-col>
                            <el-col :span="4">
                              <div>
                                <!-- <img :src="clurl(message)" alt="avatar">  -->
                                <el-avatar :size="40" src="https://empty" @error="errorHandler(message)">
                                <img
                                :src="clurl(message)"
                                />
                              </el-avatar>
                            </div>
                            </el-col>
                              </el-row>
                          </div>
                        </el-col>
                      </el-row>

 
                    </div>
                  </div>
                  <!-- 输入框和发送按钮 -->
                  <div class="input-box">
                    <textarea class="input"  maxlength="200" auto-height v-model="inputMessage" @keyup.enter="sendMessage(item)"
                      placeholder="请输入消息"></textarea>
                    <button class="emoji-button" @click="showEmojis">😊</button> <!-- 表情选择按钮 -->
                    <button class="send-button" @click="sendMessage(item)">发送</button>
                  </div>
                  <!-- 表情选择弹窗 -->
                  <div v-if="showEmojiPicker" class="emoji-picker">
                    <div class="emoji-list">
                      <div v-for="(emoji, index) in emojis" :key="index" class="emoji" @click="addEmoji(emoji)">
                        {{ emoji }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end -->
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              Confirm
            </el-button>
          </div>
        </template> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import request from '../../utils/requestf';
  import { ElMessage } from 'element-plus'
  import {
    Search,
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
        username: '',
        userdl: [],
        visible:false,
        source: 0,
        cardwz0: '新增用户',
        cardwzts0: '一个月内登录该产品的用户数',
        cardwz1: '新增订单',
        cardwzts1: '一个月内下单的订单数',
        cardwz2: '新增代办',
        currentMonthDataCount: 0,
        currentMonthDatabfb: '',
        data: [],
        dddata: [],
        calculateOrderCount: 0,
        calculateOrderbfb: '',
        dialogVisible: false,
        xxz: [],
        xxtabs: [],
        xxtab: [],
        xxtabvalue: '',
        //  聊天
        txurl: 'http://naic.asia/',
        user: '',
        mes: {},
        inputMessage: '', // 输入的消息内容
        messages: [ // 消息列表

        ],
        showEmojiPicker: false, // 是否显示表情选择弹窗
        emojis: ['😊', '😂', '😍', '😎', '😜', '😋', '😘', '😇', '🥰', '🤗'], // 表情列表

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
    created() {
      this.loadname();
      this.loadxzyh();
      this.loadxzdd();

    },
    methods: {
      //加载登录名字
      loadname() {
        this.userdl = JSON.parse(localStorage.getItem("user"));

        console.log(this.userdl);
        if (this.userdl != null) {
          this.username = this.userdl.user;
        } else {
          this.$router.push("/login");
        }
      },
      outputValue() {
        return useTransition(this.source, { duration: 1500, });
      },
      // 判断管理员
      pdgly(){
        return this.userdl.userzt==="3"?"超级管理员":"管理员";
      },
      // 退出登录
      tcdl(){
        localStorage.setItem("user",null);
        this.$router.push("/login");
      },
      // 加载新增用户
      loadxzyh() {
        this.userdl = JSON.parse(localStorage.getItem("user"));
        if (this.userdl != null) {
          if(this.userdl.userzt==="3"){
          request.get("/user/superselalluser?u=" + this.userdl.user).then(res => {
            if (res.code == '200') {
              // console.log(res.data);
              this.data = res.data;
              this.currentMonthDatabfb = this.currentMonthChangePercentage();
            }
          })
        }else if(this.userdl.userzt==="1"){
          request.get("/user/superselalluser?u=superadmin").then(res => {
            if (res.code == '200') {
              // console.log(res.data);
              this.data = res.data;
              this.currentMonthDatabfb = this.currentMonthChangePercentage();
            }
          })
        }
        }

      },
      // 新增订单
      loadxzdd() {
        this.userdl = JSON.parse(localStorage.getItem("user"));
        if (this.userdl != null) {
          if(this.userdl.userzt==="3"){
          request.get("/nc/superselall?u=" + this.userdl.user).then(res => {
            if (res.code == '200') {
              this.dddata = res.data;
              this.calculateOrderbfb = this.calculateOrderCountChange();
            }
          })
        }else if(this.userdl.userzt==="1"){
          request.get("/user/superselalluser?u=superadmin").then(res => {
            if (res.code == '200') {
              this.dddata = res.data;
              this.calculateOrderbfb = this.calculateOrderCountChange();
            }
          })
        }
        }
      },
      // ==============计算用户个数==============
      // 计算当前月份数据相对于上个月份的百分比变化
      currentMonthChangePercentage() {
        // 获取当前日期
        const currentDate = new Date();
        // 获取当前月份
        const currentMonth = currentDate.getMonth() + 1; // 注意月份从 0 开始，需要加 1
        // 获取上个月份
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1; // 如果当前月份是 1 月，则上个月份为 12 月，否则为当前月份减 1
        // console.log(currentMonth,lastMonth,this.data);
        // 筛选出当前月份的数据数量
        this.currentMonthDataCount = this.data.filter(item => {
          // 获取数据项的创建日期
          // console.log(item);
          const createDate = new Date(item.createdate);
          // 获取数据项的月份
          const itemMonth = createDate.getMonth() + 1; // 注意月份从 0 开始，需要加 1
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
        return (((this.currentMonthDataCount - lastMonthDataCount) / lastMonthDataCount) * 100).toFixed(0) + "";
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
        return (((this.calculateOrderCount - lastMonthDdDataCount) / lastMonthDdDataCount) * 100).toFixed(0) + "";
      },
      ckxx() {
        this.xxtabs = [];
        this.dialogVisible = true;
        request.get("/l/gm?u=" + this.userdl.user).then(res => {
          console.log(res);
          if (res.code == '200') {
            this.xxz = res.data;
            this.clxx();
          }
        });

      },
      //  处理信息
      clxx() {
        if (this.xxz.length != 0) {
          for (let index = 0; index < this.xxz.length; index++) {
            console.log(this.xxz[index].createid);
            if (this.xxtabs.includes(this.xxz[index].createid)) {
            } else {
              if (this.xxz[index].createid != null) {
                this.xxtabs.push(this.xxz[index].createid);

              }
            }

          }
          this.xxtab = this.xxtabs.filter(item => item.trim() !== "");
          if(this.xxtab[0]!=null){
            this.xxtabvalue=this.xxtab[0].substring(0, this.xxtab[0].length - this.userdl.user.length);;
          }
         
          console.log(this.xxtab,this.xxtabvalue);
        }
      },
      //  处理个人信息
      clgrxx(n) {
        console.log(n);
        let xxz = this.xxz;
        let filteredMessages = xxz.filter(xxz => xxz.createid.includes(n));
        // 从筛选后的数据中提取需要的内容加入数组
        let contents = filteredMessages.map(xxz => xxz);
        return contents;
        // 输出结果
        console.log(contents);

      },
      //处理名字
      mzcl(it) {
        if (it != null || it != undefined) {
          return it.substring(0, it.length - this.userdl.user.length);
        } else {
          return null;
        }
      },
      //  ================================聊天=========================================
      // 发送消息
      sendMessage(item) {
        console.log(item);
        if (this.inputMessage.trim() === '') return; // 空消息不发送
        const currentTime = new Date().toLocaleTimeString().slice(0, -3); // 获取当前时间
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 注意月份从0开始，需要加1
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const meridiem = hour >= 12 ? '下午' : '上午';
        const datetime = `${year}/${month}/${day}${meridiem}${hour % 12}:${minute}:${second}`;
        this.messages.push({createid:item, user: this.userdl.user, content: this.inputMessage, time: currentTime }); // 添加自己发送的消息到列表
        this.mes = {createid:item,  user: this.userdl.user, content: this.inputMessage, time: datetime };
        request.post("/l/hf", this.mes).then((res) => {
          if (res.data == 1) {
            this.getlx();
            this.inputMessage = ''; // 清空输入框

          } else {
            ElMessage({
              message: '发送失败！',
              type: 'error',
            })
          }
        })


      },
      //获取联系
      getlx() {
        request.get("/l/gm?u=" + this.userdl.user).then((res1) => {
          if (res1.data != null) {
            this.xxz = res1.data;
            // this.clxx();
          }
        })
      },
      //处理图像连接
      clurl(mes) {
        // console.log(mes);
        var txurl = "";

        txurl = this.txurl + mes.user + ".png";
        // console.log(txurl);

        return txurl;
      },
      //头像加载失败时
      errorHandler(mes){
        return mes.user;
      },
      // 滚动到底部
      scrollToBottom() {
        this.$refs.messageList && this.$refs.messageList.scrollToBottom();
      },
      // 显示表情选择弹窗
      showEmojis() {
        this.showEmojiPicker = !this.showEmojiPicker;
      },
      // 添加表情到输入框
      addEmoji(emoji) {
        this.inputMessage += emoji;
      },

      // =============================end===========================

      //============================search==========================
      sear(){
        ElMessage({
              message: '不可用！',
              type: 'error',
            })
      },
      //=============================end=============================
      // ============================通知===========================
      // 获取通知
      getNotice() {
        
      },
      //
      getnewdd(u){
        if(this.userdl.userzt==="1"){
        }
      },
      //获取对应店铺
      getdydp(){
        request.get("")
      }
      //==============================end===========================
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
  .el-care-right-an {
    width: 50px;
    height: 50px;
    padding-left: -10px;
    border-radius: 20px;
    text-align: center;
  }

  .el-care-right-an-i {
    margin-left: -2px;
  }

  /* 间距 */
  .flex-grow {
    height: 120px;
    margin-bottom: 10%;
    flex-grow: 1;
  }

  .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  /*================ 聊天================= */
  .container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
}


.message {
  padding: 0px 10px 6px 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   border-radius: 10px;width: fit-content;
}
.message-list{
  overflow-y: scroll;overflow-x: hidden;height: 700px;
}
.message-list::-webkit-scrollbar {
  width: 0; /* 设置滚动条宽度为零 */
}

.input-box {
  position: sticky;
  bottom: 0;
	height: 80px;
  display: flex;
  align-items: center;
  padding: 5px;
  /* background-color: #f0f0f0; */
  
}

.input {
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}

.send-button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #57c3ad;
  color: #fff;
  border: none;
  border-radius: 20px;
}

.emoji-button {
  font-size: 12px;
  margin-left: 5px;
}

.emoji-picker {
  position: absolute;
  bottom: 100px;
  left: 35px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.emoji-list {
  display: flex;
  flex-wrap: wrap;
}

.emoji {
  font-size: 14px;
  margin-right: 5px;
  margin-bottom: 1px;
  cursor: pointer;
}
.chat-container {
	/* width: 80%; */
  display: flex;
  flex-direction: column;
}

</style>