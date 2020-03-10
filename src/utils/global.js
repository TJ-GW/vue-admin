import { MessageBox,Message } from 'element-ui';
export default{
    install (Vue,options){
        Vue.prototype.confirm=({content,fn,id})=>{
            MessageBox.confirm(content, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
               
                Message({
                  type: 'success',
                  message: '删除成功!'
                });
                  fn(id)
              }).catch(() => {
                Message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
        }
    }
}