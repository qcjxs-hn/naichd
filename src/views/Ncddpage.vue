<template>
    <div>
      <div style="margin:10px 0">
        <el-row>
          <el-col :span="12"><div >
            <!-- <el-button type="primary" @click="add">新增</el-button> -->
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
      <el-table :data="searchText===''?ncddz : ncddz1" style="width: 100%;border-radius: 20px;" stripe row-class-name="tablecl" max-height="685">
        <el-table-column fixed label="订单" style="width:4%" prop="createid" />
        <!-- <el-table-column label="密码" style="width:4%" prop="password" /> -->
        <el-table-column prop="buyuser" label="购买用户"/>
        <!-- <el-table-column label="购买用户昵称" style="width:4%" prop="buyusernickname" /> -->
        <el-table-column label="手机号" style="width:2%" prop="buyuserphone" />
      <el-table-column prop="buyuseraddress" label="购买用户地址" style="width:1%">     
       
      </el-table-column>
        <el-table-column label="购买的奶茶" style="width:5%" prop="shoppingcar" />
        <el-table-column label="优惠券"  prop="sfsyyhq" />
        <el-table-column v-if="sfsyyhq==='1'" label="使用的优惠券" style="width:1%" prop="sydyhq" />
        <el-table-column label="应付合计总价" prop="yfhj"  sortable/>
        <el-table-column label="减少金额" prop="jsje"  sortable />
        <el-table-column label="实付金额" prop="paymon"  sortable />
        <el-table-column label="订单创建时间" prop="createdate"  sortable/>
        <el-table-column style="width:2%" label="订单状态" >
          <template #default="scope" style="width:4%">
              <span v-if="scope.row.sfzf==0">
                <el-tag  type="primary">已取消</el-tag>
              </span>
              <span v-if="scope.row.sfzf==1">
                <el-tag  type="warning">已支付</el-tag>
              </span>
              <span v-if="scope.row.sfzf==2">
                <el-tag  type="danger">取餐中</el-tag>
              </span>
              <span v-if="scope.row.sfzf==3">
                <el-tag type="success">订单完成</el-tag>
              </span>
          </template>
          </el-table-column>
          <el-table-column style="width:2%" label="是否外卖" >
            <template #default="scope" style="width:4%">
                <span v-if="scope.row.sfwm==0">
                  <el-tag  type="primary">到店</el-tag>
                </span>
                <span v-if="scope.row.sfwm==1">
                  <el-tag  type="warning">外卖</el-tag>
                </span>
            </template>
            </el-table-column>
            <el-table-column label="店铺名称"  prop="dpmc" />
            <el-table-column label="店铺距离"  prop="dpjl" />
            <el-table-column label="用户备注"  prop="ddbz" />
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
          <el-form-item label="购买用户">
            <el-input v-model="form.buyuser" autocomplete="off" />
         </el-form-item>
         <el-form-item  label="手机号">
          <el-input v-model="form.buyuserphone" autocomplete="off" />
       </el-form-item>
        <el-form-item label="用户地址">
            <el-input v-model="form.buyuseraddress" autocomplete="off" />
         </el-form-item>
          <el-form-item label="订单状态" >
            <el-select v-model="form.sfzf" placeholder="选择状态">
                <el-option label="已取消" value="0" />
                <el-option label="已支付" value="1" />
                <el-option label="取餐中" value="2" />
                <el-option label="订单完成" value="3" />
              </el-select>
          </el-form-item>
        <el-form-item label="到店还是外卖" >
            <el-select v-model="form.sfwm" placeholder="是否外卖">
                <el-option label="到店" value="0" />
                <el-option label="外卖" value="1" />
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
    name: "Ncdd",
    components: {},
    data() {
      return{
        ncddz:[],
        userdl:[],
        txurl: 'http://naic.asia/',
        dialogFormVisible:false,
        form:{
            createid:'',
            buyuser:'',
            buyusernickname:'',
            buyuserphone:'',
            buyuseraddress:'',
            shoppingcar:'',
            sfsyyhq:'',
            sydyhq:'',
            yfhj:'',
            jsje:'',
            paymon:'',
            sfzf:'',
            sfwm:'',
            dpmc:'',
            dpjl:'',
            ddbz:''
        },
        dianame:'',
        searchText: '',
      }
      },
      created(){
        this.loadncdd();
      },
      computed: {
      filteredData() {
        const searchText = this.searchText.toLowerCase().trim();
        // console.log(searchText);
        if (!searchText) {
         
          this.ncddz1=this.ncddz; // 如果搜索框内容为空，则返回原始数据
          // console.log(this.ncddz);
        } else {
          this.ncddz1=this.ncddz.filter(item => {
            // 根据需要筛选匹配的字段
            return item.createid.toLowerCase().includes(searchText) || 
                   (item.buyuser && item.buyuser.toLowerCase().includes(searchText)) ||
                   item.buyuserphone.toLowerCase().includes(searchText) ||
                   item.buyuseraddress.toLowerCase().includes(searchText) ||
                   item.createdate.toLowerCase().includes(searchText) ||
                   item.sfwm.toLowerCase().includes(searchText);
          });
         
          // console.log(this.ncddz1);
        }
      }
    },
      methods:{
        loadncdd(){
          this.userdl=JSON.parse(localStorage.getItem("user"));
        if(this.userdl!=null){
          if (this.userdl.userzt == '3') {
          request.get("/nc/superselall?u="+this.userdl.user).then((res) => {
             if(res.code=="200"){
              this.ncddz=res.data;
             }
          });
        } else if (this.userdl.userzt == "1") {
                        this.userdp = JSON.parse(localStorage.getItem("shop"));
                        if (this.userdp != null) {
                            request.get("/nc/seldd?d=" + this.userdp.dpmc).then(res => {
                                if (res.code == '200') {
                                  this.ncddz=res.data;
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
        // 删除订单
        handleDelete(index,row){
          request.delete("/nc/delncdd?i="+row.createid).then((res)=>{
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
            this.loadncdd();
          })
        },
        // 修改单个订单
        handleEdit(index,row){
          console.log(index,row);
          this.dianame="修改订单";
          this.dialogFormVisible=true;
          this.form=row;
       
        },
        //添加或者修改订单
        addandgx(){
          if(this.dianame==='新增订单'){

          }else{
            request.post("/nc/upncdd",this.form).then((res)=>{
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
          this.loadncdd();
          this.dialogFormVisible=false;
          }
        },
        // 修改和更新
        xsgxandxz(){
          return this.dianame==='新增订单'? '添加':'更新'
      },
  // 导出xlsx
  createxlsx(){
    const data = this.ncddz; // 要导出的数据
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ncddexport.xlsx');
    },
    // 导出csv
    createcsv(){
      const data = this.ncddz; // 要导出的数据
      const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(row => Object.values(row).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'ncddexport.csv');
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