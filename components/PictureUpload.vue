<template>
  <form name="dropzone" class="dropzone" id="form" @submit.prevent="inputcheck()">
    <div>
      <div class="backdrop" @click="$emit('close', true)"></div>
      <div class="field-wrapper">
        <div class="titlebar">
          Bild hochladen
          <i class="fas fa-times" @click="$emit('close', true)"></i>
        </div>
        <div class="row">
          <div
            class="col-sm-4"
            style="border-right: 1px solid #ccc; min-height: 300px; padding-right: 0;"
          >
            <dropzone
              id="foo"
              ref="el"
              :options="options"
              :destroyDropzone="true"
              @vdropzone-error="onError"
              @vdropzone-success="onSuccess"
              @vdropzone-sending="onSending"
            ></dropzone>
          </div>
          <div class="col-sm-8" style="padding: 30px 45px 30px 30px">
            <div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                </div>
                <input
                  maxlength="100"
                  name="name"
                  id="name"
                  v-model="nameinput"
                  type="text"
                  :class="{ 'form-control' : true, 'is-invalid' : errorcheck.includes('name')}"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Bildbeschreibung</span>
                </div>
                <textarea
                  v-model="descriptioninput"
                  style="height: 100px"
                  name="description"
                  id="description"
                  type="text"
                  :class="{ 'form-control' : true, 'is-invalid' : errorcheck.includes('description')}"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                ></textarea>
              </div>
            </div>
            <div>
              <select
                v-model="catinput"
                id="category"
                name="category"
                :class="{ 'custom-select' : true, 'is-invalid' : errorcheck.includes('category')}"
              >
                <option :value="-1">Zugehörige Kategorie wählen</option>
                <option
                  :value="category.id"
                  v-for="category of categories"
                  :key="category.id"
                >{{category.name}}</option>
              </select>
            </div>
            <div class="button-wrapper">
              <button
                class="btn btn-success"
                type="submit"
                @click="$emit('loeschen', true)"
              >Hochladen</button>
              <button class="btn btn-secondary" @click="$emit('close', true)">Abbruch</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.field-wrapper {
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 800px;
  overflow: hidden;
  border: 1px solid black;
  transform: translate(-50%, -50%);
  z-index: 1001;
  border-radius: 3px;
}

.backdrop {
  background-color: white;
  opacity: 0.8;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.titlebar {
  border-bottom: 1px solid #ccc;
  padding-top: 5px;
  padding-left: 10px;
  i {
    position: absolute;
    right: 4px;
    top: 2px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
}

.vue-dropzone {
  width: 100%;
  height: 100%;
  border: none;
}

.button-wrapper {
  text-align: right;
  margin-top: 25px;

  button {
    margin: 10px;
  }
}
</style>

<script>
import Dropzone from "nuxt-dropzone";

import "nuxt-dropzone/dropzone.css";

let dropzoneObj = null;

export default {
  components: {
    Dropzone
  },
  middleware: "auth",

  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      nameinput: "",
      descriptioninput: "",
      catinput: -1,
      errorcheck: [],
      // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
      options: {
        url: `${this.$axios.defaults.baseURL}/admin/pictures`,
        dictDefaultMessage: "Bild hier ablegen oder klicken",
        timeout: 1000 * 60 * 2,
        maxFilesize: 20,
        maxFiles: 1,
        acceptedFiles: "image/*",
        autoProcessQueue: false
      }
    };
  },
  methods: {
    inputcheck() {
      if (this.catinput <= 0) {
        this.errorcheck.push("category");
        return;
      }
      this.errorcheck = [];
      this.$refs.el.processQueue();
    },

    onSuccess(file, response) {
      if (response.newID) {
        this.$emit("success", {
          newID: response.newID,
          name: this.nameinput,
          description: this.descriptioninput,
          category: this.catinput
        });
      }
    },

    onSending(file, xhr, formData) {
      formData.append("name", this.nameinput);
      formData.append("description", this.descriptioninput);
      formData.append("category", this.catinput);
    },

    onError(file, message, xhr) {
      if (message.includes("canceled")) {
        return;
      }
      this.$refs.el.destroy();
      this.$emit("error", message);
    }
  },
  mounted() {
    this.$refs.el.setOption("headers", {
      Authorization: this.$auth.getToken("local")
    });
  }
};
</script>