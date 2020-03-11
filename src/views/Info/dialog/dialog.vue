<template>
  <div>


<el-dialog  title="新增"  :visible.sync="dialog_info_flag" @close="close"  width="580px" @opened="category">
  <el-form :model="form" ref="form">
    <el-form-item label="类别：" :label-width="formLabelWidth" prop="category"> 
      <el-select v-model="form.category"  placeholder="请选择活动区域">
        <el-option v-for="item in categoryItem.item" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
      
      </el-select>
    </el-form-item>
    <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题" ></el-input>
    </el-form-item>
     <el-form-item label="概况：" :label-width="formLabelWidth" prop="content">
      <el-input type="textarea" v-model="form.content"  placeholder="请输入内容" ></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog_info_flag= false">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="submit">确 定</el-button>
  </div>
</el-dialog>
  </div>



</template>
<script>
import {reactive ,ref, isRef,toRefs,onMounted, computed ,watch} from '@vue/composition-api';
import {AddInfo} from '@/api/news.js'
  export default {
    name:'dialogInfo',
    props:{
            flag:{
                type:Boolean,
                defalut:false
            },
            option:{
              type:Object,
              defalut:()=>{}
            }

            }
            ,
    setup(props,{emit,root,refs}){
      const dialog_info_flag=ref(false);
    
      const form =reactive({
          title: '',
          content: '',
          category: '',
          
        });
      //按钮加载状态
      const loading=ref(false);
      const  formLabelWidth=ref('70px');
      const  categoryItem=reactive({
        item:[]
      })
      //  refs['form'].resetFields(); 
      const close=()=>{
        dialog_info_flag.value=false;
         refs['form'].resetFields(); 
        emit('close',false)
      }
      const category=()=>{
         categoryItem.item=props.option.category
      }
     const submit=()=>{
        
      
        loading.value=true;
       
       let data={
           category: form.category,
           title: form.title,
           content: form.content,
      }
       AddInfo(data).then(Response=>{
         root.$message({
           message:Response.data.message,
           type:'success'
         })
         loading.value=false;
         //重置表单
        //  root.$nextTick();
       refs['form'].resetFields(); 
       //确认关闭
       dialog_info_flag.value= false 
       }).catch(error=>{
         loading.value=false;
       })
     }
      watch(()=>dialog_info_flag.value=props.flag)


      return{
         dialog_info_flag,
         form,
         formLabelWidth,
         close ,
          category,
        categoryItem,
        submit,
        loading,
   
      
    
      }
    }
    
    
   
  
  }
  
</script>