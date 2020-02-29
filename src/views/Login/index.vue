<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current':item.current}"
          v-for=" item  in menuTab"
          :key="item.id"
          @click="clickCandler(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item  prop="username" class="item-form">
          <label for="">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="item-form">
          <label for="">密码</label>

          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item  prop="passwords" class="item-form" v-if="model==='register'">
          <label for="">重复密码</label>

          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="item-form">
          <label for="">验证码</label>
          <el-row :gutter="10">
  <el-col :span="15"><div class="grid-content bg-purple"><el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input></div></el-col>
  <el-col :span="9"><div class="grid-content bg-purple">
   <el-button type="success" class="block">获取验证码</el-button>
    </div></el-col>
  
</el-row>

          
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="block login-btn">提交</el-button>
        
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript ,validateEmail,validateVCode,validatePass} from '@/utils/ualidate.js'
export default {
  name: "login",
   data() {
     var validateCode = (rule, value, callback) => {
        
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(validateVCode(value)){
            return callback(new Error('验证码为6位的数字加字母'));
        }
        else {
              callback();
            }
        }
        
     
      var validateUsername = (rule, value, callback) => {
       
        if (value === '') {
         
          callback(new Error('请输入账号'));
        }else if( validateEmail(value)){
            callback(new Error('输入的邮箱格式不正确'));
        }else {
          
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        //过滤后的数据
        this.ruleForm.password=stripscript(value)
        value=this.ruleForm.password
      
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('至少6-20个字符，数字+密码'));
        } else {
          callback();
        }
      };
      //重复密码
      var validatePasswords = (rule, value, callback) => {
        //过滤后的数据
        this.ruleForm.passwords=stripscript(value)
        value=this.ruleForm.passwords
      
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('至少6-20个字符，数字+密码'));
        } else if(this.ruleForm.password!=value){
         
            callback(new Error('前后输入的密码不一致'));
        }
        else {
          callback();
        }
      };
    return {
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      //模块值
      model:'login',
      // 表单的数据
      ruleForm: {
          username: '',
          password: '',
           code: '',
          passwords: '',
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
           passwords: [
            { validator: validatePasswords, trigger: 'blur' }
          ]
    }
  }
  },
  methods: {
    clickCandler(item) {
      this.menuTab.forEach(elem => {
       
        elem.current = false;
      });
      item.current = true;
      if(item.txt=="登录"){
        this.model="login"
      }else{
         this.model="register"
      }
    },
    //表单方法
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
     
    
  }
};
</script>
// scoped 让样式只对当前页面生效
<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 330px;
  height: 400px;
  position: absolute;
  left:50%;
  top: 50%;
  margin-left: -165px;
  margin-top: -200px;
 
  .menu-tab{
    text-align: center;
  }
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .login-form{
    margin-top:29px;
    label{
     display: block;
    color: #fff;
    margin-bottom: 3px;
    }
    .item-form{
      margin-bottom: 13px;
    }
   
  }
}
.block{
  display: block;
  width: 100%;
}
.login-btn{
  margin-top: 19px;
}
</style>
