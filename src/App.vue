<template>
  <div
    @click="handleShowSideBar"
    class="backdrop"
    :class="{ active: showSideBar }"
  ></div>
  <div class="container">
    <SideBar />
  </div>
  <div class="laoder_test_site loader__site">
    <div class="loader__site_inside">
      <img class="loader__site_image" :src="logo" />
    </div>
  </div>
  <div class="wrapper">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { user } from '@/composables/getUser.js'
import logo from '@/assets/img/pizza-logo.svg'
import Header from '@/components/Header'
import SideBar from '@/components/sidebar'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  components: { Header, SideBar },
  setup() {
    const store = useStore()
    const showSideBar = computed(() => store.state.showSideBar)
    const handleShowSideBar = () => {
      store.commit('SHOW_SIDEBAR')
    }

    const handleLoaderSite = () => {
      const loaderSite = document.querySelector('.laoder_test_site')
      const loaderSitePizza = document.querySelector('.loader__site_image')
      const wrapper = document.querySelector('.wrapper')
      setTimeout(() => {
        loaderSite.style.transform = 'scaleX(1) translate(50%, -50%)'
        loaderSite.style.background = 'rgb(211,1,1)'
        loaderSite.style.borderRadius = '0 0 0 0'

        setTimeout(() => {
          loaderSite.style.transform = 'scaleX(-1) translate(50%, -50%)'
          loaderSite.style.background = 'rgb(32, 255, 143)'
          loaderSite.style.borderRadius = '10px 0 0 10px'
        }, 500)
        setTimeout(() => {
          loaderSite.style.transform = 'scaleX(1) translate(50%, -50%)'
          loaderSite.style.background = '#fff'
          loaderSite.style.borderRadius = '10px 10px 10px 10px'
        }, 1000)
      }, 50)
      setTimeout(() => {
        loaderSite.style.animation = ''
        loaderSite.style.borderRadius = '10px'
        setTimeout(() => {
          loaderSite.style.left = '4.8%'
        }, 500)
        setTimeout(() => {
          loaderSite.style.top = '6.5%'
        }, 850)
        setTimeout(() => {
          loaderSitePizza.style.opacity = '0'
          loaderSitePizza.remove()
        }, 980)
        setTimeout(() => {
          loaderSite.style.width = '2%'
        }, 1650)
        setTimeout(() => {
          wrapper.style.height = '50px'
          setTimeout(() => {
            loaderSite.style.opacity = '0'
          }, 50)
          setTimeout(() => {
            loaderSite.remove()
          }, 250)
          setTimeout(() => {
            wrapper.style.width = '92%'
          }, 280)
          setTimeout(() => {
            wrapper.style.height = '100%'
            wrapper.style.paddingBottom = '90px'
            wrapper.style.width = 'calc(100vw - 100px)'
          }, 500)
        }, 2400)
      }, 1560)
    }

    setTimeout(async () => {
      if (user.value === null) {
        return
      } else {
        await store.dispatch('getCurrentUser')
      }
    }, 7000)
    onMounted(() => {
      setTimeout(() => {
        handleLoaderSite()
      }, 500)
    })
    return { user, logo, handleShowSideBar, showSideBar, handleLoaderSite }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
.backdrop {
  position: absolute;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100vh;
  opacity: 0;
  display: none;
  z-index: 2;
  &.active {
    display: block;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.loader__site {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(50%, -50%);
  height: 49.5px;
  border-radius: 0;
  width: 49.5px;
  background: rgb(211, 1, 1);
  box-sizing: border-box;
  box-shadow: 20px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  &_inside {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .loader__site_image {
      transition: 0.5s;
      transform: rotate(90deg);
    }
  }
}
.laoder_test_site {
  transition: 0.5s;
}
.wrapper {
  // padding-bottom: 90px;
  // width: calc(100vw - 100px);
  // height: 100%;
  // background-color: #fff;
  // margin: 50px auto;
  // border-radius: 10px;
  // max-width: 1400px;
  // overflow: hidden;

  height: 0;
  background-color: #fff;
  margin: 50px 42px auto;
  border-radius: 10px;
  width: 0;
  overflow: hidden;
  transition: 1s;
}
</style>
