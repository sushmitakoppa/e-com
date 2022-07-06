import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: [],
    products: [],
    product: {},
  },
  mutations: {
    updateAllProducts(state, payload) {
      state.products = payload;
    },
    updateProduct(state, payload) {
      state.product = payload;
    },
    updatecarts(state, payload) {
      state.carts = payload;
    },
  },
  actions: {
    getAllProducts: (vueContext) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/items")
          .then((res) => {
            if (res.status == 200) {
              vueContext.commit("updateAllProducts", res.data);
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getProductById: (vueContext, payload) => {
      

      if (payload) {
        // let config = {
        //   params: {
        //     id: payload,
        //   },
        // };
        return new Promise((resolve, reject) => {
          axios
            .get("/items/" + payload)
            .then((res) => {
              if (res.status == 200) {
                vueContext.commit("updateProduct", res.data);
                resolve(res);
              } else {
                reject(res);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    },
    getAllCartsData: (vueContext) => {
      

      return new Promise((resolve, reject) => {
        axios
          .get("/cart")
          .then((res) => {
            if (res.status == 200) {
              vueContext.commit("updatecarts", res.data);
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addToCart: (vueContext, payload) => {
      

      if (payload) {
        let param = { itemId: payload.itemId, quantity: payload.quantity };
        return new Promise((resolve, reject) => {
          axios
            .post("/cart", param)
            .then((res) => {
              if (res.status == 200) {
                resolve(res);
              } else {
                reject(res);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    },
    deleteFromCart: (vueContext, payload) => {
      

      if (payload) {
        let config = {
          params: {
            itemId: payload,
          },
        };
        return new Promise((resolve, reject) => {
          axios
            .delete("/cart", config)
            .then((res) => {
              if (res.status == 200) {
              vueContext.dispatch("getAllCartsData");
                resolve(res);
              } else {
                reject(res);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    },
  },
  modules: {},
});
