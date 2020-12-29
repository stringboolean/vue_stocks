<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Stock Trader</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <router-link
            to="/portfolio"
            tag="li"
            class="nav-item"
            activeClass="active"
            ><a>Portfolio</a></router-link
          >
          <router-link
            to="/stocks"
            tag="li"
            class="nav-item"
            activeClass="active"
            ><a>Stocks</a></router-link
          >
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">End Day</a></li>
          <li class="dropdown">
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              area-expanded="false"
              @click="toggleMenu"
            >
              <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
            </a>
            <transition name="fade" @after-leave="afterLeave">
              <ul class="dropdown-menu" v-show="menuOpen">
                <li>
                  <a href="#"
                    ><font-awesome-icon :icon="['fas', 'download']" /> Save
                    Data</a
                  >
                </li>
                <li>
                  <a href="#"
                    ><font-awesome-icon :icon="['fas', 'upload']" /> Load Data</a
                  >
                </li>
                <li>
                  <a href="#">
                    <app-slide-toggle></app-slide-toggle> Theme
                  </a>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import SlideToggle from './ui/SlideToggle.vue';

export default {
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      if (!this.menuOpen) {
        document.querySelector('.dropdown-toggle').parentElement.classList.toggle('open');
      }
      this.menuOpen = !this.menuOpen;
    },
    afterLeave(el) {
      el.parentElement.classList.toggle('open');
    }
  },
  components: {
    appSlideToggle: SlideToggle
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
