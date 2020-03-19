<template>
  <div>
    <Banner />
    <Navbar />

    <Imagemenu :image="require('~/assets/img/imagemenu/imagemenu9.jpg')">
      <div>
        „Ich habe Augen für die Kleinigkeiten“,
        <br />beschreibt die Künstlerin ihre Arbeitsweise.
        <br />Sie sieht die Schönheit der Objekte. Und sie
        hat eine Ausdauer, die fast schon meditativen Charakter
        in sich trägt.
        <br />
        <br />„Gerade das Vergängliche hat etwas
        wahnsinnig Schönes an sich“
      </div>
      <nuxt-link to="/gallery" class="btn btn-secondary btn-lg">Impressionen</nuxt-link>
    </Imagemenu>

    <Imagemenu
      :withBackground="true"
      :mirrored="true"
      :image="require('~/assets/img/imagemenu/imagemenu2.jpg')"
    >
      <div>
        „Ich muss ein Objekt
        mögen, immer wieder eine Affinität dazu finden,
        dann ist es fertig.
        <br />Oder die Zeit arbeitet
        ganz selbstständig weiter"
      </div>
      <nuxt-link to="/lagaart" class="btn btn-secondary btn-lg">LaGaart</nuxt-link>
    </Imagemenu>

    <Parallax :image="require('~/assets/img/parallax/para3.jpg')"></Parallax>

    <Imagemenu :image="require('~/assets/img/imagemenu/imagemenu11.jpg')">
      <div>
        "Diese Sachen brauche
        ich um mich, mit ihnen möchte ich mich umgeben“, sagt Susanne von Siemens mit einem
        versonnenen Lächeln.
        <br />Und der Betrachter
        kann sie nur zu gut verstehen.
      </div>
      <nuxt-link to="/info" class="btn btn-secondary btn-lg">Mehr zur Künstlerin</nuxt-link>
    </Imagemenu>

    <Imagemenu
      :withBackground="true"
      :mirrored="true"
      :image="require('~/assets/img/imagemenu/imagemenu3.jpg')"
    >
      <div>
        Die Natur ist also wie ein Gedicht.
        <br />Allein der Zugang
        und das Verständnis dafür ist schwer und oft in Vergessenheit geraten:
        <br />Wir sehen nicht mehr hin. Insofern ist die Ausstellung "Die Poesie der Natur"
        von Susanne von Siemens wieder hinzusehen.
      </div>
      <nuxt-link to="/aktuelles" class="btn btn-secondary btn-lg">Veranstaltungen</nuxt-link>
    </Imagemenu>
  </div>
</template>

<style lang="scss" scoped>
a {
  margin-top: 50px;
  margin-bottom: 25px;
}

a {
  margin-top: 100px;
}
</style>

<script>
import Navbar from "~/layouts/components/navbar";
import Banner from "~/layouts/components/banner";
import Imagemenu from "~/layouts/components/imagemenu";
import Parallax from "~/layouts/components/parallax";
export default {
  components: { Navbar, Banner, Imagemenu, Parallax },
  data() {
    return {};
  }
};
</script>