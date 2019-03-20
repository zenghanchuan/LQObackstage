<template>
  <div class="main">
  	<el-button type="primary" class="addbtn" @click="showAddmodal">添加内容</el-button>
  	<el-table
    :data="tableData"
    class="mytable"
    style="width: 100%;"
    >
    <el-table-column
      label="标题"
      :show-overflow-tooltip="true"
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.essay_title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="内容"
      :show-overflow-tooltip="true"
      align="center">
      <template slot-scope="scope">
        <span>{{scope.row.essay_content}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="showEditmodal(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
	<div class="add_modal">
		<div class="add_modal_content">
			<span class="add_close">&times;</span>
			<el-input class="essay_title" v-model="addForm.essay_title" placeholder="请输入段落标题！"></el-input>
			<el-input
				class="essay_content"
				resize="none"
			  type="textarea"
			  :autosize="{ minRows: 22, maxRows: 22}"
			  placeholder="请输入段落内容！"
			  v-model="addForm.essay_content">
			</el-input>
			<el-button class="essay_btn" type="primary" @click="saveArticle" round>确定</el-button>
		</div>
	</div>
	<div class="edit_modal">
		<div class="edit_modal_content">
			<span class="edit_close">&times;</span>
			<div class="em_head">
				<label>修改标题：</label>
				<el-input class="essay_title" v-model="editForm.essay_title" placeholder="请输入段落标题！"></el-input>
			</div>
			<div class="em_content">
				<label>修改内容：</label>
				<el-input
					class="essay_content"
					resize="none"
				  type="textarea"
				  :autosize="{ minRows: 22, maxRows: 22}"
				  placeholder="请输入段落内容！"
				  v-model="editForm.essay_content">
				</el-input>
			</div>
			<el-button class="essay_btn" type="primary" @click="editArticle" round>确定</el-button>
		</div>
	</div>
  </div>
</template>

<script>
	import axios from 'axios'
export default {
  name: 'app-news',
  data () {
    return {
		tableData: [],
        addForm:{
        	essay_title:'',
        	essay_content:'',
        },
        editForm:{
        	essay_id:'',
        	essay_title:'',
        	essay_content:'',
        },
        
        

    }
  },
  methods: {
  	  //显示修改段落的模态框
      showEditmodal(index, row) {
        console.log(index, row);
        var modal = document.getElementsByClassName("edit_modal")[0];
				var span = document.querySelector(".edit_close");
				modal.style.display="block";
				span.onclick = function(){
					modal.style.display = "none";
				}
				this.editForm.essay_id = row._id;
				this.editForm.essay_title = row.essay_title;
				this.editForm.essay_content =row.essay_content;
				
      },
      
      //显示添加段落的模态框
      showAddmodal:function(){
				var modal = document.getElementsByClassName("add_modal")[0];
				var span = document.querySelector(".add_close");
				modal.style.display="block";
				span.onclick = function(){
					modal.style.display = "none";
				}
      },
      
      //保存添加的段落
      saveArticle:function(){
      	if(this.addForm.essay_title!=''&&this.addForm.essay_imgfile!=''&&this.addForm.essay_content!=''){
      		axios.post('/api/aboutus/addpara',{
      			essay_type:'type_structure',
      			essay_title:this.addForm.essay_title,
	        	essay_content:this.addForm.essay_content,
      		})
      		.then(response=>{
      			let res = response.data;
      			if(res.code==1){
      				
      				this.addForm.essay_title ='';
      				this.addForm.essay_content='';
      				
      				this.$message.success("添加成功！")
      				document.getElementsByClassName("add_modal")[0].style.display="none";
      				this.getArticle()
      			}else{
      				this.$message.error("服务器错误！")
      			}
      		})
      	}else{
	    		this.$message.error( '请将信息填写完整！');
	    	}
      },
      //获取段落
      getArticle:function(){
      	axios.get('/api/aboutus/getpara',{
      		params:{
      			essay_type:'type_structure'
      		}
      	})
      		.then(response=>{
      			let res = response.data;
      			console.log(res);
      			this.tableData = res;
      		})
      },
      //编辑段落
      editArticle:function(){
      	axios.post('/api/aboutus/updatepara',{
      			essay_id:this.editForm.essay_id,
      			essay_type:'type_structure',
      			essay_title:this.editForm.essay_title,
	        	essay_content:this.editForm.essay_content,
      		})
      		.then(response=>{
      			let res = response.data;
//    			console.log(response);
      			if(res.code==1){
      				this.$message.success("修改成功！")
      				document.getElementsByClassName("edit_modal")[0].style.display="none";
      				this.getArticle()
      			}else{
      				this.$message.error("服务器错误！")
      			}
      		})
      },
      //删除段落
      handleDelete(index, row) {
//      console.log(row._id);
        this.$confirm('此操作将永久删除段落, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	axios.delete('/api/aboutus/deletepara',{
        		data:{
	        		essay_id:row._id
        		}
	        }).then(response=>{
	        	let res = response.data;
	        	if(res.code==1){
	        		this.$message.success("删除成功！")
	        		this.getArticle()
	        	}else{
	        		this.$message.error("服务器错误！")
	        	}
	        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      
  },
  created(){
    	this.getArticle()
  },

}
</script>

<style scoped lang="scss">
.addbtn{
	float: left;
	margin-bottom: 20px;
}
.mytable{
	border-radius: 6px;
	box-shadow: 0px 1px 16px 0px #d9d4d4;
}
.mytable thead{
	line-height: 40px;
}

.add_modal{
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
    height: 740px; 
    box-shadow: 0px 0px 40px 3px #D9D9D9;
    border-radius: 8px;
    	span.add_close{
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
    		width: 94%;
				height: 44px;
				margin: 0px 0;
    	}
    	.essay_content{
    		width: 94%;
    		position: relative;
    		left: -10px;
    		top: -26px;
    	}
    	.essay_btn{
    		position: relative;
    		top:-40px
    	}
    	
	}
}
.edit_modal{
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
	.edit_modal_content{
		background-color: white;
    margin: 4% auto; 
    padding: 10px 50px;
    box-sizing: border-box;
    border: none;
    width: 500px;
    height: 740px; 
    box-shadow: 0px 0px 40px 3px #D9D9D9;
    border-radius: 8px;
    	span.edit_close{
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
    	.em_head{
    		width: 94%;
				height: 44px;
				margin-top: 20px;
				label{
					display: block;
					float: left;
					width: 24%;
					height: 44px;
					font-family: "微软雅黑";
					font-size: 16px;
					color: #666666;
				}
				.essay_title{
					width: 76%;
					float: left;
					height: 44px;
					position: relative;
					z-index: 12;
				}
    	}
    	
    	.em_content{
    		width: 94%;
    		height: 100px;
    		position: relative;
    		label{
					display: block;
					float: left;
					width: 24%;
					font-family: "微软雅黑";
					font-size: 16px;
					color: #666666;
				}
				.essay_content{
					width: 76%;
					float: left;
					margin-top: 70px;
				}
    	}
    	.essay_btn{
    		position: relative;
    		top: -30px;
    	}
    	
	}
}
</style>
