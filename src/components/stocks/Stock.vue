<template>
  <div class="col-sm-6 col-lg-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.ticker }}
          <small class="pull-right">${{ stock.price }}</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input      
            type="number"
            class="form-control"
            v-model="quantity"
            placeholder="quantity"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            @click="buyStock"
            :disabled="quantity <= 0 || !Number.isInteger(parseInt(quantity)) || lowFunds"
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    lowFunds() {
      return this.stock.price * this.quantity > this.$store.getters.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.buy(order);
      this.quantity = 0;
    },
    ...mapActions({
      buy: 'buyStock'
    })
  },
};
</script>
