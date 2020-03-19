<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="input-wrapper shadow">
        <div class="row">
          <div class="label-wrapper">Username:</div>
          <input type="name" placeholder="Namen angeben" v-model="username" />
        </div>
        <div class="row">
          <div class="label-wrapper">Password:</div>
          <input type="password" placeholder="Passwort eingeben" v-model="password" />
        </div>
        <div>
          <button class="btn btn-info" role="submit">Einloggen</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  text-align: center;
  margin: 20vh;
  min-height: 250px;

  .label-wrapper {
    width: 150px;
    margin: 30px;
  }

  input {
    width: 60%;
    margin: 20px;
    box-sizing: border-box;
  }
}
</style>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  layout: "admin_layout",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      if (this.username === "" || this.password === "") {
        alert("Bitte Username und Passwort eintragen!");
        return;
      }

      await this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          console.log("Login ok", res);
          this.$router.push("/admin/adminpanel");
        })
        .catch(e => {
          console.log("CATCH:", e);
        });
    }
  }
};
</script>