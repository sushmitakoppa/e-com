<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey lighten-3 "
      dark
      class="py-2"
      height="60"
    >
      <div class="d-flex align-center"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://img.icons8.com/pastel-glyph/344/wedding-dress.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-tabs align-with-title 
      height="50" >
          <v-tab to="/shop" >Shop</v-tab>
          <v-tab to="/cart" >Cart</v-tab>
          
        </v-tabs>
      <v-spacer></v-spacer>
      <div>
        <span class="mx-5"> 
      <v-badge
          color="green"
          :content="CartsData"
          overlap
          class=""
        >
        <v-avatar
        width='35'
        height="35" >
      <img
      class="shrink"
        src="https://img.icons8.com/ios/344/shopping-cart.png "
        alt="User"
      >
    </v-avatar>
          <!-- Item Two -->
        </v-badge>
        </span>
        
        <!-- <v-avatar
        width='40'
        height="40"
        >
      <img
      class="shrink "
        src="https://img.icons8.com/ios/344/user-male-circle.png "
        alt="User"
        width="40"
      >
      
    </v-avatar> -->
      </div>   
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: 'App',
  component:{
    Footer
  },
  data: () => ({
    //
  }),
  mounted(){
          this.getCardData()
        },
  computed:{
          CartsData:{
            get(){
              let cartsLength =0
              if(this.$store.state.carts.length>0){
               cartsLength=this.$store.state.carts.length 
              }
              
              return cartsLength
            }
          },
        },
        methods:{
          async getCardData(){
              await this.$store.dispatch("getAllCartsData")
              .then((res)=>{
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
               
            }
        }
};
</script>
