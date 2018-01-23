<template>
  <div class="cartcontrol">
    <transition>
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <span class="inner  icon-remove_circle_outline"></span>
      </div>
    </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import '@/common/stylus/icon.styl';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart($event) {
        if (!event._constructed) {
          console.log(event.target.tagName);
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          // this.$set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
        this.$emit('cartAdd', $event.target);
      },
      decreaseCart($event) {
        if (!event._constructed) {
          console.log(event.target.tagName);
          return;
        }
        if (this.food.count) {
          this.food.count --;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      .inner
        line-height: 24px
        font-size 24px
        color: rgb(0,160,220)
    .cart-decrease.v-enter
      opacity: 0
      transform: translate3D(24px, 0, 0) rotate(180deg)
    .cart-decrease.v-enter-to
      transition: all 0.5s linear
      opacity: 1
    .cart-decrease.v-leave-active
      transition: all 0.5s linear
    .cart-decrease.v-leave-to
      opacity: 0
      transform: translate3D(24px, 0, 0) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size 24px
      color: rgb(0,160,220)


</style>
