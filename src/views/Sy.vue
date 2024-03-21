
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
        this.setTime();
        this.setdlTime();
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
    var time = 0;
    if (second >= 24 * 3600) {
    time= parseInt(second / (24 * 3600));
    second %= 24 * 3600;
    }
    return time;
    },
    setTime() {
    var starttime = localStorage.getItem('starttime');
    if (starttime == null) {
        starttime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
        localStorage.setItem('starttime', starttime);
    }
    var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
     var currentTime = this.secondToDate((timestamp - starttime));
    if(currentTime>=1){
      var starttime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
      localStorage.setItem('starttime', starttime);
     localStorage.removeItem("workingTime");
    }
    },  
      //设置登录过期时间
      setdlTime() {
        var starttime = localStorage.getItem('startdltime');
            if (starttime == null) {
                starttime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
                localStorage.setItem('startdltime', starttime);
            }
    var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
     var currentTime = this.secondToDate((timestamp - starttime));
     console.log(currentTime);
    if(currentTime>=3){
      var starttime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
      localStorage.setItem('startdltime', starttime);
     localStorage.removeItem("user");
    }
      }
    }
    }
   
</script>
<style>
    
</style>