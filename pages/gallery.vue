<template>
<div>
  <div class="bannersmall">

  </div>
<nuxt-link to="/" style="font-size: 9rem;">Startseite</nuxt-link>
  <div class="container showcards">
      <div class="showcard" v-for="(showcard, index) of showcards" :key="`item-${index}`">
        <img :src="showcard.image">
      </div>
  </div>
</div>
 
</template>

<style lang="scss" scoped>

.bannersmall {
    position: fixed;
    width: 100%;
    top:0;
    height: 140px;
    z-index: 999;
    overflow: hidden;
    background-image: url("~assets/img/5.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: 50%;
    background-position-x: 30%;

     &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(255,255,255);
        opacity: 0.7;
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7539390756302521) 45%, rgba(255,255,255,0.4374124649859944) 100%);
      }

    
    
}

.showcards {
    columns: 3;
    column-gap: 12px;
    margin-top: 151px;

    .showcard {
      position: relative;
      display: inline-block;
      page-break-inside: avoid;
      break-inside: avoid-column;
      width: 100%;
      margin-bottom: 6px;
      overflow: hidden;
      

      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        opacity: 0;
        transition: opacity 1s ease;
        will-change: opacity;
        
      }
      
      &:hover{
        img {
          transform: scale(1.25) rotate(3deg);
        }
        &:after{
          opacity: 0.4;
        }
      }

      img {
        width: 100%;
        transition: all 1s ease;
      }
    }
  }

</style>

<script>
export default {
  data() {
    return {
      showcards: [ 
        {image: require('~/assets/img/pic1.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic2.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic3.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic4.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic5.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic6.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic7.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic8.jpg'), text:'', link:'/details/detail1'},
        {image: require('~/assets/img/pic9.jpg'), text:'', link:'/details/detail1'},
      ],

    } 
  }
}

</script>