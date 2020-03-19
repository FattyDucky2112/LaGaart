<template>
  <div>
    <nuxt />
    <client-only>
      <Datenschutz v-if="showDatenschutz" @cookieOK="onCookieAccepted"></Datenschutz>
    </client-only>
    <Fusser class="fusser" />
  </div>
</template>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Vollkorn&display=swap");

//@import '@/assets/scss/bootstrap.scss';

body {
  font-family: "Vollkorn";
  font-size: 1.6rem;
}

.cool-lightbox-toolbar .cool-lightbox-toolbar__btn:first-child {
  display: none;
}

.cool-lightbox .cool-lightbox-thumbs,
* {
  //scrollbar-width: thin;
  scrollbar-color: #fff3e0 rgba(175, 175, 175, 0.9);
  &::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }
  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-thumb:hover,
  &::-webkit-scrollbar-thumb:active {
    background: #fff3e0 !important;
    border: 0px none #ffffff !important;
    border-radius: 50px !important;
  }
  &::-webkit-scrollbar-track {
    background: #e1e1e1 !important;
    border: 0px none #ffffff !important;
    border-radius: 8px !important;
  }
  &::-webkit-scrollbar-track:hover {
    background: #ccc0ae !important;
  }
  &::-webkit-scrollbar-track:active {
    background: #ccc0ae !important;
  }
}

.cool-lightbox__thumb:before {
  border-color: #fff3e0 !important;
}

.fusser {
  font-size: 1rem;
}
</style>


<script>
import Fusser from "~/layouts/components/fusser";
import Datenschutz from "~/components/Datenschutz";

export default {
  components: { Fusser, Datenschutz },
  data() {
    return {
      showDatenschutz: true
    };
  },
  methods: {
    onCookieAccepted() {
      this.showDatenschutz = false;
      this.$cookies.set(
        "cookiesAccepted",
        true,
        "70d",
        null,
        null,
        null,
        "Strict"
      );
    }
  },
  beforeMount() {
    this.showDatenschutz = !this.$cookies.isKey("cookiesAccepted");
  }
};
</script>