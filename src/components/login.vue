<template>
  <div class="login_container">


     <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="width:400px">
       
        <div class="title-container">
          <h2 class="title">HOMEWORK</h2>
        </div>

        <el-form-item label="用户名：" prop="userName">
          <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm2.age"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
        
  </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios'

export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.password !== '') {
            this.$refs.ruleForm2.validateField('password');
          }
          callback();
        }
      };
      return {
        ruleForm2: {
          userName: '',
          password: '',
        },
        rules2: {
          pass: [
            {  required: true, message: '请输入登录名称', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm2);
         axios({
            method: 'post',
            url: '/homework/login',
            data:this.ruleForm2
         }).then((response) => {
            console.log(response);
            if(response.data.code == "0"){
              this.$router.push({ path: '/user' })
            }else{
               this.$message.error((response.data.errorMessage));
            }
        })
        .catch(function (error) {
            console.log(error);
        });



          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .login_container{
   width: 100%;
   height: 750px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color:grey;
 }

 .title-container{
   text-align: center;
   margin-left: 70PX;
 }
</style>
