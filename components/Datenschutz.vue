
<template>
  <div class="cookie-popup">
    <div class="hinweis">
      <p>Wir verwenden Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.</p>
    </div>
    <span class="more">
      <nuxt-link class="btn btn-secondary btn-sm" to="/impressum">Details</nuxt-link>
    </span>
    <button
      class="btn btn-success btn-sm"
      @click="$emit('cookieOK', true)"
    >OK, ich bin einverstanden.</button>
  </div>
</template>


  <style lang="scss" scoped>
.cookie-popup {
  text-align: center;
  background: #fff;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 9999;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>