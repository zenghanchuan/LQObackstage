<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components:{
  	
  },
methods:{
	verifyToken:function(){
		var that = this;
		console.log('检查检查'+window.localStorage.getItem("userName"));
		axios.post('/api/users/checktoken',{
				username:window.localStorage.getItem("userName")
		})
		.then(response=>{
			let res = response.data;
			if(res.code==1){
				this.$message.success('token有效！');
				that.$router.push({name:"aboutystLink"});
			}else if(res.code==0){
				this.$message.warning('token已失效！');
				that.$router.push({name:"loginLink"});
				window.localStorage.clear();
			}else if(res.code==2){
//				this.$message.error('没有缓存的用户信息！');
			}
		})
	}
},
created(){
	this.verifyToken()
}

}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
