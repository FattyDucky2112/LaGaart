<template>
  <div>
    <Navbar />
    <Smallbanner :image="require('~/assets/img/smallbanner/smallbanner1.jpg')" />
    <Galleryfilter :categories="categories" />

    <NoSSR>
      <CoolLightBox :items="filteredImages" :index="index" loop @close="index = null" />

      <div
        v-masonry
        transition-duration="1s"
        item-selector=".item"
        class="masonry-container container images-wrapper"
      >
        <div
          class="image item"
          v-masonry-tile
          v-for="(image, imageIndex) of filteredImages"
          :key="imageIndex"
          @click="setIndex(imageIndex)"
        >
          <div class="shadow image-wrapper">
            <img :src="image.imagepath" />
          </div>
        </div>
      </div>
    </NoSSR>
  </div>
</template>

<style lang="scss" scoped>
.item {
  .image-wrapper {
    overflow: hidden;
    border: 10px solid #fff;
    margin: 10px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: black;
      opacity: 0;
      transition: opacity 1s ease;
      will-change: opacity;
      z-index: 99;
    }

    &:hover {
      &:after {
        opacity: 0.4;
      }

      img {
        transform: scale(1.25) rotate(3deg);
      }
    }

    img {
      width: 300px;
      transition: all 1s linear;
    }
  }
}

.showcards {
  columns: 3;
  column-gap: 12px;
  margin-top: 151px;

  .showcard {
    position: relative;
    display: inline-block;
    page-break-inside: avoid;
    break-inside: avoid-column;
    width: 100%;
    margin-bottom: 6px;
    overflow: hidden;
    border: 10px solid #fff;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      opacity: 0;
      transition: opacity 1s ease;
      will-change: opacity;
    }

    &:hover {
      img {
        transform: scale(1.25) rotate(3deg);
      }
      &:after {
        opacity: 0.4;
      }
    }

    img {
      width: 100%;
      transition: all 1s ease;
    }
  }
}
</style>

<script>
import Navbar from "~/layouts/components/navbar";
import Smallbanner from "~/layouts/components/smallbanner";
import Galleryfilter from "~/layouts/components/galleryfilter";
import NoSSR from "vue-no-ssr";
import CoolLightBox from "vue-cool-lightbox";

export default {
  components: {
    Navbar,
    Smallbanner,
    Galleryfilter,
    NoSSR,
    CoolLightBox
  },
  async asyncData({ params, app, route, redirect, router }) {
    let { data } = await app.$axios.get("/gallerydata");

    let currentCategory = route.params.category;

    let currentCategoryProps = data.categories.find(
      category => category.path === currentCategory
    );

    if (!currentCategory || !currentCategoryProps) {
      let firstCategory = data.categories[0].path;

      redirect(`/gallery/${firstCategory}`);
      return;
    }

    let images = data.images.map(image => {
      let i = image;
      i.title = i.name;
      i.imagepath = `${i.id}.webp`;
      i.src = `big_${i.imagepath}`;
      return i;
    });

    return {
      currentCategoryID: currentCategoryProps.id,
      images_temp: images,
      categories: data.categories
    };
  },
  data() {
    return {
      index: null,
      images: []
    };
  },
  computed: {
    filteredImages() {
      return this.images.filter(
        image => image.categoryid === this.currentCategoryID
      );
    }
  },
  methods: {
    setIndex(index) {
      this.index = index;
    }
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === "function") {
      this.$nextTick(() => {
        this.images = this.images_temp;
        this.$redrawVueMasonry();
      });
    }
  }
};
</script>