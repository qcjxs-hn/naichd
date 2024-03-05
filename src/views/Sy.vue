
<template>
    <div>
        sy
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
    }
    }
   
</script>
<style>
    
</style>