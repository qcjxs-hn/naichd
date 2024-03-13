
<template>
    <div>
       
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        name:'Sy',
        data() {
    return {
      // 您的数据属性
    };
  },
        created()
    {
        if ( localStorage.getItem("user")!=null) {
            this.$router.push('/home')
        }
        else{
            
            this.$router.push("/login")
        }
    },
    methods: {
        //设置工作过期时间
    secondToDate(second) {
    if (!second) {
    return 0;
    }
    var time = new Array(0, 0, 0, 0, 0);
    time[0]=0;
    if (second >= 24 * 3600) {
    time[1] = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
    }
    if (second >= 3600) {
    time[2] = parseInt(second / 3600);
    second %= 3600;
    }
    if (second >= 60) {
    time[3] = parseInt(second / 60);
    second %= 60;
    }
    if (second > 0) {
    time[4] = second;
    }
    //alert(time);
    return time;
    },
    setTime() {
    var starttime = Math.round(new Date(Date.UTC(2021, 7, 18, 0, 0, 0)).getTime() / 1000);
    var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
    //alert(starttime);
    //alert(timestamp);
    //alert(timestamp - starttime);
    currentTime = secondToDate((timestamp - starttime));
    if(currentTime>=1){
        localStorage.setItem('workingTime')
    }
    },   
    }
    }
   
</script>
<style>
    
</style>