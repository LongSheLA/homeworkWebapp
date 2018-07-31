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
            <el-col :span="6"><span>用户管理</span> </el-col>
            <el-col :span="6"><el-button size='small' round @click="addUser">新增</el-button></el-col>
          </el-row>
        </el-header>
        
        <el-main>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%;  text-align: left"
              :cell-class-name= "tableCellClassName">
            <el-table-column
                label="用户名称"
                width="180"
                class="cell">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="类型"
                width="180">
                <template slot-scope="scope">
                 <span>{{ scope.row.role }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="部门名称"
              
                width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.departmentName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="科室名称"
                width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.sectionName }}</span>
                </template>
            </el-table-column>

              <el-table-column
                label="手机号"
                width="180">
                <template slot-scope="scope">
                  <span >{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="邮箱"
                width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>

               <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="deviceAuth(scope.$index, scope.row)">分配设备</el-button>
                  </template>
                </el-table-column>
            </el-table>


          
             <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="this.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total='this.totalPage'>
              </el-pagination>  
            </div>

            <el-dialog title="分配设备" :visible.sync="dialogTableVisible" @open="show">
               <el-table
                    ref="myTable"
                    :data="deviceData"
                    tooltip-effect="dark"
                    style="width: 100%;  text-align: left"
                    @selection-change="handleSelectionChange">

                    <el-table-column
                      type="selection"
                      width="55"
                    >
                    </el-table-column>

                    <el-table-column
                      label="设备名称"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.deviceName }}</template>
                    </el-table-column>

                    <el-table-column
                      prop="deviceType"
                      label="设备类型"
                      width="120">
                    </el-table-column>

                    <el-table-column
                      prop="devicePosition"
                      label="设备位置" >
                    </el-table-column>

                    <el-table-column
                      prop="deviceStatus"
                      label="设备状态" >
                    </el-table-column>

                  </el-table>

                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit()">确 定</el-button>
                  </div>
            </el-dialog>

        </el-main>
      </el-container>
</el-container>
  
</template>

<script>
import axios from 'axios'
import AddUser from './addUserForm'
import AssignDeviceForm from './assignDevice'
import vue from 'vue'

export default {
  name: 'User',
    data() {
      return {
        tableData: [],
        deviceData:[],
        page:1,
        size:5,
        currentPage4:1,
        totalPage:0,
        dialogTableVisible:false,
        multipleSelection: [],
        user:null
      }
    },
    created() {
      this.getTableData();
      this.getDeviceData();
    },
    methods: {
      //设置样式
      tableCellClassName: function(row, rowIndex){
        return "cell-style"
      },
      show(){
        console.log("++++++++++++++++++++++")
        // this.toggleSelection([this.deviceData[0]])
          let sl= this.user.deviceList
          let dl =this.deviceData
          console.log(sl)
          console.log(dl)
      
         vue.nextTick(_ =>{
          sl.forEach(s =>{
            this.$refs.myTable.toggleRowSelection(dl.find(d => parseInt(d.id) === parseInt(s.id)),true);
          })
         })
      },
      deviceAuth: function(index, row) {
      this.user = row
      this.dialogTableVisible = true
      }, 
      //分页获取所有用户
      getTableData:function () {
        axios.get('/homework/findAllByPage?page='+this.page+'&size='+ this.size+'&now='+new Date().getTime())
          .then(response => {
            console.log(response)
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

      toggleSelection(rows) {
      console.log(rows)
      console.log("###############")
      if (rows) {
        rows.forEach(row => {
          console.log("999")
          this.$refs.myTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.myTable.clearSelection();
      }
    },

      //获取所有设备
      getDeviceData(){
           axios.get('/homework/getAllDevice')
          .then(response => {
            this.deviceData = response.data.data
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
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },

       onSubmit(){
        let user= this.user;
        user.deviceList = this.multipleSelection;
        axios({
            method: 'post',
            url: '/homework/saveUser',
            data: user
         }).then( (response) => {
            console.log(response);
            this.$notify({
            title: '成功',
            message: '分配设备成功',
          
          });
        })
        .catch((error)=> {
            console.log(error);
            this.$notify.error({
            title: '错误',
            message: '出现点小错误', 
            type: 'success'
          });
        });
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
 .el-table .cell-style{
    text-align: left !important
  }
  .cell{
    text-align: left;
  }
</style>