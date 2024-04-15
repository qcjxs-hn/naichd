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
    <el-table :data="searchText===''?yhjz:yhjz1" style="width: 100%" stripe row-class-name="tablecl" max-height="685">
      <el-table-column fixed label="卷id" style="width:4%" prop="qid" />
      <el-table-column label="卷图标" style="width:4%" prop="yhqtb" sortable>
        <template #default="scope">
          <el-image style="width: 40px; height: 40px" :src="scope.row.yhqtb" :zoom-rate="1.2" :max-scale="7"
            :min-scale="0.2" :preview-teleported="true" :initial-index="4" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="卷金额" style="width:4%" prop="yhqje" sortable />
      <el-table-column label="卷创建日期" prop="createdate" sortable />
      <el-table-column label="卷有效期" prop="yxq" sortable />
      <el-table-column label="卷是否使用" prop="yhqsfsy" sortable >
        <template #default="scope">
          <span v-if="scope.row.yhqsfsy==0">
            <el-tag  type="error">未使用</el-tag>
          </span>
          <span v-if="scope.row.yhqsfsy==1">
            <el-tag  type="success">已使用</el-tag>
          </span>
      </template>
      </el-table-column>
      <el-table-column label="卷是否弃用" prop="yhqqy" sortable >
        <template #default="scope">
          <span v-if="scope.row.yhqqy==0">
            <el-tag  type="success">未弃用</el-tag>
          </span>
          <span v-if="scope.row.yhqqy==1">
            <el-tag  type="error">已弃用</el-tag>
        
          </span>
        </template>
        </el-table-column>

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
      <el-dialog :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500"
        style="border-radius: 20px;">
        <el-form :model="form">
          <el-form-item label="卷图标">
            <el-upload ref="upload" action="api/file/upload" :on-success="fileUploadSuccess" list-type="picture-card"
              :limit="1" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
              :file-list="data">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible2">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="卷金额">
            <el-input v-model="form.yhqje" autocomplete="off" />
          </el-form-item>
          <el-form-item label="卷有效期">
            <el-input v-model="form.yxq" autocomplete="off" />
          </el-form-item>
          <el-form-item label="卷是否使用">
            <el-select v-model="form.yhqsfsy" placeholder="是否使用">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="卷是否弃用">
            <el-select v-model="form.yhqqy" placeholder="是否弃用">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
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
    name: "Yhj",
    components: {},
    data() {
      return {
        yhjz: [],
        userdl: [],
        txurl: 'http://naic.asia/',
        dialogFormVisible: false,
        form: {
          qid: '',
          yhqtb: '',
          yhqje: '',
          createdate: '',
          yxq: '',
          yhqsfsy: '',
          yhqqy: '',
        },
        dianame: '',
        searchText: '',
      }
    },
    created() {
      this.loadyhj();
    },
    computed: {
      filteredData() {
        const searchText = this.searchText.toLowerCase().trim();
        // console.log(searchText);
        if (!searchText) {
          this.yhjz1 = this.yhjz; // 如果搜索框内容为空，则返回原始数据
          // console.log(this.dystorez);
        } else {
          this.yhjz1 = this.yhjz.filter(item => {
            // 根据需要筛选匹配的字段
            return item.qid.toLowerCase().includes(searchText) ||
              item.createdate.toLowerCase().includes(searchText);


          });

          // console.log(this.storez1);
        }
      }
    },
    methods: {
      loadyhj() {
        this.userdl = JSON.parse(localStorage.getItem("user"));
        if (this.userdl != null) {
          request.get("/user/superselallyhj?u=" + this.userdl.user).then((res) => {
            if (res.code == "200") {
              this.yhjz = res.data;
            }
          });
        }
      },
      //关闭弹窗
      gbdia() {
        this.dialogFormVisible = false;
      },
      // 添加优惠卷
      add() {
        this.dianame = "新增优惠卷";
        this.dialogFormVisible = true;
        this.form = {
          qid: '',
          yhqtb: '',
          yhqje: '',
          createdate: '',
          yxq: '',
          yhqsfsy: '',
          yhqqy: '',
        };

      },
      // 删除优惠卷
      handleDelete(index, row) {
        request.delete("/user/delyhj?i=" + row.qid).then((res) => {
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
          this.loadyhj();
        })
      },
      // 修改单个优惠卷
      handleEdit(index, row) {
        // console.log(index,row);
        this.dianame = "修改优惠卷";
        this.dialogFormVisible = true;
        this.form = row;

      },
      //展播更新
      addandgx() {
        if (this.dianame === '新增优惠卷') {
          if (this.form.yhqje != "") {
            request.post("/user/addyhj", this.form).then((res) => {
              if (res.data === 1) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.loadyhj();
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
          this.loadyhj();
          this.dialogFormVisible = false;
        } else {
          request.post("/user/upyhj", this.form).then((res) => {
            if (res.data === 1) {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.loadyhj();
            } else {
              this.$message({
                type: "error",
                message: "修改失败"
              });
            }
          })
          this.loadyhj();
          this.dialogFormVisible = false;
        }
      },
      // 修改和更新
      xsgxandxz() {
        return this.dianame === '新增优惠卷' ? '添加' : '更新'
      },
      // 图片上传
      fileUploadSuccess(response) {
        this.file = response.data;
        console.log(this.file);
        if (this.file != "") {
          this.$message({
            type: "success",
            message: "图片上传成功，有缓存，不能及时更新!"
          });
          this.form.yhqtb = this.file;
        }
        // console.log(this.form);
      },
      // 导出xlsx
      createxlsx() {
        const data = this.yhjz; // 要导出的数据
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'yhjexport.xlsx');
      },
      // 导出csv
      createcsv() {
        const data = this.yhjz; // 要导出的数据
        const csvContent = "data:text/csv;charset=utf-8,"
          + data.map(row => Object.values(row).join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'yhjexport.csv');
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