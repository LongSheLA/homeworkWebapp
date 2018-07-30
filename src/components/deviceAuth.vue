<template>
<div>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">

    <el-table-column
      type="selection"
      width="55"
     >
    </el-table-column>

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

  <el-row>
    <el-button>取消</el-button>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </el-row>

  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>

</div>
  
</template>

<script>
import axios from 'axios'
  export default {
    name:"DeviceAuth",
     props:{
        row:{
                type:Object,
                required: true,
            }
    },

    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
     created() {
      this.getTableData()
    },
    methods: {
      getTableData(){
           axios.get('/homework/getAllUser')
          .then(response => {
            this.tableData = response.data.data
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
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      onSubmit(){
        console.log(this.multipleSelection);
        let device= this.row;
        device.userList = this.multipleSelection;
        console.log(device)
        axios({
            method: 'post',
            url: '/homework/saveDevcie',
            data: device
         }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    }
  }
</script>