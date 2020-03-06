import {Login} from '@/api/login.js'
import { setUserName,setToKen,getUserName,removeToKen } from "@/utils/app";
const state={
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) ||false,
    Token:'',
    UserName:getUserName()||''
}

const mutations={
  SET_COLLAPSE(state){
               
    state.isCollapse=!state.isCollapse;
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  
  },
  SET_TOKEN(state,value){
      state.Token=value
  },
  SET_USERNAME(state,value){
    state.UserName=value
  }

}
const actions={
  login(content,repuestData){
    return new Promise((resolve,reject)=>{
            //接口
            Login(repuestData).then((response)=>{
              console.log(response);
              let data=response.data.data;
              content.commit('SET_TOKEN',data.token) 
              content.commit('SET_USERNAME',data.username)
              setToKen(data.token);
              setUserName(data.username)
                resolve(response)
            }).catch((error)=>{
                reject(error)
            })
    })
},
  exit(){
    return new Promise(()=>{
          removeToKen();
     })
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,

};