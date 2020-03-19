<template>
  <div>
    <Navbar />
    <Smallbanner :image="require('~/assets/img/info.jpg')" />

    <div class="container">
      <div class="content-wrapper">
        <div class="row">
          <div class="col-sm-7">
            <div class="text-wrapper">
              Susanne von Siemens greift in ihren Arbeiten auf die Kraft der Natur zurück,
              <br />die durch die geschaffene Ordnung, Anordnung, Schichtung und Wicklung der verwendeten Materialien unübersehbar und klar hervortritt;
              <br />sei es als archaische Schönheit oder in Gestalt von kapriziöser Eleganz.
            </div>
          </div>
          <div class="col-sm-4 image-wrapper shadow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  margin: 60px 0;
  background-color: #fff3e0;
  font-size: 1.5rem;

  .text-wrapper {
    margin: 150px 50px;
  }

  .image-wrapper {
    border: 10px solid #fff;
    margin: 20px 0px 20px 50px;
    height: 600px;
    background-position-x: center;
    background-image: url("~assets/img/info/info1.jpg");
  }
}
</style>

<script>
import Navbar from "~/layouts/components/navbar";
import Smallbanner from "~/layouts/components/smallbanner";
export default {
  components: { Navbar, Smallbanner }
};
</script>