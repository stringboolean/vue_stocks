const state = {
  funds: 20000,
  stocks: [],
};

function findRecord(stockId, stocks = state.stocks) {
  return stocks.find((stock) => stock.id === stockId);
};

const mutations = {
  'BUY_STOCK'(state, { stockId, quantity, stockPrice }) {
    const parsedQuantity = parseInt(quantity);
    const record = findRecord(stockId);
    if (record) {
      record.quantity += parsedQuantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity: parsedQuantity,
      });
    }
    state.funds -= stockPrice * quantity;
  },
  'SELL_STOCK'(state, { stockId, quantity, stockPrice }) {
    const parsedQuantity = parseInt(quantity);
    const record = findRecord(stockId);
    if (record.quantity > parsedQuantity) {
      record.quantity -= parsedQuantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * parsedQuantity;
  },
};

const actions = {
  sellStock({ commit }, order) {
    commit('SELL_STOCK', order);
  },
};

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map(stock => {
      const record = findRecord(stock.id, getters.stocks);
      return {
        id: stock.id,
        quantity: stock.quantity,
        ticker: record.ticker,
        price: record.price
      }
    });
  },
  funds(state) {
    return state.funds;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
