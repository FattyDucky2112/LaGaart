<template>
  <div>
    <nuxt />
    <Fusser />
  </div>
</template>


<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Amatic+SC:700');
  //@import '@/assets/scss/bootstrap.scss';

  body{
    font-family: 'Amatic SC', cursive;
    font-size: 1.6rem;
  }
</style>


<script>
import Fusser from '~/layouts/components/fusser'

export default {
  components: {Fusser},
  data() {
    return {
    }
  },

}
</script>