<template>
  <div>


<el-dialog  title="收货地址"  :visible.sync="dialog_info_flag" @close="close" >
  11111
</el-dialog>
  </div>



</template>
<script>
  export default {
    
    data() {
      return {
        dialog_info_flag: false,
     form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
        }
      }
    ,
    props:{
            flag:{
                type:Boolean,
                defalut:false
            }}
            ,
    watch:{
        flag:function(newValue,oldValue){
             
              this.dialog_info_flag=newValue
        }
          
         
    },
    methods:{
        close(){
               this.dialog_info_flag=false;
                this.$emit('close',false)
        }
    }
  }
  
</script>