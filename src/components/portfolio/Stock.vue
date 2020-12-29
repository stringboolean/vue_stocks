<template>
  <div :class="['panel', 'panel-success', 'portfolio-position', { inactive: !active }]" :id="stock.id">
    <div
      class="panel-heading"
      @click.capture="$emit('stock-activated', stock.id)"
    >
      <div class="stock-row" v-for="(val, key) in stockInfo" :key="key">
        <component
          :is="key == 'ticker' ? 'h3' : 'span'"
          :class="{ 'panel-title': key == 'ticker' }"
          >{{ val }}</component
        >
      </div>
    </div>
    <transition name="slider" mode="in-out">
      <div class="panel-body" v-if="active">
        <div class="profit pull-left" v-if="quantity > 0">
          <div class="form-control">{{ profit }}</div>
        </div>
        <div class="quantity pull-left">
          <input
            type="number"
            class="form-control"
            v-model="quantity"
            placeholder="quantity"
          />
        </div>
        <div class="pull-left">
          <button
            class="btn btn-success"
            @click="sellStock"
            :disabled="quantity <= 0 || !Number.isInteger(parseInt(quantity))"
          >
            SELL
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['stock', 'active'],
  data() {
    return {
      quantity: 0,
    };
  },
  watch: {
    quantity() {
      if (this.quantity < 0) this.quantity = 0;
      if (this.quantity > this.stock.quantity)
        this.quantity = this.stock.quantity;
    },
  },
  computed: {
    stockInfo() {
      return {
        ticker: this.stock.ticker,
        quantity: this.stock.quantity,
        price: '$' + this.stock.price,
        total: '$' + this.stock.price * this.stock.quantity,
      };
    },
    profit() {
      return '+$' + this.stock.price * this.quantity;
    },
  },
  methods: {
    sellStock() {
      const order = {
        stockId: this.stock.id,
        quantity: this.quantity,
        stockPrice: this.stock.price,
      };
      this.sell(order);
      // emits event to call removal of inactive class from other stocks if you sell 100% of the shares for active stock
      if (this.quantity == this.stock.quantity) this.$emit('stock-activated', this.stock.id);
      this.quantity = 0;
    },
    ...mapActions({
      sell: 'sellStock'
    })
  },
};
</script>

<style scoped>
.panel {
  margin-bottom: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.panel-body {
  position: absolute;
  top: -12px;
  right: 0px;
  transition: right 0.25s ease-in;
}

.stock-row {
  display: inline-block;
  width: 25%;
}

.inactive {
  border-color: gray;
}

.inactive .panel-heading {
  background-color: lightgray;
  color: darkgray;
  border-color: gray;
}

.profit {
  position: relative;
}
.profit > div {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}

.arrow-right {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; /* 40px height (20+20) */
  border-left: 20px solid #4cae4c;
  position: absolute;
  right: -20px;
}

.quantity {
  margin-right: 15px;
}

/* transition */
.slider-enter-active,
.slider-leave-active {
}

.slider-enter,
.slider-leave-to {
  right: -300px;
}
</style>
