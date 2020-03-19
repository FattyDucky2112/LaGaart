<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
    <div id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <nuxt-link class="nav-item nav-link active" to="/admin/">Adminpanel</nuxt-link>
      </div>
    </div>
    <div id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <nuxt-link class="nav-item nav-link" to="/">Zurück zur Homepage</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
}
</style>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>