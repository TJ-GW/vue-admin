<template>
<div>
<el-form :inline="true" class="demo-form-inline">
   <el-row :gutter="20">
   <el-col :span="3">
      <el-form-item label="分类：">
     <el-select v-model="category_value" placeholder="请选择" style="width:100px">
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
      value-format="yyyy-MM-dd  HH:mm :ss"
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
      :value="item.value"
      :label="item.label">
    </el-option>
  </el-select>
   </el-form-item>
   </el-col>
   <el-col :span="4">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
   </el-col>
   <el-col :span="4">
        <el-button type="danger" @click="search">搜索</el-button>
   </el-col>
   <el-col :span="2">
        <el-button type="danger" class="pull-right" @click="dialog_info=true">新增</el-button>
   </el-col>



</el-row> 
 </el-form>
 <el-table :data=" tableData.item " borderstyle="width: 100%" v-loading="loading"  @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="800">
    </el-table-column>
    <el-table-column prop="categoryId" label="类型" width="180" :formatter="toCategory" >
    </el-table-column>
    <el-table-column prop="createDate" label="日期">
    </el-table-column>
    <el-table-column prop="name" label="管理员">
    </el-table-column>
     <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="delItem(scope)">删除</el-button>
        <el-button  size="mini" type="success" @click="editInfo(scope)">编辑</el-button>
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
  <Edit :flag.sync="editInfoEdit"  :option="options" :id="infoId" @resposeInfo="resposeInfo"/>

</div>
</template>
<script>
import DiaLog from './dialog/dialog';
import Edit from './dialog/edit'
import {GetList,GetCategory,DeleteInfo} from '@/api/news.js';
import {common}  from '@/api/common.js'
// import {getToKen} from '@/utils/app.js';
import {reactive ,ref ,onMounted, computed,watch} from '@vue/composition-api';
export default {
  components:{
      DiaLog,
      Edit
  },
   setup(props,{root}){
     const options=reactive({
       category:[]
     }) 
     const {getInfoCategory,categoryItem}=common();
       const category_value=ref('');
       //事件
      const value1=ref('');
      //关键字
      const searchOption=reactive([{
         value:'id',
         label:'ID'
      },{
         value:'title',
         label:'标题'
      }
      ])
      //加载状态
      const loading=ref(true);
      //总条数
      const total=ref(0);
      const search_key=ref('id');
      //输入框
      const input=ref('');
      const infoId=ref('');
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
      //编辑变量
     
      const   editInfoEdit=ref(false)


      // 新增关闭方法

      const  closeDislog=()=>{
           dialog_info.value=false
           editInfo.value=false
           getlist()
      }
      //列表数据
      const list=reactive({
        id:[]
      })
      //删除提示框
      const delItem=(scoped)=>{
        
        const ID=scoped.row.id
         list.id=[ID]
          
         root.confirm({
           content:'是否删除该条记录！',
           id:list,
           fn: confirmDelete

        
         })
        
      }
      const deleteAll=()=>{
        
         root.confirm({
           content:'是否删除全部内容！',
           id:list,
           fn: confirmDelete
         })
      }
      const confirmDelete=value=>{
        DeleteInfo(value).then(Response=>{
        
          getlist()
        })
      }
      //多选方法
      const handleSelectionChange=val=>{

        let data=val.map(item=>item.id)
           list.id=data
      }
      const category_name=ref('');
      //格式化类型
      const toCategory=(row)=>{
       
        let categoryId=row.categoryId
          
        let  category =options.category.filter(item=>item.id==row.categoryId)[0]
       
        if(!category){
          return''
        }
       return category.category_name
      // return category.category_name
       
      }
     
     const getCategory=()=>{
          getInfoCategory()
       
          }

       //时间转换
        const formatTime=(now)=>{
           let  year=now.getFullYear(); 
           let  month=now.getMonth()+1; 
           let  date=now.getDate(); 
           let  hour=now.getHours(); 
           let  minute=now.getMinutes(); 
           let  second=now.getSeconds(); 
     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
        }
      const getlist=()=>{
        
        let resdata=formatData()
       GetList(resdata).then(Response=>{
          let data=Response.data.data
        
          data.data.forEach((item)=>{
            let now=new Date(parseInt(item.createDate)*1000);
                item.createDate=formatTime(now)
          })
        tableData.item=data.data
        
          total.value=data.total
          loading.value=false
      }).catch(error=>{
          loading.value=false
      })}
      //格式化搜索数据
      const formatData=()=>{
         
            let res={
             pageNumber:data.pageNumber,
             pageSize: data.pageSize
            }
          
        //类型
     
        if(category_value.value){
               
              res.categoryId=category_value.value

        }
        //日期
        if(value1.value){
         res.startTiem=value1.value[0]
         res.endTime=value1.value[1]
        }
          //关键字
        if(input.value){
          res[search_key.value]=input.value
        }
        return res
      }
      //搜索
      const search=()=>{
      
       console.log(formatData())
        getlist()
        
      }
      const edit=reactive({
        item:[]
      })
      //编辑方法
    const editInfo=(scope)=>{
    
          edit.item=scope.row
     let ID=scope.row.id;
         infoId.value=ID;
      editInfoEdit.value=true
    }
    const resposeInfo=(val)=>{
         let data=edit.item
         console.log(data);
        
        for(let data in edit.item ){
          edit.item[data]=val[data]
        }
      
    }
     
     watch(()=> categoryItem.item,(value)=>{
       
     
       options.category=categoryItem.item} )
      //请求数据
        onMounted(()=>{
            getCategory()
            getlist()
        })
       return {
          options,
          category_value,
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
          total,
          loading,
          toCategory,
          handleSelectionChange,
          search,
          editInfo,
          editInfoEdit,
          infoId,
          resposeInfo
         
         
       }
  }
   
 }
 </script>
 <style lang="scss" scoped>
   
 </style>