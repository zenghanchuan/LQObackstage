<template>
	<el-container>
	  <el-aside width="200px">
	  	<app-menu></app-menu>
	  </el-aside>
	  <el-container>
	    <el-header>
		    	<router-link :to="{name:'loginLink'}">
		    	<div class="quit" @click="quithome">
		    		<el-tooltip content="退出登录" placement="bottom" effect="light">
		    			<img src="../../static/img/home_img/guanji.png" />
		    		</el-tooltip>
		    	</div>
		    	</router-link>
		    	<span class="username">已登录</span>
	    </el-header>
	    <el-main>
	    	<div class="main">
	    		<router-view></router-view>
	    	</div>
	    </el-main>
	  </el-container>
	</el-container>
</template>

<script>
import axios from 'axios'
import Menu from './Menu'
import Chain from './cases/Chain'
import Household from './cases/Household'
import Government from './cases/Government'
import Furniture from './cases/Furniture'
import Insurance from './cases/Insurance'
export default {
  name: 'home',
  data () {
    return {
//		username:window.localStorage.getItem('username')
		username:window.sessionStorage.getItem('username')
    }
  },
  components:{
	  	"app-menu":Menu,
	  	
  },
//beforeCreate:function(){
//		var username = window.localStorage.getItem('username')
//      if(!username){
//      	this.$message.warning('请先登录！');
//          this.$router.push('/')
//      }
//},
  methods:{
  	quithome:function(){
		window.localStorage.clear();
//		window.sessionStorage.clear();
  		
        this.$router.push('/')
  	},
  	
  },
  
}
</script>

<style scoped lang="scss">
.el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    background-color: white;
    color: #333;
    text-align: center;
    height: 100px;
    line-height: 100px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    margin-right: 0;
    padding-right: 0;
  }
  
  .el-aside {
    /*background-color: #D3DCE6;*/
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container{
  	height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


.el-header .quit{
	width: 60px;
	height: 60px;
	float: right;
	background-color: #36c7ff;
	position: relative;
	cursor: pointer;
	img{
		width: 36px;
		height: 36px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -18px;
		margin-top: -18px;
	}
	&:hover{
		background-color: #DAB36E;
	}
}
.el-header .username{
	width: 200px;
	height: 60px;
	float: right;
	line-height: 60px;
	color: #36C7FF;
}


</style>
