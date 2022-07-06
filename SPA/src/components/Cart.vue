<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12" >
          <v-simple-table v-if="CartsData.length>0">
            <template v-slot:default> 
              <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr
              v-for="cart in CartsData"
              :key="cart._id"
              >
                <td>
                  <!-- @click="routeToProduct" -->

                  <v-list-item
                  :key="cart._id"
                >
                  <v-list-item-avatar>
                    <v-img :src="cart.items[0].product_img"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title >{{cart.items[0].name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item></td>
                <td>${{cart.items[0].price}}</td>
                <td>
                  <v-text-field
                  readonly
                    class="pt-10"
                    label="Outlined"
                    style="width: 80px;"
                    single-line
                    outlined
                    :value="cart.items[0].quantity"
                    type="number"
                  ></v-text-field>
                </td>
                <td>${{cart.bill}}</td>
                <td>
                  <a
                  @click="deleteFromCart(cart._id)">X</a>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <span v-else>
            <h2>
              No items in Carts!!!!
            </h2>
          </span>
        </v-col>
        <v-col
        v-if="CartsData.length>0"
         :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">Shipping and additional costs are calculated based on values you have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Order Subtotal</td>
                <td class="text-right" style="width: 50px;">${{totalBill[0]}}</td>
              </tr>
              <tr>
                <td>Shipping Charges</td>
                <td class="text-right" style="width: 50px;">$10.00</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td class="text-right" style="width: 50px;">$5.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>${{totalBill[1]}}</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined>PROCEED TO PAY</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-card  class="accent" >
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">+91 9999988888</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
    export default {
        data: () => ({
            rating: 4.5,
            breadcrums: [
                {
                    text: 'Home',
                    disabled: false,
                    href: 'breadcrumbs_home',
                },
                {
                    text: 'Clothing',
                    disabled: false,
                    href: 'breadcrumbs_clothing',
                },
                {
                    text: 'T-Shirts',
                    disabled: true,
                    href: 'breadcrumbs_shirts',
                },
            ],
        }),
        methods:{
            async getCardData(){
              await this.$store.dispatch("getAllCartsData")
              .then((res)=>{
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
               
            },
            async deleteFromCart(id){
              await this.$store.dispatch("deleteFromCart",id)
              .then((res)=>{
                this.getCardData()
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
               
            }
        },
        mounted(){
          this.getCardData()
        },
        computed:{
          CartsData:{
            get(){
              return this.$store.state.carts
            }
          },
          totalBill:{
            get(){
              let total=0
              this.CartsData
              this.CartsData.forEach(Cart => {
                total=total+Cart .bill
              });
              let totalWithTax=total+10+5
              return [total,totalWithTax]
            }
          }
        }
    }
</script>
