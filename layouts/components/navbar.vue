<template>
  <nav class="navbar navbar-expand-lg">
    <nuxt-link class="navbar-brand" to="/"><img src="~/assets/img/logo.png" style="height: 100px;" alt="Home"></nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <nuxt-link v-for="(navItem, index) of navItems" :key="index" class="nav-item nav-link " :to="navItem.link">{{navItem.name}}</nuxt-link>
      </div>
    </div>
  </nav>
</template>


<style lang="scss" scoped>
    .navbar {
      background-color: rgba(255,255,255, 0);
      z-index: 99999;
    }
</style>

<script>
export default {
  data(){
    return{
      navItems:[
        {name: "Gallerie", link:"/"},
        {name: "LaGaart", link:"/lagaart"},
        {name: "Aktuelles", link:"/aktuelles"},
        {name: "Info", link:"/info"},
      ]
    }
  }
}
</script>