import Vue from 'vue';
import Router from 'vue-router';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import Vuex from 'vuex';

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
