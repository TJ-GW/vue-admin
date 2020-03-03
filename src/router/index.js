import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Layout from '@/views/Layout/'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"login",
    hidden:true,
    meta:{
      name:'主页'
    }
  },{
  path:"/login",
    name: "login",
    hidden:true,
    meta:{
      name:'登录'
    },
    component:()=> import("@/views/Login/index.vue")
  },
  {
    path:"/console",
      name: "console",
      redirect:'index',

      meta:{
        name:'控制台'
      },
      component:Layout,
      children:[
        {
          path:"/index",
        name: "index",
        meta:{
          name:'首页'
        },
        component:()=> import("@/views/Console/index.vue"),
        
        }]
    },
  {
    path:"/info",
    name: "info",
    meta:{
        name:'信息管理'
      },
      component:Layout,
      children:[
        {
          path:"/infoIndex",
        name: "infoIndex",
        meta:{
          name:'信息列表'
        },
         component:()=> import("@/views/Info/index.vue")
        },
        {
          path:"/infoCategory",
        name: "infoCategory",
        meta:{
          name:'信息分类'
        },
         component:()=> import("@/views/Info/category.vue")
        }
      ]
    },
    //用户
    {
      path:"/user",
      name: "user",
      meta:{
          name:'用户管理'
        },
        component:Layout,
        children:[
          {
            path:"/userIndex",
          name: "userIndex",
          meta:{
            name:'用户列表'
          },
           component:()=> import("@/views/User/index.vue")
          }
         
        ]
      }
  
];

const router = new VueRouter({
  routes
});

export default router;
