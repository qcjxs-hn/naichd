<template>
    <div>
        <el-dialog :close-on-click-modal="false" :show-close="false" draggable v-model="dialogFormVisible" :title="dianame" width="500" style="border-radius: 20px;">
            <el-form :model="form">
              <el-form-item label="是否有操作" >
                <el-select v-model="form.sfycz" placeholder="选择操作内容">
                    <el-option label="页面转换" value="2" />
                    <el-option label="网页跳转" value="1" />
                    <el-option label="无" value="0" />
                  </el-select>
              </el-form-item>
            <el-form-item v-if="form.sfycz=='1'" label="跳转网址">
                <el-input v-model="form.swipercz" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更改显示位置" >
                <el-select v-model="form.xswz" placeholder="选择显示位置">
                    <el-option label="我的页面头部" value="2" />
                    <el-option label="首页底部" value="1" />
                    <el-option label="首页顶部" value="0" />
                  </el-select>
              </el-form-item>
              <el-form-item label="更改显示图像" >
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
    
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="sendValueToParent">关闭</el-button>
                <el-button type="primary" @click="swgx">
                    {{xsgxandxz()}}
                </el-button>
              </div>
            </template>
          </el-dialog>
    </div>
</template>
<script>
    import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
    import request from '../../utils/requestf';
export default {
    name: 'Dialogzj',
    props:['cdform','cddialogFormVisible','dianame'],
    data(){
        return{
            // dialogFormVisible:false,
            dialogVisible:false,
            disabled:false,
            dialogImageUrl:'',
            form:{
                id:'',
                sfycz:'',
                swipercz:'',
                swiperurl:'',
                xswz:'',
            },
            file:'',
        }
    },
    created(){
        this.form=this.cdform;
        this.dialogFormVisible=this.cddialogFormVisible;
        console.log(this.form);
        console.log(this.dialogFormVisible);
    },
    mouthed(){
        this.form=this.cdform;
        this.dialogFormVisible=this.cddialogFormVisible;
        console.log(this.form);
    },
   methods:{
    //展播更新
    swgx(){
        console.log(this.cdform);
        console.log(this.form);
       
        if(this.dianame==='新增展播'){
            this.form.id=this.cdform.id;
            console.log(this.form.id);
            if(this.form.id!=undefined){
                // console.log(this.form.id);
            request.post('/sw/xz',this.form).then(res=>{
                console.log(res);
                if(res.data===1){
                    this.$message({
                        type:'success',
                        message:'添加成功！' })
                        this.sendValueToParent();
                    }else{
                        this.$message({
                            type:'error',
                            message:'添加失败！'
                        })
                    }
                })
            }else{
                this.$message({
                    type:'error',
                    message:'添加失败,不能为空！'
                })
            }
        }else{
        request.post('/sw/gx',this.form).then(res=>{
            console.log(res);
            if(res.data===1){
                this.$message({
                    type:'success',
                    message:'更新成功！'
                })
                this.sendValueToParent();
            }else{
                this.$message({
                    type:'error',
                    message:'更新失败！'
                })
            }
        })
    }
    },
    close(){
        console.log(this.dialogFormVisible);
    },
    xsgxandxz(){
        return this.dianame==='新增展播'? '添加':'更新'
    },
    sendValueToParent() {
      // 触发名为 'send-value' 的事件，并传递一个值 false 给父组件
      this.$emit('send-value', false);
    },
// 图片上传
    fileUploadSuccess(response) {
    this.file = response.data;
    console.log(this.file);
    this.form.swiperurl=this.file;
    // console.log(this.form);
}
   }
}
</script>
<style>

</style>