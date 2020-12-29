<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <!-- <div class="col-xs-12"> -->
        <router-view></router-view>
      <!-- </div> -->
    </div>
    <div style="padding-top: 30px">
      <button class="btn btn-success" @click="testBuy">Test Buy Stocks</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from './components/Header.vue';

export default {
  created() {
    this.initStocks();
  },
  methods: {
    testBuy() {
      console.log('test buy');
      const stocks = this.$store.getters.stocks;
      const store = this.$store;
      stocks.forEach((stock) => {
        const order = {
          stockId: stock.id,
          stockPrice: stock.price,
          quantity: 3,
        };
        store.dispatch('buyStock', order);
      });
    },
    ...mapActions([
      'initStocks'
    ])
  },
  components: {
    appHeader: Header,
  },
};
</script>

<style>
body {
  padding: 30px;
}
</style>
