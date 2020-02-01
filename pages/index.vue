<template>
  <div>
    <div class="banner">
      <transition-group name="fade" mode="in-out">
        <div v-for="(slide, index) of slides" :key="index" :style="{ backgroundImage: `url(${slide.image})` }" class="background-image" v-show="lastIndex === index"></div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    overflow: hidden;

    .background-image {
      position: absolute;
      background-position: top center;
      background-repeat: no-repeat;
      background-size: cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }


    .fade-enter-active {
      animation: slideimation 5s;
    }


    // .fade-enter-active, .fade-leave-active {
    //   // transition: opacity 2s;
    //   transition: all 2s;
    // }
    // .fade-enter, .fade-leave-to {
    //   opacity: 0;
    // }

    // .fade-leave-active {
    //   transform: scale(1.2);
    // }

    @keyframes slideimation {
      0% { transform: scale(1); }
      60% {  transform: scale(1.25); opacity: 1; }
      100% { transform: scale(1.25);opacity: 0; }
    }


  }
</style>

<script>
export default {
  data() {
    return {
      slides: [
        {image: require('~/assets/img/1.jpg'), text: 'ajkhaksjhsakjhskj'},
        {image: require('~/assets/img/2.jpg'), text: 'ajkhaksjhsakjhskj'},
      ],
      lastIndex: 0,
      intervalID: -1
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.intervalID = setInterval(() => {
        
        let newIndex = this.lastIndex + 1

        if (newIndex >= this.slides.length) {
          this.lastIndex = 0
          return
        }
        
        this.lastIndex = newIndex

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