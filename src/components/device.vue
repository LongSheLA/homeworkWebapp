<template>

  <el-container style="border: 1px solid #eee">
      <el-aside width="15%" >
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>大作业</template>
            <el-menu-item-group>
              <router-link to="/device"><el-menu-item index="1-1">设备管理</el-menu-item></router-link>
              <router-link to="/user"><el-menu-item index="1-2">用户管理</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: center; font-size: 12px">
          <el-row  type="flex" class="row-bg" justify="center">
            <el-col :span="6"></el-col>
            <el-col :span="6"><span>设备管理</span> </el-col>
            <el-col :span="6"><el-button size='small' round @click="addUser">新增</el-button></el-col>
          </el-row>
     
        </el-header>
        
        <el-main>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%;  text-align: left">

              <el-table-column
                label="设备名称"
                width="220">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.deviceName }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="设备类型"
                width="220">
                <template slot-scope="scope">
                   <span style="margin-left: 10px">{{ scope.row.deviceType }}</span>
                </template>
              </el-table-column>

            <el-table-column
                label="设备位置"
                width="250">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.devicePosition }}</span>
                </template>
              </el-table-column>

               <el-table-column
                label="设备状态"
                width="220">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.deviceStatus }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="220">
                <template slot-scope="scope">
                 <el-button
                    size="mini"
                    @click="mangentUser(scope.$index, scope.row)">查看管理用户</el-button>
                </template>
              </el-table-column>
            </el-table>

             <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.currentPage4"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="this.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total='this.totalPage'>
              </el-pagination>          
          </div>

          <el-dialog title="管理用户" :visible.sync="dialogTableVisible" >
               <el-table
                ref="multipleTable"
                :data="userData"
                tooltip-effect="dark"
                style="width: 100%; text-align: left"
              >

                <el-table-column
                  label="用户名称"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>

                <el-table-column
                  prop="role"
                  label="用户类型"
                  width="120">
                </el-table-column>

                <el-table-column
                  prop="departmentName"
                  label="部门名称" >
                </el-table-column>

                <el-table-column
                  prop="phone"
                  label="手机" >
                </el-table-column>

                <el-table-column
                  prop="email"
                  label="邮箱" >
                </el-table-column>
              </el-table>
               
            </el-dialog>
        </el-main>
      </el-container>
</el-container>
  
</template>

<script>
import axios from 'axios'
import AddDevice from './addDeviceForm'
import DeviceAuth from './deviceAuth'

export default {
  name: 'User',
    data() {
      return {
        tableData: [],
        page:1,
        size:5,
        currentPage4:1,
        dialogTableVisible:false,
        totalPage:0,
        userlist:[],
        userData:[]
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
        axios.get('/homework/getAllDevicePagation?page='+this.page+'&size='+ this.size)
          .then(response => {
            this.tableData = response.data.data.content
            this.totalPage = response.data.data.totalElements
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function(){
            // always executed
          })
      },
       handleSizeChange(val) {
        this.size = val
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.currentPage4 = val
        this.getTableData();
      },
      addUser(){
        this.$msgbox({
          title: '新增用户',
          message: <AddDevice/>,
          showConfirmButton: false,
        })
      },  

      mangentUser(index, row){
        console.log(row)
        this.userData = row.userList;
        this.dialogTableVisible = true
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
    padding: 10px;
  }
  .pagination {
    margin-top: 10px;
  }
</style>