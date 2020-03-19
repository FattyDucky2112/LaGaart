<template>
  <div class="image" :style="{backgroundImage: `url(${image})`}">
  </div>
</template>



<style lang="scss" scoped>
  
  div{
    height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    background-position: center;
    
  }
</style>


<script>
export default {
  props: {
    image: {
      required: true,
      type: String,
    }
  }
}
</script>