<template>
    <div>
        <el-dialog :close-on-click-modal="false"  :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500" style="border-radius: 20px;">
            <el-form :model="form">
              <!-- <el-form-item label="管理员">
                <el-input v-model="form.user" autocomplete="off" />
             </el-form-item> -->
             <el-form-item label="管理员手机">
              <el-input v-model="form.userphone" autocomplete="off" />
           </el-form-item>
              <el-form-item label="店铺名称">
                <el-input v-model="form.dpmc" autocomplete="off" />
             </el-form-item>
              <el-form-item  label="店铺纬度">
                <el-input v-model="form.latitude" autocomplete="off" />
             </el-form-item>
             <el-form-item  label="店铺精度">
              <el-input v-model="form.longitude"  autocomplete="off" />
           </el-form-item>
            <el-form-item label="店铺位置" >
              <el-input v-model="form.dpwz"  autocomplete="off" />
              </el-form-item>
              <!-- <el-form-item label="是否通过审核" >
                <el-select v-model="form.dpzt" placeholder="是否通过审核">
                    <el-option label="通过" value="2" />
                    <el-option label="不通过" value="1" />
                    <el-option label="待审核" value="0" />
                  </el-select>
              </el-form-item> -->
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <!-- <el-button @click="gbdia()">关闭</el-button> -->
                <el-button type="primary" @click="addandgx">
                    {{xsgxandxz()}}
                </el-button>
              </div>
            </template>
          </el-dialog>
    </div>
</template>
<script>
          import request from '../../utils/requestf';
export default {
    name:'Dpbd',
    data(){
        return{
        userdl:[],
        dialogFormVisible:true,
        form:{
          user:'',
          userphone:'',
          dpmc:'',
          latitude:'',
          longitude:'',
          dpwz:'',
          dpzt:'',
          createdate:'',
          createid:'',
        },
        dianame:'',
        lx:'',
        }
    },
    created(){
        this.lx=this.$route.query.id;
        console.log(this.lx);
        if(this.lx!=""){
            if(this.lx=="1"){
                this.add();
            }else{
                this.modify();
            }
        }
    },
    methods:{        // 添加店铺对应
        add(){
          this.dianame="新增店铺对应";
          this.dialogFormVisible=true;
          this.form={
          user:'',
          userphone:'',
          dpmc:'',
          latitude:'',
          longitude:'',
          dpwz:'',
          dpzt:'',
          createdate:'',
          createid:'',
        };
        this.userdl=JSON.parse(localStorage.getItem("user"));
        if(this.userdl!=null){
            this.form.user=this.userdl.user;

        }
        console.log(this.form);
        },
        modify(){
            this.userdl=JSON.parse(localStorage.getItem("user"));
            this.dianame="修改店铺对应";
          this.dialogFormVisible=true;
          request.get("/dy/selbyuser?u="+this.userdl.user).then((res)=>{
            this.form=res.data.data;
            console.log(this.form);
          })
        //   this.form=row;
        },
          //展播更新
          addandgx(){
          if(this.dianame==='新增店铺对应'){
            if(this.form.dpmc!=""){
            if(this.phoneNumber(this.form.userphone)){
            request.post("/dy/addstoredy",this.form).then((res)=>{
            if(res.data===1){
              this.$message({
                type:"success",
                message:"添加成功"
              }); 
              localStorage.removeItem("user");
             
              setTimeout(() => {
                this.tzlogin();
                       }, 5000);
          
            }else{
              this.$message({
                type:"error",
                message:"已有，添加失败"
              });
            }
          })
        }else{
              this.$message({
                type:"error",
                message:"手机号格式不正确"
            })
        }
        }else{
          this.$message({
                type:"error",
                message:"啥也没填，添加失败!"
              });
        }
        }else{
            if(this.form.dpmc!=""){
            if(this.phoneNumber(this.form.userphone)){
            request.post("/dy/upstoredy",this.form).then((res)=>{
            if(res.data===1){
              this.$message({
                type:"success",
                message:"修改成功"
              });
              localStorage.removeItem("user");
              setTimeout(() => {
                this.tzlogin();
                       }, 5000);
            }else{
              this.$message({
                type:"error",
                message:"修改失败"
              });
            }
          })
          }else{
              this.$message({
                type:"error",
                message:"手机号格式不正确"
          })
          }
        }else{
            this.$message({
                type:"error",
                message:"啥也没填，修改失败!"
            })
        }
          }
        },
        // 手机号验证
        phoneNumber(ph) {
      // 使用正则表达式验证手机号码格式
            return /^1[3-9]\d{9}$/.test(ph);
        },
        // 修改和更新
        xsgxandxz(){
          return this.dianame==='新增店铺对应'? '添加':'更新'
      },
    //   跳转登录
      tzlogin(){
        this.$router.push("/login");
      }
    }
}
</script>
<style>

</style>