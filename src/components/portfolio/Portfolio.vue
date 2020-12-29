<template>
  <div class="container">
    <div class="panel panel-success funds">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ formattedFunds }}
        </h3>
      </div>
    </div>
    <div class="panel panel-success funds">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ formattedBalance }}
        </h3>
      </div>
    </div>
    <div class="panel panel-danger funds" v-if="lowFunds">
      <div class="panel-heading">
        <h3 class="panel-title">You are running low on funds!</h3>
      </div>
    </div>
    <app-stock
      v-for="stock in stocks"
      :key="stock.id"
      :stock="stock"
      :active="activeStock === stock.id"
      @stock-activated="activateStock"
    ></app-stock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';

export default {
  data() {
    return {
      activeStock: 0,
    };
  },
  created() {
    console.log('portfolio created');
    this.activateStock(0);
  },
  computed: {
    formattedFunds() {
      return 'Available Funds: $' + this.funds;
    },
    formattedBalance() {
      let prices = this.stocks.map((stock) => stock.price * stock.quantity);
      const sum = prices.reduce((a, b) => {
        return a + b;
      }, 0);
      return 'Portfolio Balance: $' + sum;
    },
    lowFunds() {
      return this.funds <= 5000;
    },
    ...mapGetters({
      funds: 'funds',
      stocks: 'stockPortfolio'
    }),
  },
  methods: {
    activateStock($event) {
      if ($event === this.activeStock) {
        console.log('clear inactive');
        this.activeStock = 0;
        this.$nextTick(() => {
          document
          .querySelectorAll('.portfolio-position')
          .forEach((el) => {
            el.classList.remove('inactive');
          });
        });
      } else {
        console.log('set active');
        this.activeStock = $event;
        let stockId = this.activeStock;
        this.$nextTick(() => {
          document
          .querySelectorAll('.portfolio-position')
          .forEach((el) => {
            if (el.id != stockId) el.classList.add('inactive');
          });
        });
      }
    },
  },
  components: {
    appStock: Stock,
  },
};
</script>

<style scoped>
.funds {
  display: inline-block;
}
</style>
