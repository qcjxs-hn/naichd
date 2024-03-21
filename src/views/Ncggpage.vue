<template>
    <div>
      <div style="margin:10px 0">
        <el-row>
          <el-col :span="12"><div >
            <el-button type="primary" @click="add">新增</el-button>
          
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
      <el-table :data="searchText===''?ncggz : ncggz1" style="width: 100%" stripe row-class-name="tablecl">
        <el-table-column label="奶茶id" style="width:4%" prop="ncid" />
        <el-table-column label="加料" style="width:4%" prop="jl" />
        <el-table-column label="杯型" style="width:4%" prop="bx" />
        <el-table-column label="温度" style="width:2%" prop="wd" />
        <el-table-column label="糖度" style="width:2%" prop="td" />
      
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
          <el-form-item  label="对应奶茶id">
            <el-input v-model="form.ncid" autocomplete="off" />
         </el-form-item>
         <el-form-item  label="加料">
          <el-input v-model="form.jl"  placeholder="价格用:,整体用英文;隔开"  autocomplete="off" />
       </el-form-item>
          <el-form-item  label="杯型">
            <el-input v-model="form.bx" placeholder="价格用:,整体用英文;隔开"  autocomplete="off" />
         </el-form-item>
         <el-form-item  label="温度">
          <el-input v-model="form.wd" placeholder="用英文;隔开" autocomplete="off" />
       </el-form-item>
       <el-form-item  label="糖度">
        <el-input v-model="form.td" autocomplete="off" />
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
    name: "Ncgg",
    components: {},
    data() {
      return{
        ncggz:[],
        userdl:[],
        txurl: 'http://naic.asia/',
        dialogFormVisible:false,
        form:{
          ncid:'',
          jl:'',
          bx:'',
          wd:'',
          td:'',
        },
        dianame:'',
        searchText: '',
      }
      },
      created(){
        this.loadncgg();
      },
      computed: {
      filteredData() {
        const searchText = this.searchText.toLowerCase().trim();
        // console.log(searchText);
        if (!searchText) {
         
          this.ncggz1=this.ncggz; // 如果搜索框内容为空，则返回原始数据
          // console.log(this.ncggz);
        } else {
          this.ncggz1=this.ncggz.filter(item => {
            // 根据需要筛选匹配的字段
            return item.ncid.toLowerCase().includes(searchText) || 
                   (item.jl && item.jl.toLowerCase().includes(searchText)) ||
                   item.bx.toLowerCase().includes(searchText);
          });
         
          // console.log(this.ncggz1);
        }
      }
    },
      methods:{
        loadncgg(){
          this.userdl=JSON.parse(localStorage.getItem("user"));
        if(this.userdl!=null){
          request.get("/nc/superselncggall?u="+this.userdl.user).then((res) => {
             if(res.code=="200"){
              this.ncggz=res.data;
             }
          });
        }
        },
        //关闭弹窗
        gbdia(){
          this.dialogFormVisible=false;
        },
        // 添加规格
        add(){
          this.dianame="新增规格";
          this.dialogFormVisible=true;
          this.form={
          ncid:'',
          jl:'',
          bx:'',
          wd:'',
          td:'',
        };
  
        },
        // 删除规格
        handleDelete(index,row){
          request.delete("/nc/delncgg?i="+row.ncid).then((res)=>{
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
            this.loadncgg();
          })
        },
        // 修改单个规格
        handleEdit(index,row){
          console.log(index,row);
          this.dianame="修改规格";
          this.dialogFormVisible=true;
          this.form=row;
       
        },
        //添加或者修改规格
        addandgx(){
          if(this.dianame==='新增规格'){
            if(this.form.ncid!=""){
            request.post("/nc/addncgg?u="+this.userdl.user,this.form).then((res)=>{
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
          this.loadncgg();
          this.dialogFormVisible=false;
          }else{
            request.post("/nc/upncgg",this.form).then((res)=>{
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
          this.loadncgg();
          this.dialogFormVisible=false;
          }
        },
        // 修改和更新
        xsgxandxz(){
          return this.dianame==='新增规格'? '添加':'更新'
      },
       // 导出xlsx
  createxlsx(){
    const data = this.ncggz; // 要导出的数据
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ncggexport.xlsx');
    },
    // 导出csv
    createcsv(){
      const data = this.ncggz; // 要导出的数据
      const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(row => Object.values(row).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'ncggexport.csv');
      document.body.appendChild(link);
      link.click();
    },
      }
  }
  </script>
  <style>
  .tablecl{
    font-size: 12px;
    
  }
  </style>