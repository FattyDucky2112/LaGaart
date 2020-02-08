<template>
  <div class="banner">
      <div v-for="(slide, index) of banners" :key="`item-${index}`" :style="{ backgroundImage: `url(${slide.image})` }" class="preload"></div>
      <transition-group appear name="fade">
        <div v-for="(slide, index) of banners" :key="`item-${index}`" :style="{ backgroundImage: `url(${slide.image})` }" class="background-image" v-if="currentIndex === index"></div>
      </transition-group>
    </div>
</template>

<style lang="scss" scoped>
  .banner {
    position: relative;
    width: 100%;
    height: 87vh;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
// background: linear-gradient(0deg, rgba(255,255,255,0.9808298319327731) 10%, rgba(164,164,164,0.4374124649859944) 38%, rgba(170,170,170,0.49343487394957986) 86%, rgba(0,0,0,0.8827906162464986) 100%);    
    }
    
    .preload {
      display: none;
    }


    $bg-scale: 1.2;

    .background-image {
      position: absolute;
      background-position: top center;
      background-repeat: no-repeat;
      background-size: cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scale($bg-scale);
    }

    .fade-enter-active, .fade-leave-active {
      transition: all 9s linear, opacity 2.5s linear;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .fade-enter {
      transform: scale(1);
    }

    .fade-enter-to {
      transform: scale($bg-scale);
      opacity: 1;
    }

   
  }
</style>


<script>
export default {
  data() {
    return{
      banners: [
        {image: require('~/assets/img/banner/5.jpg'), text: 'ajkhaksjhsakjhskj'},
        {image: require('~/assets/img/banner/4.jpg'), text: 'ajkhaksjhsakj3333hskj'},
        {image: require('~/assets/img/banner/1.jpg'), text: 'ajkhaksjhsakj3333hskj'},
        {image: require('~/assets/img/banner/2.jpg'), text: 'ajkhaksjhsakj3333hskj'},
        {image: require('~/assets/img/banner/3.jpg'), text: 'ajkhaksjhsakj3333hskj'},
      ],

      currentIndex: 0,
      intervalID: -1,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.intervalID = setInterval(() => {
        
        let newIndex = this.currentIndex + 1

        if (newIndex >= this.banners.length) {
          this.currentIndex = 0
          return
        }
        
        this.currentIndex = newIndex

      }, 8000)
    })
  },
  beforeDestroy() {
    if (this.intervalID > 0) {
      clearInterval(this.intervalID)
      this.intervalID = -1
    }
  }
}
</script>
