<template>
  <div class="container">
    <form name="dropzone" id="form" @submit.prevent="inputcheck()">
      <h3>Hier kannst du neue Veranstaltungen/Zeitungsartikel und vieles mehr rund um deine Kunst veröffentlichen</h3>
      <div class="input-wrapper">
        <dropzone
          id="foo"
          ref="el"
          :options="options"
          :destroyDropzone="true"
          @vdropzone-error="onError"
          @vdropzone-success="onSuccess"
          @vdropzone-sending="onSending"
        ></dropzone>
        <div class="input-group input-group-lg text">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Knackiger Titel</span>
          </div>
          <input
            v-model="name"
            type="text"
            :class="{ 'form-control' : true, 'is-invalid' : errorcheck.includes('name')}"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div :class="{'description-error' : errorcheck.includes('description')}">
          <editor
            v-model="description"
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
  .dropzone {
    text-align: center;
    width: 100%;
    padding: 50px 0;
    margin: 50px 0;
    background-color: #ccc;
    cursor: pointer;
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
  components: {
    Dropzone,
    Editor
  },
  middleware: "auth",
  data() {
    return {
      options: {
        url: `${this.$axios.defaults.baseURL}${endpoint}?action=insert`,
        dictDefaultMessage: "Bild hier ablegen oder klicken",
        timeout: 1000 * 60 * 2,
        maxFilesize: 20,
        maxFiles: 1,
        acceptedFiles: "image/*",
        autoProcessQueue: false
      },
      errorcheck: [],
      name: "",
      description: ""
    };
  },
  methods: {
    success(newID, picturename = "") {
      this.$emit("success", {
        newID,
        name: this.name,
        description: this.description,
        picturename
      });
    },

    onSuccess(file, res) {
      if (res.newID) {
        this.success(res.newID, res.picturename);
      }
    },

    inputcheck() {
      if (this.name === "") {
        this.errorcheck.push("name");
      }

      if (this.description === "") {
        this.errorcheck.push("description");
      }

      if (this.description === "" || this.name === "") {
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
          action: "insert"
        },
        data: {
          name: this.name,
          description: this.description
        }
      })
        .then(res => {
          if (res.data.newID) {
            this.success(res.data.newID);
          }
        })
        .catch(e => {
          this.$emit("error", e.response.data || "Unbekannter Fehler");
        });
    },

    onSending(file, xhr, formData) {
      formData.append("name", this.name);
      formData.append("description", this.description);
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