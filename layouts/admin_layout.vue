<template>
  <div>
    <nuxt />
  </div>
</template>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Amatic+SC:700");
//@import '@/assets/scss/bootstrap.scss';

body {
  font-family: "Amatic SC", cursive;
  font-size: 1.6rem;
}

.dz-details,
.dz-progress,
.dz-error-message,
.dz-success-mark,
.dz-error-mark {
  display: none !important;
}

.tox-notifications-container {
  display: none !important;
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
</style>


<script>
</script>