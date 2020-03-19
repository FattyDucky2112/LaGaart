<template>
  <div class="container">
    <form name="dropzone" id="form" @submit.prevent="inputcheck()">
      <h3>Hier können das Bild, der Titel oder die Beschreibung eines Evtens bearbeitet werden</h3>

      <div class="input-wrapper">
        <div class="row-wrapper">
          <div class="row">
            <div class="col-sm">
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

            <div v-if="picturename" class="col-sm-4 image-wrapper">
              <img class="image shadow" :src="`/aktuelles/${picturename}.webp`" alt="Kein Bild" />
            </div>
          </div>
        </div>

        <div class="input-group input-group-lg text">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Titel bearbeiten</span>
          </div>
          <input
            v-model="prefillName"
            type="text"
            :class="{ 'form-control' : true, 'is-invalid' : errorcheck.includes('name')}"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div :class="{'description-error' : errorcheck.includes('description')}">
          <editor
            v-model="prefillDescription"
            :init="{
         height: 500,
         branding: false,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic forecolor backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent'
       }"
          />
        </div>

        <div class="button-wrapper">
          <button class="btn btn-success">Eintrag speichern</button>
          <button class="btn btn-secondary" @click.prevent="$emit('close', true)">Abbruch</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  margin: 25px 0;
  padding: 25px;
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.input-wrapper {
  margin: 50px 25px;

  .row-wrapper {
    padding: 50px 0;
    margin: 50px 0;
  }
  .dropzone {
    text-align: center;
    width: 100%;

    background-color: #ccc;
    cursor: pointer;
  }
  .image-wrapper {
    text-align: center;
  }
  .image {
    max-height: 250px;
    border: 5px solid #fff;
  }

  .text {
    margin-bottom: 25px;
  }

  .button-wrapper {
    text-align: right;
    margin: 25px 0;
  }
}

.description-error {
  border: 1px solid red;
}
</style>


<script>
import Dropzone from "nuxt-dropzone";
import Editor from "@tinymce/tinymce-vue";

const endpoint = "/admin/newsdata";

export default {
  props: {
    description: String,
    picturename: String,
    name: String,
    id: Number
  },
  components: {
    Dropzone,
    Editor
  },
  middleware: "auth",
  data() {
    return {
      options: {
        url: `${this.$axios.defaults.baseURL}${endpoint}?action=edit&id=${this.id}`,
        dictDefaultMessage: "Um das Bild zu ändern bitte hier klicken",
        timeout: 1000 * 60 * 2,
        maxFilesize: 20,
        maxFiles: 1,
        acceptedFiles: "image/*",
        autoProcessQueue: false
      },
      errorcheck: [],
      prefillName: this.name,
      prefillDescription: this.description
    };
  },
  methods: {
    success(haspicture = false) {
      this.$emit("editSuccess", {
        id: this.id,
        name: this.prefillName,
        description: this.prefillDescription,
        haspicture: haspicture || this.haspicture
      });
    },

    onSuccess(file, res) {
      this.success(res.haspicture);
    },

    inputcheck() {
      if (this.prefillName === "") {
        this.errorcheck.push("name");
      }

      if (this.prefillDescription === "") {
        this.errorcheck.push("description");
      }

      if (this.prefillDescription === "" || this.prefillName === "") {
        return;
      }

      this.errorcheck = [];

      let useDropzone = this.$refs.el.getQueuedFiles().length > 0;
      if (useDropzone) {
        this.$refs.el.processQueue();
        return;
      }

      this.$axios({
        method: "post",
        url: endpoint,
        params: {
          action: "edit",
          id: this.id
        },
        data: {
          name: this.prefillName,
          description: this.prefillDescription
        }
      })
        .then(res => {
          this.success();
        })
        .catch(e => {
          this.$emit("error", e.response.data || "Unbekannter Fehler");
        });
    },

    onSending(file, xhr, formData) {
      formData.append("name", this.prefillName);
      formData.append("description", this.prefillDescription);
    },

    onError(file, message, xhr) {
      if (message.includes("canceled")) {
        return;
      }
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