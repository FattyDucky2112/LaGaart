<template>
  <div class="card-wrapper">
    <form @submit.prevent="saveEdit">
      <div class="row">
        <div class="col-sm-4" style="text-align: center">
          <img class="image shadow" :src="`/gallery/${id}.webp`" alt="Kein Bild vorhanden" />
        </div>
        <div class="col-sm-8">
          <div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
              </div>
              <input
                name="name"
                maxlength="100"
                placeholder="Kein name vorhanden"
                :value="name"
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Beschreibung</span>
              </div>
              <textarea
                name="description"
                placeholder="Keine Beschreibung vorhanden"
                style="height: 100px"
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              >{{description}}</textarea>
            </div>
          </div>
          <div>
            <select class="custom-select" name="category">
              <option value="-1" v-if="unsortedCatActive">Keine Kategorie</option>
              <option
                :value="category.id"
                v-for="category of categories"
                :key="category.id"
                :selected="categoryid === category.id"
              >{{category.name}}</option>
            </select>
          </div>
          <div class="button-wrapper">
            <button class="btn btn-success" type="submit">Änderungen speichern</button>
            <button class="btn btn-secondary" @click.prevent="$emit('loeschen', id)">Bild löschen</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
  padding: 20px;
  margin-bottom: 30px;

  .image {
    max-height: 300px;
    max-width: 100%;
  }

  .button-wrapper {
    text-align: right;
    margin-top: 25px;

    button {
      margin: 10px;
    }
  }
}
</style>

<script>
export default {
  props: {
    id: Number,
    name: String,
    description: String,
    categories: Array,
    categoryid: Number,
    unsortedCatActive: Boolean
  },
  methods: {
    saveEdit(e) {
      let editID = this.id;
      let name = e.target.elements.name.value;
      let description = e.target.elements.description.value;
      let category = parseInt(e.target.elements.category.value);

      this.$emit("saveEdit", {
        editID,
        name,
        description,
        category
      });
    }
  }
};
</script>