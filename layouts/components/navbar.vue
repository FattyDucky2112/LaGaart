<template>
  <nav ref="navbar" :class="navClasses">
    <div class="d-flex w-50 order-0">
      <nuxt-link class="navbar-brand mr-1" to="/">
        <img src="~/assets/img/susannelogo.png" style="height: 6vh;" alt="Home" />
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsingNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse justify-content-center order-2" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <nuxt-link
          v-for="(navItem, index) of navItems"
          :key="index"
          class="nav-item nav-link"
          :to="navItem.link"
        >{{navItem.name}}</nuxt-link>
      </div>
    </div>
    <span
      class="navbar-text small text-truncate mt-1 w-50 text-right order-1 order-md-last social-wrapper"
    >
      <a style="color:black" href="https://www.facebook.com/S.v.Siemens" target="_blank">
        <i class="fab fa-facebook"></i>
      </a>
      <a style="color:black" href="https://www.pinterest.de/susannevsiemens/" target="_blank">
        <i class="fab fa-pinterest"></i>
      </a>
      <a style="color:black" href="mailto:s.v.siemens@web.de" target="_blank">
        <i class="far fa-envelope"></i>
      </a>
    </span>
  </nav>
</template>


<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  z-index: 9998;
  transition: background-color 0.5s ease;
  will-change: background-color;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 16px;
}

.navbar-brand img {
  will-change: filter;
  transition: filter 0.5s ease;
}

.nav-item,
.nav-link {
  color: black;
  opacity: 0.7;
  font-size: 1.5rem;
  margin-left: 20px;
  will-change: color;
  transition: color 0.5s ease;
}

.social-wrapper i {
  font-size: 2rem;
  margin-left: 10px;
  will-change: color;
  transition: color 0.5s ease;
}

.nav-background {
  background-color: rgba(204, 192, 174, 0.8);
  border-bottom-color: transparent;

  .navbar-brand img {
    filter: invert(100%);
  }

  .nav-item,
  .nav-link {
    color: white;
  }
  .social-wrapper i {
    color: white;
  }
}
</style>


<script>
export default {
  data() {
    return {
      navItems: [
        { name: "Home", link: "/" },
        { name: "Gallerie", link: "/gallery" },
        { name: "LaGaart", link: "/lagaart" },
        { name: "Aktuelles", link: "/aktuelles" },
        { name: "Info", link: "/info" }
      ],
      navDocked: false
    };
  },
  computed: {
    navClasses() {
      let classes = ["navbar", "navbar-expand-lg"];

      if (this.navDocked) {
        classes.push("nav-background");
      }

      return classes.join(" ");
    }
  },

  methods: {
    onNavbarScroll() {
      this.navDocked =
        this.$refs.navbar.getBoundingClientRect().y <= 0 &&
        window.scrollY !== 0;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onNavbarScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onNavbarScroll);
  }
};
</script>