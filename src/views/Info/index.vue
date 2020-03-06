<template>
<div>
<el-form :inline="true" class="demo-form-inline">
   <el-row :gutter="20">
   <el-col :span="3">
      <el-form-item label="类型：">
     <el-select v-model="value" placeholder="请选择" style="width:100px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
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
 <el-table :data=" tableData " borderstyle="width: 100%">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="800">
    </el-table-column>
    <el-table-column prop="type" label="类型" width="180">
    </el-table-column>
    <el-table-column prop="date" label="日期">
    </el-table-column>
    <el-table-column prop="name" label="管理员">
    </el-table-column>
     <el-table-column label="操作">
        <template slot-scope="">
        <el-button size="mini" type="danger">删除</el-button>
        <el-button  size="mini" type="success" >编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row :gutter="20">
       <el-col :span="12">
           <el-button size="mini" type="danger">全部删除</el-button>
       </el-col>
         <el-col :span="12">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                 :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total,prev,sizes, pager, next"
                :total="1000"
                class="pull-right"
                >
         </el-pagination>
       </el-col>
  </el-row >
  <DiaLog :flag="dialog_info" @close="closeDislog"/>

</div>
</template>
<script>
import DiaLog from './dialog/dialog';
import {reactive ,ref } from '@vue/composition-api';
export default {
  components:{
      DiaLog
  },
   setup(){
     const options=reactive([{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]) 
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
      const search_key=ref('ID');
      //输入框
      const input=ref('');
      //表格
    const  tableData = reactive([{
          title: 'hahah',
          type: '上海市普陀区金沙江路 1517 弄',
          date:'2016-05-02',
          name: '王小虎'
        },
        {
           title: 'hahah',
          type: '上海市普陀区金沙江路 1517 弄',
          date:'2016-05-02',
          name: '王小虎'
        } ,{
            title: 'hahah',
          type: '上海市普陀区金沙江路 1517 弄',
          date:'2016-05-02',
          name: '王小虎'
        }
        ])
        //分页方法
      const handleSizeChange=(val) =>{
        console.log(`每页 ${val} 条`);
      }
      const  handleCurrentChange=(val)=> {
        console.log(`当前页: ${val}`);
      }
      //新增变量
      const  dialog_info=ref(false);
      // 新增关闭方法

      const  closeDislog=()=>{
           dialog_info.value=false
      }
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
          dialog_info
          
         
       }
  }
   
 }
 </script>
 <style lang="scss" scoped>
   
 </style>