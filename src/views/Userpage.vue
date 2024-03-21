<template>
  <div>
    <div style="margin:10px 0">
      <el-row>
        <el-col :span="12"><div >
          <el-button type="primary" @click="add">新增</el-button>
          <!-- <el-button type="primary">导入</el-button> -->
          <!-- <input type="file" @change="handleFileSelect"> -->
          <el-popconfirm
          confirm-button-text="xlsx"
          cancel-button-text="csv"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="选择导出表类型?"
          @confirm="createxlsx"
          @cancel="createcsv"
        >
          <template #reference>
            <el-button type="success" >导出</el-button>
          </template>
        </el-popconfirm>
          
        </div></el-col>
        <el-col :span="12"> 
          <el-row>
          <el-col :span="16">
          </el-col>
        <el-col :span="8">
          <div>
          <el-input v-model="searchText" size="small" @change="filteredData" placeholder="搜索" />
          
        </div>
      </el-col>
      </el-row>
      </el-col>
      </el-row>
  
     
    </div>
    <el-table :data="searchText===''?userz : userz1" style="width: 100%" stripe row-class-name="tablecl" max-height="700">
      <el-table-column label="用户" style="width:4%" prop="user" />
      <!-- <el-table-column label="密码" style="width:4%" prop="password" /> -->
      <el-table-column label="头像">
        <template #default="scope">
        <el-image
        style="width: 40px; height: 40px"
        :src="txurl+scope.row.user+'.png'"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-teleported="true"
        :initial-index="4"
        fit="cover"
      />
        </template>
      </el-table-column>
      <el-table-column label="昵称" style="width:4%" prop="nickname" />
      <el-table-column label="生日" style="width:2%" prop="userbr" />
    <el-table-column prop="usersex" label="性别" style="width:1%">     
       <template #default="scope">
      <el-tag size="small">{{scope.row.usersex}}</el-tag>
    </template>
    </el-table-column>
      <el-table-column label="个性签名" style="width:2%" prop="gxqm" />
      <el-table-column label="优惠券"  prop="yhj" />
      <el-table-column label="抵扣币" style="width:1%" prop="dkb" />
      <el-table-column label="用户记录id" prop="userjlid" />
      <el-table-column label="用户经验值" prop="userjyz"  sortable />
      <el-table-column label="用户今日签到" prop="userqdcx" />
      <el-table-column label="用户创建日期" prop="createdate"  sortable/>
      <el-table-column style="width:2%" label="账号状态" >
        <template #default="scope" style="width:4%">
            <span v-if="scope.row.userzt==1">
              <el-tag  type="success">管理员</el-tag>
            </span>
            <span v-if="scope.row.userzt==0">
              <el-tag  type="primary">用户</el-tag>
            </span>
            <span v-if="scope.row.userzt==2">
              <el-tag  type="danger">封号用户</el-tag>
            </span>
            <span v-if="scope.row.userzt==3">
              <el-tag type="warning">超级管理员</el-tag>
            </span>
            <span v-if="scope.row.userzt==4">
              <el-tag style="font-size: 8px;" type="info">管理员账号审核中</el-tag>
            </span>
        </template>
        </el-table-column>
      <el-table-column align="right">
        <template #header>
       
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
    <el-dialog  :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500" style="border-radius: 20px;">
      <el-form :model="form">
        <el-form-item v-if="dianame=='新增用户'" label="用户">
          <el-input v-model="form.user" autocomplete="off" />
       </el-form-item>
       <el-form-item  label="昵称">
        <el-input v-model="form.nickname" autocomplete="off" />
     </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.userbr" type="date"  format="YYYY/MM/DD"  placeholder="Pick a day"/>
       </el-form-item>
        <el-form-item label="性别" >
          <el-select v-model="form.usersex" placeholder="选择性别">
              <el-option label="女" value="女" />
              <el-option label="男" value="男" />
              <el-option label="无" value="无" />
            </el-select>
        </el-form-item>
        <el-form-item  label="个性签名">
          <el-input v-model="form.gxqm" autocomplete="off" />
       </el-form-item>
       <el-form-item  label="优惠券">
        <el-input v-model="form.yhj" placeholder="用英文;隔开" autocomplete="off" />
     </el-form-item>
     <el-form-item  label="抵扣币">
      <el-input v-model="form.dkb" autocomplete="off" />
   </el-form-item>
   <el-form-item  label="经验值">
    <el-input v-model="form.userjyz" autocomplete="off" />
 </el-form-item>
      <el-form-item label="是否签到" >
          <el-select v-model="form.userqdcx" placeholder="是否签到">
              <el-option label="已签到" value="1" />
              <el-option label="未签到" value="0" />
            </el-select>
        </el-form-item>
        <el-form-item label="用户权限"  >
          <el-select v-model="form.userzt" placeholder="选择用户权限">
            <el-option label="管理员账号审核中" value="4" />
            <el-option label="超级管理员" value="3" />
            <el-option label="封号用户" value="2" />
              <el-option label="管理员" value="1" />
              <el-option label="用户" value="0" />
            </el-select>
        </el-form-item>
        <el-form-item label="更改头像" >
              <el-upload
                        ref="upload"
                        :action="'api/file/uploadusertx?u='+form.user"
                        :on-success="fileUploadSuccess"
                        list-type="picture-card"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="data"
                      >
                        <el-icon><Plus /></el-icon>
                      </el-upload>
                      <el-dialog v-model="dialogVisible2">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                      </el-dialog>
        </el-form-item>
        <el-form-item label="是否登录" >
          <el-select v-model="form.userdlzt" placeholder="是否登录">
              <el-option label="已登录" value="1" />
              <el-option label="未登录" value="0" />
            </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="gbdia()">关闭</el-button>
          <el-button type="primary" @click="addandgx">
              {{xsgxandxz()}}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  </div>
</template>
<script>
    import request from '../../utils/requestf';
    import * as XLSX from 'xlsx';
export default {
  name: "User",
  components: {},
  data() {
    return{
      userz:[],
      userdl:[],
      txurl: 'http://naic.asia/',
      dialogFormVisible:false,
      form:{
        user:'',
        nickname:'',
        userbr:'',
        usersex:'',
        gxqm:'',
        yhj:'',
        dkb:'',
        userjyz:0,
        userqdcx:'',
        userzt:'',
        userdlzt:'',
      },
      dianame:'',
      searchText: '',
    }
    },
    created(){
      this.loaduser();
    },
    computed: {
    filteredData() {
      const searchText = this.searchText.toLowerCase().trim();
      console.log(searchText);
      if (!searchText) {
       
        this.userz1=this.userz; // 如果搜索框内容为空，则返回原始数据
        console.log(this.userz);
      } else {
        this.userz1=this.userz.filter(item => {
          // 根据需要筛选匹配的字段
          return item.user.toLowerCase().includes(searchText) || 
                 (item.nickname && item.nickname.toLowerCase().includes(searchText)) ||
                 item.userbr.toLowerCase().includes(searchText) ||
                 item.gxqm.toLowerCase().includes(searchText) ||
                 item.createdate.toLowerCase().includes(searchText) ||
                 item.userzt.toLowerCase().includes(searchText);
        });
       
        console.log(this.userz1);
      }
    }
  },
    methods:{
      loaduser(){
        this.userdl=JSON.parse(localStorage.getItem("user"));
      if(this.userdl!=null){
        request.get("/user/superselalluser?u="+this.userdl.user).then((res) => {
           if(res.code=="200"){
            this.userz=res.data;
           }
        });
      }
      },
      //关闭弹窗
      gbdia(){
        this.dialogFormVisible=false;
      },
      // 添加用户
      add(){
        this.dianame="新增用户";
        this.dialogFormVisible=true;
        this.form={
        user:'',
        nickname:'',
        userbr:'',
        usersex:'',
        gxqm:'',
        yhj:'',
        dkb:'',
        userjyz:'',
        userqdcx:'',
        userzt:'',
        userdlzt:'',
      };

      },
      // 删除用户
      handleDelete(index,row){
        request.delete("/user/deluser?u="+row.user).then((res)=>{
          if(res.code=="200"){
            this.$message({
              type:"success",
              message:"删除成功"
            });
          }else{
            this.$message({
              type:"error",
              message:res.msg
            });
          }
          this.loaduser();
        })
      },
      // 修改单个user
      handleEdit(index,row){
        console.log(index,row);
        this.dianame="修改用户";
        this.dialogFormVisible=true;
        this.form=row;
     
      },
      //添加或者修改用户
      addandgx(){
        if(this.dianame==='新增用户'){
          if(this.form.user!=""){
          request.post("/user/adduser",this.form).then((res)=>{
          if(res.data===1){
            this.$message({
              type:"success",
              message:"添加成功"
            });
          }else{
            this.$message({
              type:"error",
              message:"添加失败"
            });
          }
        })
      }else{
        this.$message({
              type:"error",
              message:"啥也没填，添加失败!"
            });
      }
        this.loaduser();
        this.dialogFormVisible=false;
        }else{
          request.post("/user/upuser",this.form).then((res)=>{
          if(res.data===1){
            this.$message({
              type:"success",
              message:"修改成功"
            });
          }else{
            this.$message({
              type:"error",
              message:"修改失败"
            });
          }
        })
        this.loaduser();
        this.dialogFormVisible=false;
        }
      },
      // 修改和更新
      xsgxandxz(){
        return this.dianame==='新增用户'? '添加':'更新'
    },
    // 头像上传
    fileUploadSuccess(response) {
    this.file = response.data;
    console.log(this.file);
    if(this.file!=""){
      this.$message({
              type:"success",
              message:"头像更新成功，有缓存，不能及时更新!"
            });
    }
    // console.log(this.form);
},
// 导出xlsx
    createxlsx(){
    const data = this.userz; // 要导出的数据
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'userexport.xlsx');
    },
    // 导出csv
    createcsv(){
      const data = this.userz; // 要导出的数据
      const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(row => Object.values(row).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'userexport.csv');
      document.body.appendChild(link);
      link.click();
    },
   
    }
}
</script>
<style>
.tablecl{
  font-size: 10px;
  
}
</style>