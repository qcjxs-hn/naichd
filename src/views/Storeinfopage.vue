<template>
    <div>
      <div style="margin:10px 0">
        <el-row>
          <el-col :span="12"><div >
            <el-button type="primary" v-if="qx" @click="add">新增</el-button>
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
      <el-table :data="searchText===''?storez:storez1" style="width: 100%" stripe row-class-name="tablecl"  max-height="685">
        <el-table-column fixed label="id" style="width:4%" prop="id" />
        <el-table-column label="店铺名称" style="width:4%" prop="dpmc"  sortable />
        <el-table-column label="店铺对应商品记录id用;隔开" style="width:4%" prop="dpdyncid" />
        <el-table-column label="店铺纬度" style="width:2%"  sortable prop="latitude" />
        <el-table-column label="店铺经度" style="width:2%"  sortable prop="longitude" />
        <el-table-column label="店铺地址" style="width:4%"  sortable prop="dpwz" />
        <el-table-column label="店铺信息创建日期" prop="createdate"  sortable/>
        <el-table-column label="店铺id" prop="createid" />
        <el-table-column prop="dpzt" label="是否开店"   style="width:1%">     
          <template #default="scope">
           <span v-if="scope.row.dpzt==0">
             <el-tag  type="error">闭店</el-tag>
           </span>
           <span v-if="scope.row.dpzt==1">
             <el-tag  type="success">开店</el-tag>
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
              v-if="qx"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
      <el-dialog  :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500" style="border-radius: 20px;">
        <el-form :model="form">
          <el-form-item v-if="qx" label="店铺名称">
            <el-input v-model="form.dpmc" autocomplete="off" />
         </el-form-item>
         <el-form-item  label="店铺对应商品">
          <el-input v-model="form.dpdyncid" type="textarea" placeholder="记录id用;隔开" autocomplete="off" />
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
          <el-form-item label="是否开店" >
            <el-select v-model="form.dpzt" placeholder="是否开店">
                <el-option label="开店" value="1" />
                <el-option label="闭店" value="0" />
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
    name: "Storeinfo",
    components: {},
    data() {
      return{
        storez:[],
        userdl:[],
        txurl: 'http://naic.asia/',
        dialogFormVisible:false,
        form:{
          id:'',
          dpmc:'',
          dpdyncid:'',
          latitude:'',
          longitude:'',
          dpwz:'',
          dpzt:'',
          createdate:'',
          createid:'',
        },
        dianame:'',
        searchText: '',
        qx:false,
      }
      },
      created(){
        this.loadstore();
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
          this.storez1=this.storez; // 如果搜索框内容为空，则返回原始数据
          // console.log(this.storez);
        } else {
          this.storez1=this.storez.filter(item => {
            // 根据需要筛选匹配的字段
            return item.dpmc.toLowerCase().includes(searchText) ||
                   item.createdate.toLowerCase().includes(searchText);
              
          });
         
          // console.log(this.storez1);
        }
      }
    },
      methods:{
        loadstore(){
          this.userdl=JSON.parse(localStorage.getItem("user"));
        if(this.userdl!=null){
          if (this.userdl.userzt == '3') {
          request.get("/st/superselstoreall?u="+this.userdl.user).then((res) => {
             if(res.code=="200"){
              this.storez=res.data;
             }
          });
        } else if (this.userdl.userzt == "1") {
                        this.userdp = JSON.parse(localStorage.getItem("shop"));
                        if (this.userdp != null) {
                            request.get("/st/cxdp?d=" + this.userdp.dpmc).then(res => {
                                if (res.code == '200') {
                                  this.storez=[res.data];
                                }
                            })
                        }
                    }
        }
        },
        //关闭弹窗
        gbdia(){
          this.dialogFormVisible=false;
        },
        // 添加店铺
        add(){
          this.dianame="新增店铺";
          this.dialogFormVisible=true;
          this.form={
          id:'',
          dpmc:'',
          dpdyncid:'',
          latitude:'',
          longitude:'',
          dpwz:'',
          dpzt:'',
          createdate:'',
          createid:'',
        };
  
        },
        // 删除店铺
        handleDelete(index,row){
          request.delete("/st/delstore?i="+row.createid).then((res)=>{
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
            this.loadstore();
          })
        },
        // 修改单个店铺
        handleEdit(index,row){
          console.log(index,row);
          this.dianame="修改店铺";
          this.dialogFormVisible=true;
          this.form=row;
       
        },
        //展播更新
        addandgx(){
          if(this.dianame==='新增店铺'){
            if(this.form.dpmc!=""){
            request.post("/st/addstore",this.form).then((res)=>{
            if(res.data===1){
              this.$message({
                type:"success",
                message:"添加成功"
              });
              this.loadstore();
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
                message:"啥也没填，添加失败!"
              });
        }
          this.loadstore();
          this.dialogFormVisible=false;
          }else{
            request.post("/st/upstore",this.form).then((res)=>{
            if(res.data===1){
              this.$message({
                type:"success",
                message:"修改成功"
              });
              this.loadstore();
            }else{
              this.$message({
                type:"error",
                message:"修改失败"
              });
            }
          })
          this.loadstore();
          this.dialogFormVisible=false;
          }
        },
        // 修改和更新
        xsgxandxz(){
          return this.dianame==='新增店铺'? '添加':'更新'
      },
               // 导出xlsx
    createxlsx(){
    const data = this.storez; // 要导出的数据
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'storeexport.xlsx');
    },
    // 导出csv
    createcsv(){
      const data = this.storez; // 要导出的数据
      const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(row => Object.values(row).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'storeexport.csv');
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