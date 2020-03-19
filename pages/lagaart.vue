<template>
  <div>
    <Navbar />
    <Smallbanner :image="require('~/assets/img/lagaart/lagaart3.jpg')" />
    <div>
      <Studio v-for="(studioimage, index) of studioimages" :key="(index)" :image="studioimage.src" />
    </div>
    <Maps height="400" :lon="12.768109" :lat="48.062010" zoom="15" />
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import Navbar from "~/layouts/components/navbar";
import Smallbanner from "~/layouts/components/smallbanner";
import Studio from "~/layouts/components/studio";
import Maps from "~/layouts/components/maps";

export default {
  components: { Navbar, Smallbanner, Studio, Maps },
  data() {
    return {
      studioimages: [
        { src: require("~/assets/img/lagaart/lagaart2.jpg"), text: "" },
        { src: require("~/assets/img/lagaart/lagaart4.jpg"), text: "" },
        { src: require("~/assets/img/lagaart/lagaart1.jpg"), text: "" }
      ]
    };
  }
};
</script>