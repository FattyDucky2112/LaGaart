<template>
  <div class="container">
    <div class="row">
      <div class="col-12 image-wrapper shadow" :style="{backgroundImage: `url(${image})`}">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .image-wrapper {
    width: 100%;
    height: 500px;
    padding: 0;
    margin: 50px 0;
    border: 10px solid #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>

<script>
export default {
  props: {
    image: {
      required: true,
      type: String
      }
    }
  }  
</script>
