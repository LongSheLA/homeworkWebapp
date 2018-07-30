<template>
 <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="设备名称">
    <el-input v-model="form.deviceName"></el-input>
  </el-form-item>
    <el-form-item label="设备类型">
     <el-select v-model="form.deviceType" placeholder="请选择活动区域" style="width:310px">
      <el-option label="充电桩" value="充电桩"></el-option>
      <el-option label="环境仓" value="环境仓"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="设备位置">
    <el-input v-model="form.devicePosition"></el-input>
  </el-form-item>
  <el-form-item label="设备状态">
    <el-input v-model="form.deviceStatus"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button>取消</el-button>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios'
export default {
    name:"AddDeviceForm",
       data() {
      return {
        form: {
          deviceName: '',
          deviceType: '',
          devicePosition: '',
          deviceStatus: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
        axios({
            method: 'post',
            url: '/homework/saveDevcie',
            data: this.form
         }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        //  this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      }
    }
    
}
</script>

<style>

</style>

