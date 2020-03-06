import router from "./index";
import {getToKen}  from "@/utils/app";
const whiteRouter =['/login'];
//路由守卫
router.beforeEach((to,from,next)=>{true
          if(true){
            
            console.log('存在');
            next()
          }else{
            console.log('不存在');

             if(whiteRouter.indexOf(to.path) !==-1){
              next();
              }else
            next('/login');
          }

           
  })