<template>
    <div>
        <!-- 圆环百分比 -->
        <!-- {{bfb}} -->
        <div class="echart-div" ref="box"></div>
    </div>
</template>
<script>
        import * as  echarts from 'echarts'
export default {
    name: 'CircleProgress',
    props: ['bfb'],
    data() {
        return {
         bfbz:0, 
         kbz:0, 
         upcolor:'#73A847',
         downcolor:'#F56C6C',
         leftitemcolor:'',
         rightitemcolor:'',

        }
    },
    created(){
    },
    mounted() {
        const chartDom = this.$refs.box;
       // 检查 DOM 元素是否有效
            this.jsq=setInterval(()=>{
                if (chartDom) {
                this.jsqnb();
                }else{
                    return;
                }
            },1000);
            
    },
    methods: {
        hueizhi(){
            const chartDom = this.$refs.box
            if (chartDom) {
            const mycart = echarts.init(chartDom);
            const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '0%',
                left: 'center'
            },
            series: [
                {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 5,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value:this.bfbz , name: '百分比', itemStyle: { color: this.rightitemcolor } },
                    { value: this.kbz, name: '空白',itemStyle: { color: '#F7F7F7' } },
                ]
                }
            ]
            };
            mycart.setOption(option);
        }
        },
        jsqnb(){
        if(this.bfb.includes("-")){
           this.bfbz= Number(this.bfb.substring(1));
           this.kbz=100-this.bfbz;
           this.rightitemcolor=this.downcolor;
           this.hueizhi();
        }else{
           this.bfbz= Number(this.bfb);
           this.kbz=100-this.bfbz;
           this.hueizhi();
           this.rightitemcolor=this.upcolor;
        }
        }
    },

};
</script>
<style>
.echart-div {
    width: 250px;
    height: 106px;
    padding: 10px;
    /* border: 3px solid pink; */
    /* margin: 20px ; */
}
</style>