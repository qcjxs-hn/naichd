<template>
    <div style="height: 295px;">
        <div >
        <ul  v-infinite-scroll="loadszzbl" class="infinite-list" style="overflow: auto;border-radius: 20px;width: 300px;height: 280px;">
            <li v-for="i in data" style="height: 130px;border-radius: 10px;" :key="i" class="infinite-list-item">
                <el-row :gutter="20" class="rowst" >
                    <el-col :span="18"><el-image  :src="i.swiperurl" class="imagst" lazy /></el-col>
                    <el-col :span="6" style="padding: 0;">
                        <el-tag type="primary" style="font-size: 8px;margin-top: 50%;"  v-if="i.xswz=='0'">首页头部</el-tag>
                        <el-tag type="success" style="font-size: 8px;margin-top: 50%;"  v-if="i.xswz=='1'">首页底部</el-tag>
                        <el-tag type="info" style="font-size: 6px;margin-top: 50%;"  v-if="i.xswz=='2'">我的页面头部</el-tag>
                        <el-tag type="danger" style="font-size: 8px;margin-top: 50%;"  v-if="i.xswz=='3'">不显示</el-tag>
                        <el-popover :visible="'visible'+i.id" placement="top" :width="160">
                            <p>选择修改类型?</p>
                            <div style="text-align: right; margin: 0">
                              <el-button size="small" text @click="delsw(i)">删除</el-button>
                              <el-button size="small" type="primary" @click="updatesw(i)"
                                >更新</el-button
                              >
                            </div>
                            <template #reference>
                                <el-button type="primary" @click="" style="width: 80%;height: 25px;margin-top: 10%;font-size: 10px;"  plain>修改</el-button>
                            </template>
                          </el-popover>
                        
                    </el-col>
                  </el-row>
            </li>
          </ul>
             <!-- <el-button type="primary" style="margin-left: 35%;margin-top: -25px;width: 100px;height: 25px;" >新增展播</el-button> -->
        </div>
        <div >

        
              <el-button type="primary" style="margin-left: 34%;margin-top: 2px;width: 100px;height: 30px;" @click="addsw">新增展播</el-button>
        </div>
          <Dialogzj v-if="Dialog" :dianame="dianame" :cdform="cddata" :cddialogFormVisible="dialogFormVisible" @send-value="handleValueFromChild" />
    </div>
</template>
<script>
    import request from '../../utils/requestf';
    import Dialogzj from './Dialogzj.vue';
export default {
    name: 'Szzbl',
    data() {
        return {
            data: [],
            visible:false,
            Dialog:false,
            cddata:[],
            dialogFormVisible:false,
            valueFromChild: '',
            dianame:''
        }
    },
    created() {
        this.loadszzbl();
    },
    components:{
        Dialogzj,
    },
    methods: {
        // 加载展播列表
        loadszzbl() {
            request.get('/sw/all').then((res) => {
                if(res.code == 200){
                    console.log(res.data);
                    this.data = res.data;
                    
                }
            })
        },
        // 删除单条展播
        delsw(id){
            request.post('/sw/del?id='+id.id).then((res) =>{
                if(res.data===1){
                this.$message({
                    type:'success',
                    message:'删除成功！'
                })
                this.loadszzbl();
            }else{
                this.$message({
                    type:'error',
                    message:'删除失败！'
                })
            }
            })
        },
        //修改单条展播
        updatesw(id){
            console.log(id);
            this.Dialog = true;
            this.cddata = id;
            this.dialogFormVisible=true;
            this.dianame="修改展播"
        },
        //新增单条展播
        addsw(){
            this.Dialog = true;
            this.dianame="新增展播"
            this.cddata ={};
            this.dialogFormVisible=true;
        },
        handleValueFromChild(value) {
      // 处理从子组件接收到的值
      this.valueFromChild = value;
      this.Dialog=this.valueFromChild;
    }
    }
}
</script>
<style>
    /* row样式 */
    .rowst{
        width: 100%;height: 100%;border-radius: 20px;
    }
    /* 图片样式 */
.imagst{
    border-radius: 20px;
  width: 100%;
  height: 120px;
  margin-top: 5px;
}
</style>