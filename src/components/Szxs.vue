<template>
    <div>
         <!-- 数字显示 -->
         <div class="statistic-card">
            <el-statistic :value="nu">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                   {{ti}}
                  <el-tooltip
                    effect="dark"
                    :content="ts"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>比上月</span>
                <span class="red" v-if="reg.test(bfb)">
                  {{bfb.substring(1)}}%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
                <span class="green" v-else>
                  {{bfb}}
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
export default {
    name: 'Szxs',
    components: {  
        ArrowRight,
        CaretBottom,
        CaretTop,
        Warning,
    },
    props:['ti','ts','nu','bfb'],
    data() {
        return {
            reg:/-/,
           
        }
    },
    methods: {
        
    },

}   
</script>
<style> 
/* <!-- 数字显示 样式--> */
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>