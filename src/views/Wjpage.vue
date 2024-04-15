<template>
  <div>
    <div style="margin:10px 0">
      <el-row>
        <el-col :span="12">
          <div>
            <el-button type="primary" @click="add">新增</el-button>
            <el-popconfirm confirm-button-text="xlsx" cancel-button-text="csv" :icon="InfoFilled" icon-color="#626AEF"
              title="选择导出表类型?" @confirm="createxlsx" @cancel="createcsv">
              <template #reference>
                <el-button type="success">导出</el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-col>
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
    <el-table :data="searchText===''?wjz:wjz1" style="width: 100%" stripe row-class-name="tablecl" max-height="685">
      <el-table-column fixed label="创建id" style="width:4%" prop="createid" />
      <el-table-column label="文件标题" style="width:4%" prop="wjtitle"  />
      <el-table-column label="文件文章" style="width:4%" prop="wjzw"  />
      <el-table-column label="创建日期"  prop="createdate" sortable />
     

      <el-table-column align="right">
        <template #header>

        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500"style="border-radius: 20px;">
        <el-form :model="form" >
        <el-form-item label="文件标题">
            <el-input v-model="form.wjtitle" autocomplete="off" />
          </el-form-item>
          <el-form-item label="文件文章">
            <el-input v-model="form.wjzw" type="textarea" autocomplete="off" placeholder="请使用html格式文章" />
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
    name: "Wj",
    components: {},
    data() {
      return {
        wjz: [],
        userdl: [],
        txurl: 'http://naic.asia/',
        dialogFormVisible: false,
        form: {
         
          wjtitle: '',
          wjzw: '',
          createdate: '',
          createid:'',
        },
        dianame: '',
        searchText: '',
      }
    },
    created() {
      this.loadwj();
    },
    computed: {
      filteredData() {
        const searchText = this.searchText.toLowerCase().trim();
        // console.log(searchText);
        if (!searchText) {
          this.wjz1 = this.wjz; // 如果搜索框内容为空，则返回原始数据
          // console.log(this.dystorez);
        } else {
          this.wjz1 = this.wjz.filter(item => {
            // 根据需要筛选匹配的字段
            return item.wjtitle.toLowerCase().includes(searchText) ||
              item.wjzw.toLowerCase().includes(searchText) ||
              item.createdate.toLowerCase().includes(searchText);

          });

          // console.log(this.storez1);
        }
      }
    },
    methods: {
      loadwj() {
        this.userdl = JSON.parse(localStorage.getItem("user"));
        if (this.userdl != null) {
          request.get("/w/all?u="+this.userdl.user).then((res) => {
            if (res.code == "200") {
              this.wjz = res.data;
            }
          });
        }
      },
      //关闭弹窗
      gbdia() {
        this.dialogFormVisible = false;
      },
      // 添加文件
      add() {
        this.dianame = "新增文件";
        this.dialogFormVisible = true;
        this.form = {
          wjtitle: '',
          wjzw: '',
          createdate: '',
          createid:'',
        };

      },
      // 删除文件
      handleDelete(index, row) {
        request.delete("/w/delwj?i=" + row.createid).then((res) => {
          if (res.code == "200") {
            this.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg
            });
          }
          this.loadwj();
        })
      },
      // 修改单个文件
      handleEdit(index, row) {
        // console.log(index,row);
        this.dianame = "修改文件";
        this.dialogFormVisible = true;
        this.form = row;

      },
      //展播更新
      addandgx() {
        if (this.dianame === '新增文件') {
          if (this.form.wjtitle != "") {
            request.post("/w/addwj?u="+this.userdl.user, this.form).then((res) => {
              if (res.data === 1) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.loadwj();
              } else {
                this.$message({
                  type: "error",
                  message: "已有，添加失败"
                });
              }
            })
          } else {
            this.$message({
              type: "error",
              message: "啥也没填，添加失败!"
            });
          }
          this.loadwj();
          this.dialogFormVisible = false;
        } else {
          request.post("/w/upwj", this.form).then((res) => {
            if (res.data === 1) {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.loadwj();
            } else {
              this.$message({
                type: "error",
                message: "修改失败"
              });
            }
          })
          this.loadwj();
          this.dialogFormVisible = false;
        }
      },
      // 修改和更新
      xsgxandxz() {
        return this.dianame === '新增文件' ? '添加' : '更新'
      },

      // 导出xlsx
      createxlsx() {
        const data = this.wjz; // 要导出的数据
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'wjexport.xlsx');
      },
      // 导出csv
      createcsv() {
        const data = this.wjz; // 要导出的数据
        const csvContent = "data:text/csv;charset=utf-8,"
          + data.map(row => Object.values(row).join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'wjexport.csv');
        document.body.appendChild(link);
        link.click();
      },
    }
  }
</script>
<style>
  .tablecl {
    font-size: 10px;

  }
</style>