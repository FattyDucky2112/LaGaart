<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-lg-6">
        <div class="content-wrapper shadow-lg gallery">
          <div class="title">Gallerie bearbeiten</div>
          <div class="row">
            <div
              class="col-sm-6 link-wrapper"
              @mouseover="activeCategory='kategorien'"
              @mouseleave="activeCategory=''"
            >
              <nuxt-link style="color:black" to="/admin/categories">Kategorien</nuxt-link>
            </div>
            <div
              class="col-sm-6 link-wrapper"
              @mouseover="activeCategory='bilder'"
              @mouseleave="activeCategory=''"
            >
              <nuxt-link style="color:black" to="/admin/pictures">Bilder</nuxt-link>
            </div>
          </div>
          <div :class="gallerychanger"></div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6">
        <div class="content-wrapper shadow-lg">
          <div class="link-wrapper">
            <nuxt-link style="color:black" to="/admin/aktuelles">Aktuelles bearbeiten</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="content-wrapper shadow-lg">
          Diashow
          <div class="row">
            <div class="col-sm-6">
              <nuxt-link style="color:black" to="/">Dias bearbeiten</nuxt-link>
            </div>
            <div class="col-sm-6">
              <nuxt-link style="color:black" to="/">Show starten</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.content-wrapper {
  border: 10px solid #fff;
  text-align: center;
  margin: 30px;
  line-height: 200px;
  overflow: hidden;

  &.gallery {
    line-height: 100px;
  }

  .link-wrapper a {
    display: block;

    &:hover {
      background: rgba(204, 204, 204, 0.164);
    }
  }

  .title {
    border-bottom: 2px solid #ccc;
  }

  .image-wrapper {
    background-image: url("~assets/img/admin/gallery1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    height: 400px;
    background-position: center;
    border-top: 2px solid #ccc;
  }

  .image-wrapper2 {
    background-image: url("~assets/img/admin/gallery2.jpg");
  }

  .image-wrapper3 {
    background-image: url("~assets/img/admin/gallery3.jpg");
  }

  user-select: none;
}
</style>


<script>
export default {
  data() {
    return {
      activeCategory: ""
    };
  },
  computed: {
    gallerychanger() {
      let classes = ["col-sm-12", "image-wrapper"];

      if (this.activeCategory === "kategorien") {
        classes.push("image-wrapper2");
      } else if (this.activeCategory === "bilder") {
        classes.push("image-wrapper3");
      }
      return classes;
    }
  }
};
</script>