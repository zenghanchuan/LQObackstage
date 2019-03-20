<template>
  <div class="main">
  	<el-table
    :data="tableData"
    class="mytable"
    style="width: 100%;"
    >
    <el-table-column
      label="姓名"
      align="center">
      <template slot-scope="scope">
        <span>{{scope.row.contact_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.contact_email }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      align="center">
      <template slot-scope="scope">
        <span>{{scope.row.contact_phone}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="问题"
      :show-overflow-tooltip="true"
      align="center">
      <template slot-scope="scope">
        <span>{{scope.row.contact_question}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
	import axios from 'axios'
export default {
  name: 'app-contacts',
  data () {
    return {
				tableData: [],

    }
  },
  methods: {
      //获取信息
      getArticle:function(){
      	axios.get('/api/contacts/getcontact')
      		.then(response=>{
      			let res = response.data;
      			console.log(res);
      			this.tableData = res;
      		})
      },
      //删除信息
      handleDelete(index, row) {
//      console.log(row._id);
        this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	axios.delete('/api/contacts/deletecontact',{
        		data:{
	        		contact_id:row._id
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
