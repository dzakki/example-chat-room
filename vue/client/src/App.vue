<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>
<script>
  export default {
    created(){
      this.$store.dispatch("checkLogin")
    }
  };
</script>
<style>

</style>
