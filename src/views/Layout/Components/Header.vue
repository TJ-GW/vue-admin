<template>
    <div id="header-wrap">
        <div class="pull-left header-icon"  @click="navMenuState"><svg-icon  iconClass="menu" className="menu"></svg-icon></div>
        <div class="pull-right ">
        <div class="user-info pull-left">
            <img src="../../../assets/images/face.jpg" alt="">
        管理员    
        </div>    
         <div class="pull-left header-icon"><svg-icon iconClass="exit" className="exit"></svg-icon></div>
        </div>
    </div>
</template>
<script>
// import {reactive ,ref, isRef,toRefs,onMounted } from '@vue/composition-api';
export default {
    name:'layoutHeader',
    setup(props ,{ root }){
        const navMenuState=()=>{
            // console.log('x');
            
            root.$store.commit('SET_COLLAPSE');
        
        }

        return {
        navMenuState
    }
    }

   
}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
    #header-wrap{
        position: fixed;
        left: $navMenu;
        right: 0;
        top: 0;
        height: 75px;
        background-color:#fff;
       @include webkit(box-shadow,0 3px 16px rgba(0,0,0,.1));
        @include webkit(transition, all .3s ease 0s);
       line-height: 75px;
        
    }
    .open{
       #header-wrap{
           left: $navMenu;
       } 
    } 
     .close{
       #header-wrap{
           left: $navMenuMin;
       } 
    } 
    .header-icon{
            padding: 0 32px;
            svg{
                font-size: 25px;
                margin-bottom: -8px;
                cursor: pointer;
            }
    }
    .user-info{
        height: 100%;
        padding:0 32px;
        border-right: 1px solid #111416;
        + .header-icon{
            padding:0 28px;
        }
    }
    img{
        border-radius: 50%;
        height: 40px;
        width: 40px;
        display: inline-block;
        margin-bottom: -12px;
        margin-right: 18px;
       
    }
</style>