<template>
 <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="用户类型">
     <el-select v-model="form.role" placeholder="请选择活动区域" style="width:310px">
      <el-option label="管理员" value="admin"></el-option>
      <el-option label="普通用户" value="user"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="部门名称">
    <el-input v-model="form.departmentName"></el-input>
  </el-form-item>
  <el-form-item label="科室名称">
    <el-input v-model="form.sectionName"></el-input>
  </el-form-item>
  <el-form-item 
     label="手机号"
     >
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="邮箱"
   :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
>
    <el-input v-model="form.email"></el-input>
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
    name:"AddUserForm",
       data() {
      return {
        form: {
          name: '',
          role: '',
          departmentName: '',
          sectionName: '',
          phone: "",
          email: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
        axios({
            method: 'post',
            url: '/homework/saveUser',
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

