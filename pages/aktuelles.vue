<template>
  <div>
    <Navbar />
    <Smallbanner style="margin-bottom: 50px" :image="require('~/assets/img/aktuelles/banner.jpg')"></Smallbanner>
    <div v-for="i of news" :key="i.id">
      <Newscontainer :name="i.name" :description="i.description" :picturename="i.picturename"></Newscontainer>
    </div>
  </div>
</template>

<script>
import Navbar from "~/layouts/components/navbar";
import Smallbanner from "~/layouts/components/smallbanner";
import Newscontainer from "~/layouts/components/newscontainer";

export default {
  components: {
    Navbar,
    Smallbanner,
    Newscontainer
  },

  async asyncData({ params, app, route, redirect, router }) {
    let { data } = await app.$axios.get("/newsdata");

    return {
      news: data.news
    };
  },

  data() {
    return {};
  }
};
</script>

