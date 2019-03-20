<template>
	<div class="main">
		<h2>研究定义：</h2>
		<el-input
		  type="textarea"
		  :rows="8"
		  width="100%"
		  placeholder="请输入内容"
		  v-model="re_define">
		</el-input>
		<h2>研究目的：</h2>
		<el-button type="success" icon="el-icon-plus" circle @click="showAddmodal('add_modal_goal','.add_close_goal')"></el-button>
		<el-table
		    :data="goalData"
		    style="width: 100%"
		    max-height="250">
		    <el-table-column
		      prop="singleitem"
		      :show-overflow-tooltip="true"
		      label="条目"
		      >
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="120">
		      <template slot-scope="scope">
		        <el-button
		          @click.native.prevent="deleteRow(scope.$index, goalData)"
		          type="text"
		          size="small">
		          移除
		        </el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<h2>研究内容：</h2>
		<el-button type="success" icon="el-icon-plus" circle @click="showAddmodal('add_modal_con','.add_close_con')"></el-button>
		<el-table
		    :data="contentData"
		    style="width: 100%"
		    max-height="250">
		    <el-table-column
		      prop="itemtitle"
		      :show-overflow-tooltip="true"
		      label="小标题"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="itemcontent"
		      :show-overflow-tooltip="true"
		      label="内容"
		      >
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="120">
		      <template slot-scope="scope">
		        <el-button
		          @click.native.prevent="deleteRow(scope.$index, contentData)"
		          type="text"
		          size="small">
		          移除
		        </el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<h2>研究模型：</h2>
		<el-input
		  type="textarea"
		  :rows="8"
		  width="100%"
		  placeholder="请输入内容"
		  v-model="re_model">
		</el-input>
		<h2>典型案例：</h2>
		<el-input
		  type="textarea"
		  :rows="8"
		  width="100%"
		  placeholder="请输入内容"
		  v-model="re_case">
		</el-input>
		<div class="add_modal_goal">
			<div class="add_modal_content">
				<span class="add_close_goal">&times;</span>
				<el-input
					class="essay_content"
					resize="none"
				  type="textarea"
				  :autosize="{ minRows: 14, maxRows: 14}"
				  placeholder="请输入此条内容！"
				  v-model="singleitem">
				</el-input>
				<el-button class="essay_btn" type="primary" @click="addReitem" round>确定</el-button>
			</div>
		</div>
		<div class="add_modal_con">
			<div class="add_modal_content">
				<span class="add_close_con">&times;</span>
				<el-input class="essay_title" v-model="itemtitle" placeholder="请输入小标题！"></el-input>
				<el-input
					class="essay_content"
					resize="none"
				  type="textarea"
				  :autosize="{ minRows: 14, maxRows: 14}"
				  placeholder="请输入此条内容！"
				  v-model="itemcontent">
				</el-input>
				<el-button class="essay_btn" type="primary" @click="addRecon" round>确定</el-button>
			</div>
		</div>
		<el-button type="primary" round style="float: right;" @click="commitInfo">提交保存</el-button>
	</div>
  	
</template>

<script>
	import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
		goalData:[],
		contentData:[],
		singleitem:'',
		itemtitle:'',
		itemcontent:'',
		
		re_define:'',
		re_model:'',
		re_case:''
		
		
    }
  },
  methods: {
  	//移除一行
      deleteRow(index, list) {
        list.splice(index, 1);
        this.$message.warning("修改内容后请点击提交保存按钮！")
      },
      showAddmodal:function(op1,op2){
			var modal = document.getElementsByClassName(op1)[0];
			var span = document.querySelector(op2);
			modal.style.display="block";
			span.onclick = function(){
				modal.style.display = "none";
			}
      },
      //添加研究目的条目
      addReitem:function(){
      	this.goalData.push({singleitem:this.singleitem});
      	document.getElementsByClassName('add_modal_goal')[0].style.display = "none";
      	this.singleitem='';
      },
      //添加研究内容的条目
      addRecon:function(){
      	this.contentData.push({itemtitle:this.itemtitle,itemcontent:this.itemcontent});
      	document.getElementsByClassName('add_modal_con')[0].style.display = "none";
      	this.itemtitle='';
      	this.itemcontent ='';
      },
      commitInfo:function(){
      	if(this.re_define!=''&&this.re_goal!=''&&this.re_content!=''&&this.re_model!=''&&this.re_case!=''){
      		axios.post('/api/research/saveinfo',{
      			re_type:'type_realty',
      			re_define:this.re_define,
	        	re_goal:JSON.stringify(this.goalData),
	        	re_content:JSON.stringify(this.contentData),
	        	re_model:this.re_model,
	        	re_case:this.re_case
      		})
      		.then(response=>{
      			let res = response.data;
      			if(res.code==1){
      				this.$message.success("保存成功！")
      				this.getInfo()
      			}else{
      				this.$message.error("服务器错误！")
      			}
      		})
      	}else{
	    		this.$message.error( '请将信息填写完整！');
	    	}
      },
      getInfo:function(){
      	axios.get('/api/research/getinfo',{
      		params:{
      			re_type:'type_realty'
      		}
      	})
      		.then(response=>{
      			let res = response.data;
      			this.re_define = res[0].re_define;
      			this.goalData =JSON.parse(res[0].re_goal);
      			this.contentData =JSON.parse(res[0].re_content);
      			this.re_model = res[0].re_model;
      			this.re_case = res[0].re_case;
      	})
      },
  },
  created(){
    	this.getInfo()
  },

  
}
</script>

<style scoped lang="scss">
h2{
	font-size: 20px;
	color: #36C7FF;
	font-weight: 700;
	font-family: "微软雅黑";
	text-align: left;
	height: 100px;
}
.el-button{
	float: left;
	margin: 5px;
}
.add_modal_goal,.add_modal_con{
	display: none;
	position: fixed;
	z-index: 4;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0,0,0); 
	background-color: rgba(0,0,0,0.4);
	.add_modal_content{
		background-color: white;
	    margin: 4% auto; 
	    padding: 10px 50px;
	    box-sizing: border-box;
	    border: none;
	    width: 500px;
	    height: 480px; 
	    box-shadow: 0px 0px 40px 3px #D9D9D9;
	    border-radius: 8px;
	    span{
	    	color: #aaa;
		    float: right;
		    font-size: 28px;
		    font-weight: bold;
		    height: 30px;
		    position: relative;
		    top: -50px;
		    right: -20px;
		    &:hover{
		    	color: black;
			    text-decoration: none;
			    cursor: pointer;
		    }
	    }
	    .essay_title{
	    	margin-top: 20px;
	    }
	    .essay_content{
	    	margin-top: 20px;
	    }
	    .essay_btn{
    		position: relative;
    		left: 50%;
    		margin-left: -38px;
    		top: 10px;
    	}
	}
	
}
.add_modal_con .add_modal_content{
	height: 650px;
}
</style>
