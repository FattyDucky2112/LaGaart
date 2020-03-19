<template>
  <div :class="`map-wrapper ${mapIframeLoaded ? 'loaded' : ''}`" :style="`height:${height}px;`">
    <iframe 
      :style="`height:${height * 3}px;margin-top:-${height * .9}px`" 
      @load="mapIframeLoaded = true" 
      :src="`https://maps.google.com/maps?q=${lat || 0},${lon || 0}&z=${zoom || 7}&output=embed`" 
      frameborder="0"></iframe>
  </div>
</template>

<style lang="scss" scoped>

  .map-wrapper {
    width:100%;
    position: relative;
    overflow: hidden;
    background-color: lighten(desaturate(#aadaff, 10%), 5%);

    &:after {
      position: absolute;
      top: 100px;
      left: 50%;
      font-family: "Font Awesome 5 Free"; 
      font-weight: 900; 
      animation: container-rotate 1568ms linear infinite;
      font-size: 2.5rem;
      color: rgba(79, 85, 90, 0.2);
      content: '\f110';
      transition: opacity .8s ease-out;
    }

    iframe {
      transition: opacity 1s ease-in;
      opacity: 0;
      width: 100%;
    }

    &.loaded {
      &:after {
        opacity: 0;
      }
      
      iframe {
        opacity: 1;
      }
    }
  }

</style>

<script>
export default {
  props: [
    'height',
    'lat',
    'lon',
    'zoom',
  ],
  data () {
    return {
      mapIframeLoaded: false
    }
  }
}
</script>