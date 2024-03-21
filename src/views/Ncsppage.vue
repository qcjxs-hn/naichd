<template>
    <div>
      <div style="margin:10px 0">
        <el-row>
          <el-col :span="12"><div >
            <el-button type="primary" @click="add" v-if="qx">新增</el-button>
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
      <el-table :data="searchText===''?ncz:ncz1" style="width: 100%" stripe row-class-name="tablecl"  max-height="685">
        <el-table-column fixed label="奶茶名字" style="width:4%" prop="ncmz" />
        <el-table-column label="奶茶价格" style="width:4%" prop="ncjg"  sortable />
        <el-table-column label="奶茶图片">
          <template #default="scope">
          <el-image
          style="width: 40px; height: 40px"
          :src="scope.row.nctpurl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-teleported="true"
          :initial-index="4"
          fit="cover"
        />
          </template>
        </el-table-column>
        <el-table-column label="奶茶介绍" style="width:4%" prop="ncjs" />
        <el-table-column label="奶茶品类" style="width:2%"  sortable prop="ncpl" />
      <el-table-column prop="sfzs" label="是否展示"   style="width:1%">     
         <template #default="scope">
          <span v-if="scope.row.sfzs==0">
            <el-tag  type="error">下架</el-tag>
          </span>
          <span v-if="scope.row.sfzs==1">
            <el-tag  type="success">展示</el-tag>
          </span>
      </template>
      </el-table-column>

        <el-table-column label="奶茶信息创建日期" prop="createdate"  sortable/>
        <el-table-column label="奶茶id" prop="createid" />
      
        <el-table-column align="right">
          <template #header>
         
          </template>
          <template #default="scope">
            <el-button v-if="qx" size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-if="qx"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
      <el-dialog  :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500" style="border-radius: 20px;">
        <el-form :model="form">
          <el-form-item label="奶茶名字">
            <el-input v-model="form.ncmz" autocomplete="off" />
         </el-form-item>
         <el-form-item  label="奶茶价格">
          <el-input v-model="form.ncjg" autocomplete="off" />
       </el-form-item>
       <el-form-item label="更改奶茶图片" >
        <el-upload
                  ref="upload"
                  action="api/file/upload"
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
       
          <el-form-item  label="奶茶介绍">
            <el-input v-model="form.ncjs" autocomplete="off" />
         </el-form-item>
         <el-form-item  label="奶茶品类">
          <el-input v-model="form.ncpl"  autocomplete="off" />
       </el-form-item>
      
        <el-form-item label="是否展示" >
            <el-select v-model="form.sfzs" placeholder="是否展示">
                <el-option label="展示" value="1" />
                <el-option label="下架" value="0" />
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
    name: "Ncsp",
    components: {},
    data() {
      return{
        ncz:[],
        userdl:[],
        txurl: 'http://naic.asia/',
        dialogFormVisible:false,
        form:{
          ncmz:'',
          ncjg:'',
          ncjs:'',
          nctpurl:'',
          ncpl:'',
          sfzs:'',
          createdate:'',
          createid:'',
        },
        dianame:'',
        searchText: '',
        qx:false,
      }
      },
      created(){
        this.loadnc();
        this.userdl = JSON.parse(localStorage.getItem("user"));
        if(this.userdl!=null){
        if(this.userdl.userzt=="3"){
          this.qx=true;
        }else{
          this.qx=false;
        }
      }
      },
      computed: {
      filteredData() {
        const searchText = this.searchText.toLowerCase().trim();
        // console.log(searchText);
        if (!searchText) {
          this.ncz1=this.ncz; // 如果搜索框内容为空，则返回原始数据
          // console.log(this.ncz);
        } else {
          this.ncz1=this.ncz.filter(item => {
            // 根据需要筛选匹配的字段
            return item.ncmz.toLowerCase().includes(searchText) ||
                   item.ncjs.toLowerCase().includes(searchText) ||
                   item.ncpl.toLowerCase().includes(searchText);
              
          });
         
          // console.log(this.ncz1);
        }
      }
    },
      methods:{
        loadnc(){
          this.userdl=JSON.parse(localStorage.getItem("user"));
        if(this.userdl!=null){
          if (this.userdl.userzt == '3') {
          request.get("/nc/superselncall?u="+this.userdl.user).then((res) => {
             if(res.code=="200"){
              this.ncz=res.data;
             }
          });
        }else if(this.userdl.userzt==="1"){
          request.get("/nc/superselncall?u=superadmin").then(res => {
            if (res.code == '200') {
              // console.log(res.data);
              this.ncz=res.data;
            }
          })
        }
        }
        },
        //关闭弹窗
        gbdia(){
          this.dialogFormVisible=false;
        },
        // 添加奶茶
        add(){
          this.dianame="新增奶茶";
          this.dialogFormVisible=true;
          this.form={
            ncmz:'',
          ncjg:'',
          ncjs:'',
          nctpurl:'',
          ncpl:'',
          sfzs:'',
          createdate:'',
          createid:'',
        };
  
        },
        // 删除奶茶
        handleDelete(index,row){
          request.delete("/nc/delnc?i="+row.createid).then((res)=>{
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
            this.loadnc();
          })
        },
        // 修改单个奶茶
        handleEdit(index,row){
          console.log(index,row);
          this.dianame="修改奶茶";
          this.dialogFormVisible=true;
          this.form=row;
       
        },
        //展播更新
        addandgx(){
          if(this.dianame==='新增奶茶'){
            if(this.form.ncmz!=""){
            request.post("/nc/addnc",this.form).then((res)=>{
            if(res.data===1){
              this.$message({
                type:"success",
                message:"添加成功"
              });
              this.loadnc();
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
          this.loadnc();
          this.dialogFormVisible=false;
          }else{
            request.post("/nc/upnc",this.form).then((res)=>{
            if(res.data===1){
              this.$message({
                type:"success",
                message:"修改成功"
              });
              this.loadnc();
            }else{
              this.$message({
                type:"error",
                message:"修改失败"
              });
            }
          })
          this.loadnc();
          this.dialogFormVisible=false;
          }
        },
        // 修改和更新
        xsgxandxz(){
          return this.dianame==='新增奶茶'? '添加':'更新'
      },
      // 图片上传
      fileUploadSuccess(response) {
      this.file = response.data;
      console.log(this.file);
      if(this.file!=""){
        this.$message({
                type:"success",
                message:"上传成功，有缓存，不能及时更新!"
              });
              this.form.nctpurl=this.file;
      }
      // console.log(this.form);
  },
               // 导出xlsx
               createxlsx(){
    const data = this.ncz; // 要导出的数据
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ncexport.xlsx');
    },
    // 导出csv
    createcsv(){
      const data = this.ncz; // 要导出的数据
      const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(row => Object.values(row).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'ncexport.csv');
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