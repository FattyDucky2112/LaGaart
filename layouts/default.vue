<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>


<style>
  @import url('https://fonts.googleapis.com/css?family=Amatic+SC:700');

  body{
    font-family: 'Amatic SC', cursive;
    font-size: 24px;
  }
</style>


<script>

import Navbar from '~/layouts/components/navbar'

export default {
  components: {Navbar}
  
}
</script>