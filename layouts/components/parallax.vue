<template>
  <div class="parallax" ref="parallax" :style="{ height }">
    <img :src="image" ref="image" :style="{ bottom }" />
    <div class="content-wrapper">
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.parallax {
  position: relative;
  overflow: hidden;

  > img {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: -1;
  }

  > .content-wrapper {
    display: table;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    > .content {
      text-align: center;
      display: table-cell;
      vertical-align: middle;
    }
  }
}
</style> 

<script>
export default {
  props: {
    image: {
      required: true,
      type: String
    },
    height: {
      type: String,
      default: "600px"
    },
    speed: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      bottom: 0
    };
  },
  methods: {
    parallaxFunct() {
      let el = this.$refs.parallax; //Parallax-Container

      let imageHeight = this.$refs.image.clientHeight; //Höhe des Parallax-Bildes
      let containerHeight = el.clientHeight; //Höhe des Parallax-Containers
      let posTop = el.getBoundingClientRect().top; //Entfernung der Oberkante des Parallax-Containers zum Seitenanfang
      let pos = posTop - window.innerHeight; //Entfernung der Oberkante des Parallax-Containers zum Seitenanfang - Seitenhöhe
      let parallax = pos * this.speed;

      if (pos <= 0 && parallax * -1 < imageHeight - containerHeight) {
        this.bottom = `${parallax}px`;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.parallaxFunct);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.parallaxFunct);
  }
};
</script>