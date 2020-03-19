<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <div>{{name}}</div>
        <div class="description-wrapper" v-html="description"></div>
      </div>
      <div class="col-sm-4">
        <img class="shadow" :src="`/aktuelles/${picturename}.webp`" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.row {
  border-bottom: 1px solid #ccc;
  min-height: 150px;

  .description-wrapper {
    font-size: 1rem;
    margin-left: 10px;
  }

  img {
    margin: 40px;
    border: 10px solid #fff;
  }
}
</style>

<script>
export default {
  props: {
    name: String,
    description: String,
    picturename: String
  },
  data() {
    return {};
  }
};
</script>