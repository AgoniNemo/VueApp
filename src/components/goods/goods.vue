<template>
  <div class="goods">
    <div class="goods-content">
      <div class="menu-wrapper" ref="menu-wrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="food-wrapper">
          <ul>
            <li v-for="item in goods" class="foot-list foot-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li @click="selectFoodAction(food, $event)" v-for="food in item.foods" class="food-item border-1px">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                    </div>
                    <v-price class="price" :food="food"></v-price>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol @cartAdd="events" :food="food"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food @addFirst="events" :food="selectFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';
  import price from 'components/price/price';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i];
          let h2 = this.listHeight[i + 1];
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('api/goods').then((response) => {
        let resp = response.data;
        if (resp.errno === ERR_OK) {
          this.goods = resp.data;
          this.$nextTick(() => {
            /* 请求回来是异步的 所以只有在nextTick方法才能更新UI */
            this._initScroll();
            this._calculateHeight();
          });
        };
      })
      .catch(function (error) {
        console.log('error: ' + error);
      });
    },
    methods: {
      selectMenu(index, $event) {
        if (!event._constructed) {
          console.log(event.target.tagName);
          return;
        }
        let foodList = this.$refs['food-wrapper'].getElementsByClassName('foot-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFoodAction(food, $event) {
        if (!event._constructed) {
          console.log(event.target.tagName);
          return;
        }
        this.selectFood = food;
        this.$refs.food.show();
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs['food-wrapper'], {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs['food-wrapper'].getElementsByClassName('foot-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      events(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food,
      'v-price': price
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .goods
    .goods-content
      display: flex
      position: absolute
      top: 174px
      bottom: 46px
      width: 100%
      overflow: hidden
      .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          height: 54px
          width: 56px
          padding: 0 12px
          line-height: 14px
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            background: #fff
            font-weigth: 700
            .text
              border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('../../assets/goods/decrease_3')
            &.discount
              bg-image('../../assets/goods/discount_3')
            &.guarantee
              bg-image('../../assets/goods/guarantee_3')
            &.invoice
              bg-image('../../assets/goods/invoice_3')
            &.special
              bg-image('../../assets/goods/special_3')
          .text
            display: table-cell
            width: 56px
            vertical-align: middle
            border-1px(rgba(7,17,27,0.1))
            font-size: 12px
      .foods-wrapper
        flex: 1
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147,153,159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
            .desc, .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147,153,159)
            .desc
              line-height: 12px
              margin-bottom: 8px
            .extra
              .count
                margin-right: 12px
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px

</style>
