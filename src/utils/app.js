import cookie from "cookie_js";
export function getToKen(){
    return cookie.get('admin_toKen')    
}
export function setToKen(toKen){
   return cookie.set('admin_toKen',toKen)    
}
export function removeToKen(){
    return cookie.remove('admin_toKen')    
}
export function setUserName(value){
    return cookie.set('username',value)    
}
export function getUserName(){
    return cookie.get('username')    
}
export function removeUserName(){
    return cookie.remove('username')    
}