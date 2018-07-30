<template>

  <el-container style="border: 1px solid #eee">
      <el-aside width="15%" >
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>大作业</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">设备管理</el-menu-item>
              <el-menu-item index="1-2">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: center; font-size: 12px">
          <el-row  type="flex" class="row-bg" justify="center">
            <el-col :span="6"></el-col>
            <el-col :span="6"><span>用户管理</span> </el-col>
            <el-col :span="6"><el-button size='small' round @click="addUser">新增</el-button></el-col>
          </el-row>
        </el-header>
        
        <el-main>
            <el-table
              :data="tableData"
              style="width: 100%">

            <el-table-column
                label="用户名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="类型"
                width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.role }}</el-tag>
                    </div>
                  </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                label="部门名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.departmentName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="科室名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.sectionName }}</span>
                </template>
            </el-table-column>

              <el-table-column
                label="手机号"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="邮箱"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.email }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

             <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.page"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="this.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total='this.totalPage'>
              </el-pagination>  
            </div>

        </el-main>
      </el-container>
</el-container>
  
</template>

<script>
import axios from 'axios'
import AddUser from './addUserForm'

export default {
  name: 'User',
    data() {
      return {
        tableData: [],
        page:1,
        size:1,
        currentPage4:1,
        totalPage:0
      }
    },
    created() {
      this.getTableData()
    },
    methods: {

      handleEdit: function(index, row) {
        console.log(index, row);
      },

      handleDelete:function(index, row) {
        console.log(index, row);
      },

      getTableData:function () {
        axios.get('/homework/findAllByPage?page='+this.page+'&size='+ this.size+'&now='+new Date().getTime())
          .then(response => {
            this.tableData = response.data.data.content
            this.totalPage= response.data.data.totalElements
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          })
      },

      handleSizeChange(val) {
        console.log(val)
        this.page = 1
        this.size = val
        this.getTableData();
      },

      handleCurrentChange(val) {
        this.page = val
        this.getTableData();
      },

      addUser(){
        // const h = this.$createElement;
        this.$msgbox({
          title: '新增用户',
          message: <AddUser/>,
          showConfirmButton: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });

    
      }
    }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .pagination {
    margin-top: 10px;
  }
</style>