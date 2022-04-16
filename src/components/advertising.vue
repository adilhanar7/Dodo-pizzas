<template>
  <div class="clicker">
    <span @click="handleShow">
      <svg
        :class="{ active: showAdvertising }"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      <b>Открыть рекламу</b>
    </span>
  </div>
  <div class="advertising" v-if="showAdvertising">
    <div @mousemove="animationFrameAdver">
      <img :src="filmsTvDodo" class="advertising__animation-image films" />
    </div>
    <div @mousemove="animationFrameAdver">
      <img :src="CoffeMilkSheik" class="advertising__animation-image coffee" />
    </div>
    <div @mousemove="animationFrameAdver">
      <img :src="SaleOnPizza" class="advertising__animation-image pizza" />
    </div>
    <div @mousemove="animationFrameAdver">
      <img :src="Doster" class="advertising__animation-image doster" />
    </div>
    <div @mousemove="animationFrameAdver">
      <img
        :src="PizzaKarboNara"
        class="advertising__animation-image pizzakrab"
      />
    </div>
  </div>
</template>

<script>
import CoffeMilkSheik from '@/assets/img/CoffeMilkSheik.png'
import Doster from '@/assets/img/Doster.png'
import PizzaKarboNara from '@/assets/img/PizzaKarboNara.png'
import SaleOnPizza from '@/assets/img/SaleOnPizza.png'
import filmsTvDodo from '@/assets/img/filmsTvDodo.png'
import { ref } from '@vue/reactivity'
import gsap from 'gsap'
export default {
  setup() {
    const showAdvertising = ref(false)
    const handleShow = () => {
      showAdvertising.value = !showAdvertising.value
    }
    const animationFrameAdver = (event) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const clientX = event.pageX
      const clientY = event.pageY
      const dx = clientX - cx
      const dy = clientY - cy
      const titlx = dy / cy
      const titly = dx / cx
      const radius = Math.sqrt(Math.pow(titlx, 2) + Math.pow(titly, 2))
      const degree = radius * 34
      if (event.target.classList.contains('films')) {
        gsap.to('.films', 0.5, {
          transform: `rotate3d( ${titlx} , ${titly} , 0 , ${degree}deg )`,
        })
        document.querySelector(
          '.films'
        ).style.boxShadow = `14px 10px 10px ${Math.round(degree)}px rgba(${
          radius * 18 * 42
        },${radius * 18 * 12},${Math.round(degree)},0.4)`
      }
      if (event.target.classList.contains('coffee')) {
        gsap.to('.coffee', 0.5, {
          transform: `rotate3d( ${titlx} , ${titly} , 0 , ${degree}deg )`,
        })
        document.querySelector(
          '.coffee'
        ).style.boxShadow = `14px 10px 10px ${Math.round(degree)}px rgba(${
          radius * 18 * 42
        },${radius * 18 * 12},${Math.round(degree)},0.4)`
      }
      if (event.target.classList.contains('pizza')) {
        gsap.to('.pizza', 0.5, {
          transform: `rotate3d( ${titlx} , ${titly} , 0 , ${degree}deg )`,
        })
        document.querySelector(
          '.pizza'
        ).style.boxShadow = `14px 10px 10px ${Math.round(degree)}px rgba(${
          radius * 18 * 42
        },${radius * 18 * 12},${Math.round(degree)},0.4)`
      }
      if (event.target.classList.contains('doster')) {
        gsap.to('.doster', 0.5, {
          transform: `rotate3d( ${titlx} , ${titly} , 0 , ${degree}deg )`,
        })
        document.querySelector(
          '.doster'
        ).style.boxShadow = `14px 10px 10px ${Math.round(degree)}px rgba(${
          radius * 18 * 42
        },${radius * 18 * 12},${Math.round(degree)},0.4)`
      }
      if (event.target.classList.contains('pizzakrab')) {
        gsap.to('.pizzakrab', 0.5, {
          transform: `rotate3d( ${titlx} , ${titly} , 0 , ${degree}deg )`,
        })
        document.querySelector(
          '.pizzakrab'
        ).style.boxShadow = `14px 10px 10px ${Math.round(degree)}px rgba(${
          radius * 18 * 42
        },${radius * 18 * 12},${Math.round(degree)},0.4)`
      }
    }
    return {
      animationFrameAdver,
      handleShow,
      showAdvertising,
      CoffeMilkSheik,
      Doster,
      PizzaKarboNara,
      SaleOnPizza,
      filmsTvDodo,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
.clicker {
  cursor: pointer;
  svg {
    margin-right: 8px;
    transform: rotate(180deg);
    transition: 0.4s;
    &.active {
      transform: rotate(0);
    }
  }
  b {
    margin-right: 8px;
  }
}
.advertising {
  display: flex;
  flex-wrap: wrap;
  div {
    background: none;
    border: none;
    img {
      margin-left: 40px;
      margin-top: 20px;
      display: inline-block;
      cursor: pointer;
      background: none;
      border: none;
      border-radius: 20px;
    }
  }
}
</style>
