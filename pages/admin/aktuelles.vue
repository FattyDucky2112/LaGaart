<template>
  <div>
    <Navbar />
    <Warnung
      v-if="deleteID > 0"
      @close="deleteID= -1"
      @loeschen="deleteEntry"
    >Willst du dieses Event wirklich löschen?</Warnung>
    <div>
      <div
        :class="{'add-icon': true, animation: showAnimation }"
        @click="showupload = true"
        v-show="!showupload && !Object.keys(editObj).length"
        title="Bild hochladen"
      ></div>
    </div>
    <AktuellesUpload
      v-if="showupload"
      @error="onError"
      @success="onSuccess"
      @close="showupload = false"
    />

    <AktuellesEdit v-if="Object.keys(editObj).length" v-bind="editObj" @editSuccess="editSuccess" />
    <Fehlermeldung v-show="error !== ''" @close="error = ''">{{error}}</Fehlermeldung>

    <div class="container" v-show="!showupload && !Object.keys(editObj).length">
      <h3>Hier können bestehende Events, Zeitungsartikel etc. bearbeitet, gelöscht oder neu erstellt werden!!</h3>
      <table class="table-wrapper">
        <thead class="shadow-sm">
          <tr>
            <th>Name</th>
            <th>Bild</th>
            <th>Aktion</th>
          </tr>
        </thead>

        <tbody is="transition-group" name="table-row">
          <tr class="shadow-sm row-wrapper" v-for="i  of news" :key="i.id">
            <td class="name-wrapper">{{i.name}}</td>
            <td class="image-wrapper">
              <img
                class="shadow"
                v-if="i.picturename"
                :src="`/aktuelles/${i.picturename}.webp`"
                alt
              />
            </td>
            <td class="action-wrapper">
              <i class="far fa-edit" @click="editObj = i"></i>
              <i class="far fa-trash-alt text-danger" @click="deleteID = i.id"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  margin-top: 150px;
  padding: 25px;
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.table-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 150px;
  text-align: center;
  border: 1px solid #ccc;

  .row-wrapper:hover .image-wrapper img {
    max-height: 500px;
  }

  .name-wrapper {
    text-align: center;
  }

  .image-wrapper {
    text-align: center;
    width: 400px;

    img {
      margin: 20px;
      border: 5px solid #fff;
      max-height: 100px;
      transition: all 1s ease;
    }
  }

  .action-wrapper {
    text-align: center;
    width: 100px;

    i {
      cursor: pointer;
      transition: all 1s ease;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

.table-row-enter-active {
  transition: all 2s ease-in;
}

.table-row-enter {
  background: rgba(0, 128, 0, 0.466);
}

.table-row-leave-active {
  transition: all 1s ease;
}
.table-row-leave-to {
  opacity: 0;
}

.add-icon {
  position: absolute;

  z-index: 1000;
  background: url(~@/assets/img/buttons/plus.svg);
  height: 100px;
  width: 100px;
  right: 20px;
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
</style>





<script>
import Navbar from "~/layouts/components/admin_components/navbar";
import AktuellesUpload from "~/components/AktuellesUpload";
import AktuellesEdit from "~/components/AktuellesEdit";
import Fehlermeldung from "~/components/Fehlermeldung";
import Warnung from "~/components/Warnung";
export default {
  components: {
    Navbar,
    AktuellesUpload,
    AktuellesEdit,
    Fehlermeldung,
    Warnung
  },
  layout: "admin_layout",
  middleware: "auth",

  async asyncData({ params, app, route, redirect, router }) {
    let { data } = await app.$axios.get("/newsdata");

    return {
      news: data.news
    };
  },

  data() {
    return {
      showAnimation: false,
      showupload: false,
      error: "",
      deleteID: -1,
      editObj: {}
    };
  },
  methods: {
    onError(message) {
      this.showupload = false;
      this.error = message || "Es ist ein Fehler aufgetreten";
    },

    onSuccess({ newID, name, description, picturename }) {
      this.showupload = false;
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.news = [
          {
            description,
            picturename,
            id: newID,
            name
          },
          ...this.news
        ];
      }, 500);
    },

    deleteEntry() {
      this.$axios({
        method: "get",
        url: "/admin/newsdata",
        params: {
          action: "delete",
          id: this.deleteID
        }
      })
        .then(res => {
          let index = this.news.findIndex(news => news.id === this.deleteID);
          if (index >= 0) {
            this.$delete(this.news, index);
          }
        })
        .catch(e => {
          console.error(e);
          this.error = e.response.data || "Unbekannter Fehler";
        })
        .finally(() => {
          this.deleteID = -1;
        });
    },
    editSuccess({ id, name, description, haspicture }) {
      window.location.reload(true);
      // this.editObj = {};
      // window.scrollTo(0, 0);
      // setTimeout(() => {
      //   let index = this.news.findIndex(news => news.id === id);
      //   if (index >= 0) {
      //     this.$set(this.news, index, { description, haspicture, name, id });
      //   }
      // }, 500);
    }
  }
};
</script>