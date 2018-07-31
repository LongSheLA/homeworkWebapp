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
      label="操作" >
    </el-table-column>

  </el-table>

  <el-row  class="sub">
    <el-col :span="20"></el-col>
    <el-col :span="4"><el-button type="primary" @click="onSubmit">确定</el-button></el-col>
  </el-row>

  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[0],tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
  export default {
    name:"AssignDeviceForm",
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
    // created() {
    //   this.getTableData();
    //   // this.toggleSelection(deviceList);
    // },
    mounted(){
      //  console.log("mounted");
      //  let deviceList= this.row.deviceList
      //   this.getTableData();
      //  let d1 = this.tableData;
      //  console.log("@@@@@@@@@@@@@@");
      //  console.log(d1);
      //  console.log("@@@@@@@@@@@@@@");
      //  this.$refs.multipleTable.toggleRowSelection(this.tableData[1])
      //  deviceList.forEach(item =>{
      //    this.$refs.multipleTable.toggleRowSelection(item);
      //  })
      // this.toggleSelection(deviceList)
      console.log("rrrrrrrrrrrrr")
      this.getTableData();
    },
    methods: {
      getTableData(){
           axios.get('/homework/getAllDevice')
          .then(response => {
            this.tableData = response.data.data
            this.toggleSelection([this.tableData[0],this.tableData[2]])
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
        console.log(this.tableData);
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
      },
      onSubmit(){
        let user= this.row;
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
      selectcell(){
        
      }
    }
  }
</script>

<style scoped>

.sub{
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
}

</style>
