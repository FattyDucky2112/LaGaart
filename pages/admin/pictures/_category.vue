<template>
  <div>
    <Navbar />
    <div class>
      <div
        :class="{'add-icon': true, animation: showAnimation }"
        @click="showupload = true"
        title="Bild hochladen"
      ></div>
    </div>
    <PictureUpload
      v-if="showupload"
      @success="onSuccess"
      @error="onError"
      @close="showupload = false"
      :categories="categories"
    />
    <Galleryfilter :showUnsortedCat="true" :categories="categories" path="/admin/pictures/" />
    <Fehlermeldung v-show="error !== ''" @close="error = ''">{{error}}</Fehlermeldung>

    <div style="margin: 40px" v-if="filteredImages.length">
      <transition-group name="list" tag="div" class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="picture of filteredImages"
          :key="picture.id"
        >
          <PictureEdit
            @loeschen="onLoeschen"
            @saveEdit="onSaveEdit"
            :unsortedCatActive="unsortedCatActive"
            :categories="categories"
            v-bind="picture"
            :class="{'shadow-lg': true, 'picture-wrapper': true, edited: editedId === picture.id}"
          />
        </div>
      </transition-group>
    </div>
    <div v-else class="container">In dieser Kategorie sind keine Bilder vorhanden</div>
  </div>
</template>

<style lang="scss" scoped>
.add-icon {
  position: absolute;

  z-index: 1000;
  background: url(~@/assets/img/buttons/plus.svg);
  height: 100px;
  width: 100px;
  right: 50px;
  filter: invert(50%) sepia(100%) saturate(5) hue-rotate(80deg);
  top: 100px;
  opacity: 0.5;
  cursor: pointer;
  transition: all 1s ease;
  will-change: opacity;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }

  &.animation {
    animation: upload-success 2s;
  }
}

@keyframes upload-success {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0);
    background-image: url(~@/assets/img/buttons/plus.svg);
  }
  51% {
    transform: scale(0);
    background-image: url(~@/assets/img/buttons/check.svg);
  }

  80% {
    transform: scale(1);
    background-image: url(~@/assets/img/buttons/check.svg);
  }

  100% {
    transform: scale(1);
  }
}

.list-leave-active {
  transition: all 0.5s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0);
}

.picture-wrapper {
  transition: all 1s ease;

  &.edited {
    box-shadow: 0 1rem 3rem rgba(8, 240, 0, 0.775) !important;
  }
}
</style>


<script>
import Navbar from "~/layouts/components/admin_components/navbar";
import Galleryfilter from "~/layouts/components/galleryfilter";
import PictureEdit from "~/components/PictureEdit";
import PictureUpload from "~/components/PictureUpload";
import Fehlermeldung from "~/components/Fehlermeldung";

export default {
  components: {
    Navbar,
    Galleryfilter,
    PictureEdit,
    PictureUpload,
    Fehlermeldung
  },
  layout: "admin_layout",
  middleware: "auth",
  data() {
    return {
      showupload: false,
      error: "",
      showAnimation: false,
      editedId: -1
    };
  },
  async asyncData({ params, app, route, redirect, router }) {
    let { data } = await app.$axios.get("/admin/pictures", {
      params: {
        action: "getAll"
      }
    });

    let currentCategory = route.params.category;

    let currentCategoryProps = data.categories.find(
      category => category.path === currentCategory
    );

    let unsortedCatActive = currentCategory === "ohne_Kategorie";

    if ((!currentCategory || !currentCategoryProps) && !unsortedCatActive) {
      let firstCategory = data.categories[0].path;

      redirect(`/admin/pictures/${firstCategory}`);
      return;
    }

    return {
      unsortedCatActive,
      currentCategoryID: unsortedCatActive ? -1 : currentCategoryProps.id,
      images: data.images,
      categories: data.categories
    };
  },
  computed: {
    filteredImages() {
      let catIDs = [];
      if (this.unsortedCatActive) {
        for (let category of this.categories) {
          catIDs.push(category.id);
        }
      }

      return this.images.filter(image => {
        if (this.unsortedCatActive) {
          return !catIDs.includes(image.categoryid);
        }

        return image.categoryid === this.currentCategoryID;
      });
    }
  },
  methods: {
    onSuccess({ newID, name, description, category }) {
      this.showupload = false;
      this.showAnimation = true;
      setTimeout(() => {
        this.showAnimation = false;
      }, 3000);

      setTimeout(() => {
        this.images = [
          {
            categoryid: category,
            description,
            id: newID,
            name
          },
          ...this.images
        ];
      }, 500);
    },

    onError(message) {
      this.showupload = false;
      this.error = message || "Es ist ein Fehler aufgetreten";
    },

    onSaveEdit({ editID, name, description, category }) {
      this.$axios({
        method: "post",
        url: "/admin/pictures",
        params: {
          action: "edit",
          editID
        },
        data: {
          name,
          description,
          category
        }
      })
        .then(res => {
          let index = this.images.findIndex(image => image.id === editID);
          if (index >= 0) {
            let entry = this.images[index];
            entry.name = name;
            entry.description = description;
            entry.categoryid = category;
            this.$set(this.images, index, entry);
            this.editedId = editID;
            setTimeout(() => {
              this.editedId = -1;
            }, 1000);
          }
        })
        .catch(e => {
          console.error(e);
          this.error = e.response.data || "Unbekannter Fehler";
        });
    },
    onLoeschen(id) {
      this.$axios({
        method: "get",
        url: "/admin/pictures",
        params: {
          action: "delete",
          id
        }
      })
        .then(res => {
          let index = this.images.findIndex(image => image.id === id);
          if (index >= 0) {
            this.$delete(this.images, index);
          }
        })
        .catch(e => {
          console.error(e);
          this.error = e.response.data || "Unbekannter Fehler";
        });
    }
  }
};
</script>