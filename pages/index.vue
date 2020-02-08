<template>
  <div>

    <Banner />
    <Navbar />

    <Imagemenu :image="require('~/assets/img/kleider/kleid1.jpg')">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ratione deleniti dolore provident architecto laudantium aliquam veniam repellat, rem nostrum rerum minus commodi adipisci quae quibusdam repudiandae, quisquam sed consectetur nulla iste, velit debitis natus. Sed enim, omnis blanditiis dolorem, quisquam iste odio architecto est veritatis quam nam labore ex.
      <nuxt-link to="/jdakjsd" class="btn btn-secondary btn-lg">drück mich</nuxt-link>
    </Imagemenu>

    <Imagemenu :withBackground="true" :mirrored="true" :image="require('~/assets/img/kleider/kleid2.jpg')">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ratione deleniti dolore provident architecto laudantium aliquam veniam repellat, rem nostrum rerum minus commodi adipisci quae quibusdam repudiandae, quisquam sed consectetur nulla iste, velit debitis natus. Sed enim, omnis blanditiis dolorem, quisquam iste odio architecto est veritatis quam nam labore ex.
      <nuxt-link to="/jdakjsd" class="btn btn-secondary btn-lg">drück mich</nuxt-link>
    </Imagemenu>

    <Imagemenu :image="require('~/assets/img/kleider/kleid3.jpg')">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ratione deleniti dolore provident architecto laudantium aliquam veniam repellat, rem nostrum rerum minus commodi adipisci quae quibusdam repudiandae, quisquam sed consectetur nulla iste, velit debitis natus. Sed enim, omnis blanditiis dolorem, quisquam iste odio architecto est veritatis quam nam labore ex.
      <nuxt-link to="/jdakjsd" class="btn btn-secondary btn-lg">drück mich</nuxt-link>
    </Imagemenu>

    <Imagemenu :withBackground="true" :mirrored="true" :image="require('~/assets/img/kleider/kleid5.jpg')">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ratione deleniti dolore provident architecto laudantium aliquam veniam repellat, rem nostrum rerum minus commodi adipisci quae quibusdam repudiandae, quisquam sed consectetur nulla iste, velit debitis natus. Sed enim, omnis blanditiis dolorem, quisquam iste odio architecto est veritatis quam nam labore ex.
      <nuxt-link to="/jdakjsd" class="btn btn-secondary btn-lg">drück mich</nuxt-link>
    </Imagemenu>
  </div>
</template>

<style lang="scss" scoped>
  

</style>

<script>
import Navbar from '~/layouts/components/navbar'
import Banner from '~/layouts/components/banner'
import Imagemenu from '~/layouts/components/imagemenu'
export default {
  components: {Navbar,Banner,Imagemenu},
  data() {
    return {
    }
  },

}
</script>