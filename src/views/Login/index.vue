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
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="item-form">
          <label for="password">密码</label>

          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item  prop="passwords" class="item-form" v-if="model==='register'">
          <label for="passwords">重复密码</label>

          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="10">
  <el-col  :span="15"><div class="grid-content bg-purple"><el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input></div></el-col>
  <el-col :span="9"><div class="grid-content bg-purple">
   <el-button type="success" class="block" @click="getSms" :disabled="btnCodeStatus.status">{{btnCodeStatus.text}}</el-button>
    </div></el-col>
  
</el-row>

          
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="block login-btn" :disabled="isTrue">{{model=="login"?"登录":"注册"}}</el-button>
        
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import sha1 from 'js-sha1'
import { stripscript ,validateEmail,validateVCode,validatePass} from '@/utils/ualidate.js'
import {reactive ,ref, isRef,toRefs,onMounted } from '@vue/composition-api' 
import {GetSms,Register,Login} from '@/api/login.js'
export default {
  name: "login",
  setup(props,context){
       
    let validateCode = (rule, value, callback) => {
        
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(validateVCode(value)){
            return callback(new Error('验证码为6位的数字加字母'));
        }
        else {
              callback();
            }
        }
        
     
      let validateUsername = (rule, value, callback) => {
       
        if (value === '') {
         
          callback(new Error('请输入账号'));
        }else if( validateEmail(value)){
            callback(new Error('输入的邮箱格式不正确'));
        }else {
          
          callback();
        }
      };
       let validatePassword = (rule, value, callback) => {
        //过滤后的数据
        ruleForm.password=stripscript(value)
        value=ruleForm.password
      
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
        ruleForm.passwords=stripscript(value)
        value=ruleForm.passwords
      
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('至少6-20个字符，数字+密码'));
        } else if(ruleForm.password!=value){
         
            callback(new Error('前后输入的密码不一致'));
        }
        else {
          callback();
        }
      };
      
      //这里面放置data数据，生命周期，自定义的函数
      const menuTab=reactive([
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ])
      //模块值
      const model=ref('login')
      const  isTrue=ref(true)
      //获取验证码的状态
      const btnCodeStatus=reactive({
        status:false,
        text:'获取验证码'
      })
      //倒计时
      const timer=ref(null);
    
      
     
      
     const  ruleForm=reactive(
       {
          username: '',
          password: '',
           code: '',
          passwords: '',
        }
     ) 
    const rules=reactive(
      {
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
    ) 
      //声明函数
     const clickCandler=((item )=>{
        menuTab.forEach(elem => {
       
        elem.current = false;
      });
     //重置表单 
      context.refs['ruleForm'].resetFields()
      item.current = true;
      if(item.txt=="登录"){
        model.value="login"
      }else{
        model.value="register"
      }
     })
    //表单方法
    const submitForm=( formName => {
       
     
        context.refs[formName].validate((valid) => {
        
          if (valid) {
            let requestData={
              username:ruleForm.username,
              password:ruleForm.password,
              code:ruleForm.code,
              module:model.value
            }
            model.value=='login'?login(requestData):register(requestData);
              
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      })
      /**
       * 登录
       */
      const login=(requestData)=>{
              
        context.root.$store.dispatch('app/login',requestData).then(response=>{
                 context.root.$router.push({ 
               name:'console'
              })
        }).catch


        // Login(requestData).then(Response=>{
        //       // console.log(Response)
        //        clearcountDown();
        //       context.root.$router.push({ 
        //         name:'console'
        //       })
        //       }).catch(error=>{

        //       })
      }
      /**
       * 注册
       */
      const register=(requestData)=>{
        Register(requestData).then(Response=>{
                   let data=Response.data
         
               context.root.$message({
              message:data.message,
              type:'success'
            })
                
               clearcountDown();
               clickCandler(menuTab[0])
              }).catch(error=>{

              })
      }
      //倒计时
      const countDown=((number)=>{
        //判断定时器是否存在，存在则删除
        if(timer.value){
          clearInterval(timer.value);
        }
        let time=number;
        timer.value=setInterval(()=>{
          time--;
          if(time==0){
            clearInterval(timer.value);
             btnCodeStatus.status=false
             btnCodeStatus.text='再次发送';

          }else{
               btnCodeStatus.text=`倒计时${time}秒`;
          }
       
        },1000)
      })
      //清理倒计时
      const  clearcountDown=(()=>{
        //清理定时器
         clearInterval(timer.value);
         btnCodeStatus.status=false
         btnCodeStatus.text='获取验证码';
      })
      //获取验证码
      const  getSms=(()=>{
       
      //判断前面数据是否填写正确
      if(ruleForm.username==""){
       
     
          context.root.$message.error('邮箱不能为空');
        
         return false;
      }
      if(validateEmail(ruleForm.username)){
        context.root.$message.error('邮箱格式有误请重新输入！');
        return false;
      }
       let requestData={
         username:ruleForm.username,
         module:model.value
       }
       btnCodeStatus.status=true
       btnCodeStatus.text='发送中';
       GetSms( requestData).then(Response=>{
           
            let data=Response.data
         
           context.root.$message({
              message:data.message,
              type:'success'
            })
            //启用登录或注册
             isTrue.value=false;
             //倒计时调用
             countDown(10);
        }).catch(error=>{
          
        })
        
      })
    
      //挂在完成后
      onMounted(()=>{})
      return{
        menuTab,
        model,
        clickCandler,
        submitForm,
        ruleForm,
        rules,
        getSms,
        isTrue,
        btnCodeStatus,
        countDown,
        clearcountDown
    

      }
    }
   }
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
