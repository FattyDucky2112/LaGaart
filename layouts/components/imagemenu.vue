<template>
  <div :class="mainWrapperClass">
    <div class="container">
      <div class="row">
        <div :class="imageWrapperClass">
          <img class="shadow-lg" :src="image" alt="no pic" />
        </div>
        <div :class="contentWrapperClass">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      required: true,
      type: String
    },
    withBackground: Boolean,
    mirrored: Boolean
  },
  computed: {
    mainWrapperClass() {
      let classes = ["showroom"];

      if (this.withBackground) {
        classes.push("backgrounds");
      }

      return classes.join(" ");
    },
    contentWrapperClass() {
      let classes = ["col-12", "col-lg-6", "contante"];

      if (this.mirrored) {
        classes.push("order-1");
      }

      return classes.join(" ");
    },
    imageWrapperClass() {
      let classes = ["col-12", "col-lg-6", "imgage"];

      if (this.mirrored) {
        classes.push("order-2");
        classes.push("rotate");
      }

      return classes; // =.join(' ')
    }
  }
};
</script>

<style lang="scss" scoped>
.showroom {
  &.backgrounds {
    background-color: #fff3e0;
  }

  .contante {
    margin-top: auto;
  }

  .container {
    padding: 50px 0;
  }

  .imgage {
    text-align: center;
    height: 444px;
    transition: all 1s ease;

    &:hover {
      transform: scale(1.02) rotate(2deg);
    }
    img {
      width: 80%;
      height: 100%;
      border: 10px solid #fff;
      object-fit: cover;
      // #ccc0ae dark color
    }
  }

  .rotate {
    transition: all 1s ease;

    &:hover {
      transform: scale(1.02) rotate(-2deg);
    }
  }
}
</style>