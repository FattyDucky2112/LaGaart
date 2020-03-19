<template>
  <div class="container filterdiv">
    <ul>
      <li v-for="(category, i) of categories" :key="i">
        <nuxt-link
          :to="`${path}${category.path}`"
          :class="getClass(category.path)"
        >{{category.name}}</nuxt-link>
      </li>
      <li v-if="showUnsortedCat" key="unsorted">
        <nuxt-link
          :to="`${path}ohne_Kategorie`"
          :class="['unsorted-category', getClass('ohne_Kategorie')]"
        >Keine Kategorie</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.filterdiv > ul {
  list-style-type: none;
  margin-top: 40px;
  padding: 0;
  text-align: center;

  li {
    display: inline-block;
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .unsorted-category {
    border-color: rgba(214, 21, 21, 0.5);
  }
}
</style>


<script>
export default {
  props: {
    categories: {
      required: true,
      type: Array
    },
    path: {
      type: String,
      default: "/gallery/"
    },
    showUnsortedCat: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      filter: this.$route.params.category || ""
    };
  },
  methods: {
    getClass(filter) {
      let classes = ["btn", "btn-outline-secondary", "btn-lg"];

      if (this.filter === filter) {
        classes.push("active");
      }

      return classes; // =.join(' ')
    }
  }
};
</script>