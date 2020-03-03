<template>
    <div id="main-swrap">
      <router-view></router-view>
    </div>
</template>
<script>

export default {
   
}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
    #main-swrap{
        position: fixed;
        left: $nav-Menu;
        top:91px;

        right: 0;
        bottom: 0;
        background-color: antiquewhite;
        border: 30px solid #f7f7f7;
        border-bottom: none;
       
    }
</style>