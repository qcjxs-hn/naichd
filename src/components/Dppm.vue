<template>
    <div>
        <div class="statistic-card">
            <el-statistic value="">
                <template #title>
                    <div style="display: inline-flex; align-items: center;font-size: 13px;">
                        {{ti}}
                    </div>
                </template>
            </el-statistic>
        </div>
        <div>
            <div class="echart-div1" ref="box1"></div>
        </div>
    </div>
</template>
<script>
    import * as echarts from 'echarts';
    // import { GridComponent, LegendComponent } from 'echarts/components';
    // import { BarChart } from 'echarts/charts';
    // import { CanvasRenderer } from 'echarts/renderers';
    import request from '../../utils/requestf';
    // echarts.use([GridComponent, LegendComponent, BarChart, CanvasRenderer]);
    export default {
        name: 'Dppm',
        data() {
            return {
                ti: '店铺排名',
                data: [],
                datadd:[],
                seriesData:[],
                xAxisData:[],
                chartDom:null,
                myChart:null,
            }
        },
        
        created() {
            // this.data = this.datadd;
        

        },
        mounted() {
           this.chartDom = this.$refs.box1;
           console.log(this.chartDom);
           if (this.chartDom) {
                    this.myChart = echarts.init(this.chartDom);
            }
            
            this.jsq = setInterval(() => {
                this.loadxzdd();
            }, 2000);
        },
        methods: {
            //绘制
            huizhi() {
                // console.log(this.datadd);
                this.data = this.datadd
                // 定义一个对象，用于记录名称及其数量
                const nameCount = {};
                // console.log(this.data);
                // 遍历数据数组
                this.data.forEach(item => {
                    // console.log(item);
                    // 提取每个元素的名称
                    const name = item.dpmc;
                    // 判断名称是否已存在于 nameCount 对象中，如果不存在则初始化数量为 0
                    if (!nameCount[name]) {
                        nameCount[name] = 0;
                    }
                    // 增加数量统计
                    nameCount[name]++;

                });
                // 生成 echarts 图表所需的数据格式
                this.xAxisData = Object.keys(nameCount); // 名称作为 y 轴数据
                this.seriesData = Object.values(nameCount); // 数量作为系列数据
                // 使用生成的数据设置 echarts 图表的 option
                const option = {
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: this.xAxisData,
                        inverse: true,
                        animationDuration: 300,
                        animationDurationUpdate: 300,
                        max: 2,
                     
                        axisLabel: {
                            width: 100, // 调整Y轴的宽度
                            fontSize: 10,
                        }
                    },
                    series: [{
                        type: 'bar',
                        data: this.seriesData,
                        realtimeSort: true,
                        name: '订单',
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    }],
                    legend: {
                        show: true
                    },
                    animationDuration: 0,
                    animationDurationUpdate: 3000,
                    animationEasing: 'linear',
                    animationEasingUpdate: 'linear'
                };   // 使用 echarts 初始化图表，并设置 option

                this.myChart.setOption(option);
                
            },
            // 新增订单
                loadxzdd(){
                this.userdl=JSON.parse(localStorage.getItem("user"));
                        if(this.userdl!=null){
                        request.get("/nc/superselall?u="+this.userdl.user).then(res =>{
                            if(res.code=='200'){
                            this.datadd=res.data;
                            this.jsqnb();
                    }
                })
                }
                },
                // 计时器
            jsqnb() {
                this.huizhi();
            
            }
        }
    }
</script>
<style>
    .statistic-card {
        height: 100%;
        padding: 10px;
        border-radius: 4px;
        background-color: var(--el-bg-color-overlay);
    }
    /* 图形样式 */
    .echart-div1{
        width: 100%;
    height: 240px;
    padding: 5px;
    }
</style>