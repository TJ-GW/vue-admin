<template>
<div>
<el-form :inline="true" class="demo-form-inline">
   <el-row :gutter="20">
   <el-col :span="3">
      <el-form-item label="分类：">
     <el-select v-model="value" placeholder="请选择" style="width:100px">
    <el-option
      v-for="item in options.category"
      :key="item.id"
      :label="item.category_name"
      :value="item.id">
    </el-option>
  </el-select>
   </el-form-item>
 </el-col>
  <el-col :span="8">
     <el-form-item label="日期：">
        <el-date-picker
        v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
      </el-form-item>
     </el-col>
  <el-col :span="3"> 
     <el-form-item label="关键字：">
     <el-select v-model="search_key"  style="width:80px">
    <el-option
      v-for="item in searchOption"
      :key="item.value"
      :label="item.label"
      :value="item.lable">
    </el-option>
  </el-select>
   </el-form-item>
   </el-col>
   <el-col :span="4">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
   </el-col>
   <el-col :span="4">
        <el-button type="danger">搜索</el-button>
   </el-col>
   <el-col :span="2">
        <el-button type="danger" class="pull-right" @click="dialog_info=true">新增</el-button>
   </el-col>



</el-row> 
 </el-form>
 <el-table :data=" tableData.item " borderstyle="width: 100%">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="800">
    </el-table-column>
    <el-table-column prop="categoryId" label="类型" width="180">
    </el-table-column>
    <el-table-column prop="createDate" label="日期">
    </el-table-column>
    <el-table-column prop="name" label="管理员">
    </el-table-column>
     <el-table-column label="操作">
        <template slot-scope="">
        <el-button size="mini" type="danger" @click="delItem">删除</el-button>
        <el-button  size="mini" type="success" >编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row :gutter="20">
       <el-col :span="12">
           <el-button size="mini" type="danger" @click="deleteAll">全部删除</el-button>
       </el-col>
         <el-col :span="12">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                 :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total,prev,sizes, pager, next"
                :total="total"
                class="pull-right"
                >
         </el-pagination>
       </el-col>
  </el-row >
  <DiaLog :flag="dialog_info" @close="closeDislog" :option="options"/>

</div>
</template>
<script>
import DiaLog from './dialog/dialog';
import {GetList,GetCategory} from '@/api/news.js';
import {common}  from '@/api/common.js'
// import {getToKen} from '@/utils/app.js';
import {reactive ,ref ,onMounted, computed,watch} from '@vue/composition-api';
export default {
  components:{
      DiaLog
  },
   setup(props,{root}){
     const options=reactive({
       category:[]
     }) 
     const {getInfoCategory,categoryItem}=common();
       const value=ref('');
       //事件
      const value1=ref('');
      //关键字
      const searchOption=reactive([{
         value:'id',
         label:'ID'
      },{
         value:'菜单',
         label:'菜单'
      }
      ])
      //总条数
      const total=ref(0);
      const search_key=ref('ID');
      //输入框
      const input=ref('');
      //表格
    const  tableData = reactive({
      item:[]
    }
      
    )
    //data数据
    const data=reactive({
          categoryId: '',
          startTiem:'',
          endTime: '',
          title: '',
          id: '',
          pageNumber: 1,
          pageSize: 10
    })
        //分页方法
      const handleSizeChange=(val) =>{
       
        data.pageSize=val 
        getlist()
     
      }
      const  handleCurrentChange=(val)=> {
        data.pageNumber=val
        getlist()
      
      }
      //新增变量
      const  dialog_info=ref(false);
      // 新增关闭方法

      const  closeDislog=()=>{
           dialog_info.value=false
      }
      //删除提示框
      const delItem=()=>{
         root.confirm({
           content:'是否删除该条记录！'
         })
      }
      const deleteAll=()=>{
         root.confirm({
           content:'是否删除全部内容！'
         })
      }
     
     const getCategory=()=>{
          getInfoCategory()
       
          }
      const getlist=()=>{
        
        //时间转换
        const formatDate=(now)=>{
           let  year=now.getFullYear(); 
           let  month=now.getMonth()+1; 
           let  date=now.getDate(); 
           let  hour=now.getHours(); 
           let  minute=now.getMinutes(); 
           let  second=now.getSeconds(); 
     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
        }
       GetList(data).then(Response=>{
          let data=Response.data.data
          data.data.forEach((item)=>{
            let now=new Date(parseInt(item.createDate)*1000);
                item.createDate=formatDate(now)
          })
        tableData.item=data.data
        
          total.value=data.total
      }).catch(error=>{

      })}
     watch(()=> categoryItem.item,(value)=>{
       
     
       options.category=categoryItem.item} )
      //请求数据
        onMounted(()=>{
            getCategory()
            getlist()
        })
       return {
          options,
          value,
          value1,
          search_key,
          searchOption,
          input,
          tableData,
          handleSizeChange,
          handleCurrentChange,
          closeDislog,
          dialog_info,
          delItem,
          deleteAll,
          total
         
         
       }
  }
   
 }
 </script>
 <style lang="scss" scoped>
   
 </style>