<template>
  <transition>
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content-food">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <price class="price" :food="food"></price>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import price from 'components/price/price';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    },
    components: {
      price
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transition: all 0.2s linear
  .food.v-enter-active
      transform: translate3d(100%,0,0)
  .food.v-leave-active
      transform: translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content-food
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weigth: 700
        color: rbg(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        .sell-count,.rating
          font-size: 10px
          color: rbg(147,152,159)
        .sell-count
          margin-left: 12px
</style>
