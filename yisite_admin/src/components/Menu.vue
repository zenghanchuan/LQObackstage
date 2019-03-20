<template>
	 <div class="menu">
	 	<a href="#">
	 		<img src="../../static/img/login_img/logo.png" />
	 	</a>
	 	<el-menu
	      :default-active="$route.path"
	      class="el-menu-vertical-demo"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="#545c64"
	      text-color="#fff"
	      active-text-color="#ffd04b"
	      router>
	      <el-submenu index="1">
	        <template slot="title">
	          <i class="el-icon-news"></i>
	          <span>关于我们</span>
	        </template>
	        <el-menu-item-group>
		          <el-menu-item index="/home/aboutyst">关于易思特</el-menu-item>
		          <el-menu-item index="/home/ystadvantage">易思特优势</el-menu-item>
	          	  <el-menu-item index="/home/ystteam">易思特团队</el-menu-item>
	          	  <el-menu-item index="/home/structure">组织架构</el-menu-item>
	          	  <el-menu-item index="/home/ysttechnology">易思特技术</el-menu-item>
	          	  <el-menu-item index="/home/ystculture">易思特文化</el-menu-item>
	        </el-menu-item-group>
	      </el-submenu>
	      <el-submenu index="2">
	        <template slot="title">
	          <i class="el-icon-search"></i>
	          <span>核心研究</span>
	        </template>
	        <el-menu-item-group>
		          <el-menu-item index="/home/consumer">消费者研究</el-menu-item>
		          <el-menu-item index="/home/satisfaction">满意度研究</el-menu-item>
	          	  <el-menu-item index="/home/realty">房地产研究</el-menu-item>
	          	  <el-menu-item index="/home/publicservice">公共服务研究</el-menu-item>
	          	  <el-menu-item index="/home/internetuser">互联网用户研究</el-menu-item>
	          	  <el-menu-item index="/home/marketaccess">市场进入研究</el-menu-item>
	          	  <el-menu-item index="/home/advertising">广告媒介研究</el-menu-item>
	          	  <el-menu-item index="/home/mysterycustomer">神秘顾客研究</el-menu-item>
	        </el-menu-item-group>
	      </el-submenu>
	      <el-submenu index="3">
	        <template slot="title">
	          <i class="el-icon-document"></i>
	          <span>成功案例</span>
	        </template>
	        <el-menu-item-group>
		          <el-menu-item index="/home/chain">连锁/零售</el-menu-item>
		          <el-menu-item index="/home/household">快销/日化</el-menu-item>
	          	  <el-menu-item index="/home/government">政府/组织</el-menu-item>
	          	  <el-menu-item index="/home/furniture">家具/建材</el-menu-item>
	          	  <el-menu-item index="/home/insurance">金融保险</el-menu-item>
	          	  <el-menu-item index="/home/cars">汽车工业</el-menu-item>
	        </el-menu-item-group>
	      </el-submenu>
	      <el-menu-item index="/home/news">
	        <i class="el-icon-date"></i>
	        <span slot="title">新闻资讯</span>
	      </el-menu-item>
	      <el-menu-item index="/home/contacts">
	        <i class="el-icon-phone-outline"></i>
	        <span slot="title">联系我们</span>
	      </el-menu-item>
	    </el-menu>
	 </div>
</template>

<script>
export default {
    name: 'app-menu',
    data () {
     return {

     }
    },
  	methods: {
	  handleOpen(key, keyPath) {
//	    console.log(key, keyPath);
	  },
	  handleClose(key, keyPath) {
//	    console.log(key, keyPath);
	  }
	}
}
</script>

<style scoped lang="scss">
.menu{
	overflow-x: hidden;
	a{
		display: block;
		height: 70px;
		img{
			width: 100px;
			position: relative;
			top: -54px;
		}
	}
	
}
.el-menu{
	width: 100%;
	
}
ul a{
	text-decoration: none;
}
</style>
