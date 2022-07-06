<template>
  <div>
    <v-container  v-if="Object.keys(ProductData).length !== 0 ">
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
            :src="ProductData.product_img[0]" >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <div class="pl-6">
            <p class="display-1 mb-0">{{ProductData.name}}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">${{ProductData.price}} <del style="" class="subtitle-1 font-weight-thin">$80.00</del></p>
              <v-spacer></v-spacer>
              <v-rating v-model="rating" class="" background-color="warning lighten-3"
                        color="warning" dense></v-rating>
              <span class="body-2	font-weight-thin"> 25 REVIEWS</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ProductData.description}}
            </p>
            <p class="title">SIZE</p>
            <v-radio-group v-model="sizeValue">
              <v-radio label="XS" value="XS"></v-radio>
              <v-radio label="S" value="s"></v-radio>
              <v-radio label="M" value="m"></v-radio>
              <v-radio label="L" value="l"></v-radio>
              <v-radio label="XL" value="xl"></v-radio>
            </v-radio-group>
            <p class="title">ITEMS</p>

            <v-text-field
                outlined
                style="width:100px"
                v-model="Productvalue"
                dense
            ></v-text-field>
            <v-btn
            @click="addToCart()"
             class="primary white--text" 
             outlined tile dense>
             <v-icon>mdi-cart</v-icon> ADD TO CART</v-btn>
            <v-btn class="ml-4" outlined tile>ADD TO WISHLIST</v-btn>

          </div>
      </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab >Description</v-tab>
            <v-tab >Materials</v-tab>
            <v-tab>REVIEWS</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
               {{ProductData.description}}
               </p>
            </v-tab-item>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id leo in vitae turpis
                massa. Orci dapibus ultrices in iaculis nunc. At auctor urna nunc id cursus metus. Integer feugiat
                scelerisque varius morbi enim nunc. Aliquam sem et tortor consequat id porta nibh venenatis cras.
                Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Malesuada nunc vel risus
                commodo viverra maecenas. Neque volutpat ac tincidunt vitae semper quis.
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-list
                three-line="true"
                avatar="true"
              >
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    inactive="true"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="item.title"></v-list-item-title><v-rating v-model="rating" class="" background-color="warning lighten-3"
                                                                                           color="warning" dense></v-rating>
                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
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
          Productvalue:1,
          sizeValue:null,
            rating:4.5,
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
            item: 5,
            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Lorem ipsum dolor?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
                        "\n",
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Lorem ipsum dolor',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Lorem ipsum dolor',
                    subtitle: ""
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Lorem ipsum dolor',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },
            ],
        }),
        props:{
          id:String
        },
        methods:{
          async getProduct(){
            await this.$store.dispatch('getProductById',this.id)
            .then((res)=>{
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
          },
          async addToCart(){
            let data={
              itemId:this.id,
              quantity:this.Productvalue}
           await this.$store.dispatch('addToCart',data)
            .then((res)=>{
              this.$store.dispatch("getAllCartsData")
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            }) 
          }
        },
        mounted(){
          this.getProduct()
        },
        computed:{
          ProductData:{
            get(){
              return this.$store.state.product
            }
          }
        }
    }
</script>