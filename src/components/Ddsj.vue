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
            <div class="echart-div1" ref="box2"></div>
        </div>
    </div>
</template>
<script>
    import * as echarts from 'echarts';
    import request from '../../utils/requestf';

    import { format } from 'date-fns';
    export default {
        name: 'Ddsj',
        data() {
            return {
                ti: '订单数据',
                chartDom: null,
                myChart: null,
                data: [],
                dataddd: [],
                // 原始数据
                originalData: [],

                // 按日期分类后的数据
                dataByMonth: {},
                //日期数组
                datez: [],
                //已取消数据
                yqxdata: [],
                //已支付数据
                yzfdata: [],
                //取餐中数据
                qczdata: [],
                //已完成数据
                ywcdata: [],
            }
        },
        created() {

        },
        mounted() {
            this.chartDom = this.$refs.box2;
            console.log(this.chartDom);
            if (this.chartDom) {
                this.myChart = echarts.init(this.chartDom);
            }

            this.jsq = setInterval(() => {
                this.loadxzdd();

            }, 5000);
        },
       
        methods: {
            huizhi() {
                this.data = this.dataddd
                this.groupDataByMonth(this.data);

                this.processMonthData();
                // 定义一个对象，用于记录名称及其数量
                const nameCount = {};
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
                const option = {
                    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['已取消', '已支付', '取餐中', '订单完成']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLabel: {
                                width: 500,
                                fontSize: 8,
                            },
                            data: this.datez,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '已取消',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgb(128, 255, 165)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(1, 191, 236)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.yqxdata
                        },
                        {
                            name: '已支付',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgb(0, 221, 255)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(77, 119, 255)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.yzfdata
                        },
                        {
                            name: '取餐中',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgb(55, 162, 255)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(116, 21, 219)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.qczdata
                        },
                        {
                            name: '订单完成',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgb(255, 0, 135)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(135, 0, 157)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.ywcdata
                        },

                    ]
                };
                this.myChart.setOption(option);
                // 避免一直增长
                this.datez = [];
                this.yqxdata = [];
                this.yzfdata = [];
                this.qczdata = [];
                this.ywcdata = [];
            },
            // 新增订单
            loadxzdd() {
                this.userdl = JSON.parse(localStorage.getItem("user"));
                if (this.userdl != null) {
                    if (this.userdl.userzt == '3') {
                        request.get("/nc/superselall?u=" + this.userdl.user).then(res => {
                            if (res.code == '200') {
                                this.dataddd = res.data;
                                this.jsqnb();
                            }
                        })
                    } else if (this.userdl.userzt == "1") {
                        this.userdp = JSON.parse(localStorage.getItem("shop"));
                        if (this.userdp != null) {
                            request.get("/nc/seldd?d=" + this.userdp.dpmc).then(res => {
                                if (res.code == '200') {
                                    this.dataddd = res.data;
                                    this.jsqnb();
                                }
                            })
                        }
                    }
                }
            },

            // 计时器
            jsqnb() {
                this.huizhi();

            },
            // =========数据处理======
            // 将数据按月份分类
            groupDataByMonth(data) {
                // console.log(data);
                this.originalData = data;
                this.originalData.forEach(item => {
                    // 获取日期所在月份
                    const month = format(new Date(item.createdate), 'yyyy-MM-dd');

                    // 如果该月份数据不存在，则初始化为一个数组
                    if (!this.dataByMonth[month]) {
                        this.dataByMonth[month] = [];
                    } else {
                        // 将数据添加到对应月份的数组中
                        const exists = this.dataByMonth[month].some(existingItem => existingItem.createid === item.createid);
                        if (!exists) {
                            this.dataByMonth[month].push(item);
                        }
                    }
                });
            },
            // 处理每个月份的数据
            processMonthData() {

                var yqxdata = [];
                var yzfdata = [];
                var qczdata = [];
                var ywcdata = [];
                var i = 0;
                var i2 = 0;
                var i3 = 0;
                var i4 = 0;
                for (const month in this.dataByMonth) {
                    // 对该月份的数据进行处理，可以根据具体需求自行编写逻辑
                    const monthData = this.dataByMonth[month];
                    var yqxz = 0;
                    var yzfz = 0;
                    var qczz = 0;
                    var ywcz = 0;
                    this.datez.push(month);
                    for (let index = 0; index < monthData.length; index++) {
                        const element = monthData[index];
                        if (element.sfzf === "0") {
                            // console.log(i);
                            if (yqxdata[i] == null) {
                                yqxdata[i] = 0
                            }
                            yqxz = yqxdata[i] + 1;
                            // console.log(yqxz);
                            yqxdata[i] = yqxz;
                        } else {
                            if (yqxdata[i] == null) {
                                yqxdata[i] = 0
                            }
                        }
                        if (element.sfzf === "1") {
                            if (yzfdata[i2] == null) {
                                yzfdata[i2] = 0
                            }
                            yzfz = yzfdata[i2] + 1;
                            yzfdata[i2] = yzfz;
                           

                        } else {
                            if (yzfdata[i2] == null) {
                                yzfdata[i2] = 0
                            }
                        }
                        if (element.sfzf === "2") {
                            if (qczdata[i3] == null) {
                                qczdata[i3] = 0
                            }
                            qczz = qczdata[i3] + 1;
                            qczdata[i3] = qczz;

                        } else {
                            if (qczdata[i3] == null) {
                                qczdata[i3] = 0
                            }
                        }
                        if (element.sfzf === "3") {
                            if (ywcdata[i4] == null) {
                                ywcdata[i4] = 0
                            }
                            ywcz = ywcdata[i4] + 1;
                            ywcdata[i4] = ywcz;
                        } else {
                            if (ywcdata[i4] == null) {
                                ywcdata[i4] = 0
                            }
                        }
                    }
                    i++;
                    i2++;
                    i3++;
                    i4++;
                    // console.log(i);
                    // console.log(`Month: ${month}`);


                    // console.log(monthData);
                    // 在这里可以进行统计、渲染等操作
                }
                this.yqxdata = yqxdata;
                this.yzfdata = yzfdata;
                this.qczdata = qczdata;
                this.ywcdata = ywcdata;
                // console.log("已取消",yqxdata);
                //     console.log("已支付",yzfdata);
                //     console.log("取餐中",qczdata);
                //     console.log("已完成",ywcdata);
                yqxdata = [];
                yzfdata = [];
                qczdata = [];
                ywcdata = [];
                // console.log(this.datez.length);
                i = 0;
                i2 = 0;
                i3 = 0;
                i4 = 0;
            },
          
        }
    }
</script>
<style>

</style>