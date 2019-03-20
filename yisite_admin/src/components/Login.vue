<template>
	<div class="allbox">
		<div class="loginbox">
			<h1>易思特后台管理系统</h1>
			<div class="info">
				<img class="icon" src="../../static/img/login_img/yonghu.png" />
				<input type="text" v-model="username" placeholder="请输入账号" />
			</div>
			<div class="info">
				<img class="icon" src="../../static/img/login_img/mima.png" />
				<input type="password" v-model="userpassword" placeholder="请输入密码" />
			</div>
			<button @click="userLogin">登录</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import md5 from 'js-md5'
	export default {
	  name: 'login',
	  data () {
	    return {
			username:'',
			userpassword:''
	    }
	  },
	  methods:{
	  	userLogin:function(){
	  		let that = this;
	  		if(this.username!=''&&this.userpassword!=''){
	  			var mypassword = md5(this.userpassword);
	  			console.log(mypassword);
	  			axios.post('/api/users/login',{
	  				name:this.username,
	  				password:mypassword
	  			})
	  			.then(response=>{
	  				let res = response.data;
	  				
	  				if(res.code==1){
	  					this.$message.success('登录成功！');
	  					window.localStorage.setItem('userName',that.username)
	  					window.localStorage.setItem('userToken',res.token)
						//将用户名和token放入sessionStorage
//						window.sessionStorage.setItem("userName",res.username);
//						window.sessionStorage.setItem("userToken",res.token);
//						console.log((window.sessionStorage));
						//将用户名放入vuex
//						this.$store.currentUser=res.username;
//						this.$store.token=res.token;
						this.$router.push({name:"aboutystLink"});
	  				}else if(res.code==0){
	  					this.$message.error('用户名不存在！');
	  				}else if(res.code==2){
	  					this.$message.warning('密码错误！');
	  				}else{
	  					this.$message.warning('服务器错误！');
	  				}
	  			})
	  		}else{
	  			this.$message.error( '请将信息完整！');
	  		}
	  	},
	  },
	  beforeCreate:function(){
	  	    var username = window.localStorage.getItem('userName');
	  	    var usertoken = window.localStorage.getItem('userToken');
            if(username){
                this.$router.push('/home/aboutyst');
            }
//			if(window.sessionStorage.getItem("userName")&&window.sessionStorage.getItem("userToken")){
//				this.$router.push('/home/aboutyst');
//			}
	 },
	  
	}
</script>

<style scoped lang="scss">
.allbox{
	width: 100%;
	height: 100%;
	background-image: url(../../static/img/login_img/bk1.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	position: relative;
	
	.loginbox{
		width: 480px;
		height: 400px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -240px;
		margin-top: -200px;
		background-color: white;
		text-align: center;
		border-radius: 10px;
		box-shadow: 0 0 30px 1px #fff8d1;
		overflow:hidden;
		
		
		h1{
			width: 100%;
			text-align: center;
			height: 150px;
			line-height: 150px;
			font-size: 30px;
			color: white;
			background-color: #DAB36E;
		}
		.info{
			width: 100%;
			height: 80px;
			box-sizing: border-box;
			padding: 20px 0 0 20px;
			img.icon{
				width: 34px;
				height: 34px;
				float: left;
				margin-top: 6px;
				margin-right: 8px;
			}
			input{
				height: 40px;
				width: 380px;
				line-height: 40px;
				font-size: 18px;
				outline: none;
				border: none;
				border-bottom: 2px solid #DAB36E;
				&::-webkit-input-placeholder{
					color: #DAB36E;
					font-size: 16px;
				}
			}
			
		}
		button{
				width: 100px;
				height: 44px;
				background-color: #DAB36E;
				color: white;
				border-radius: 20px;
				outline: none;
				border: 0;
				margin: 0 auto;
				font-size: 20px;
				margin-top: 15px;
				&:hover{
					cursor: pointer;
				}
			}
		
	}
}
</style>
