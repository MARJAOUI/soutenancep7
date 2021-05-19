<template>
  <Header2 />
    <div id="nav" class="boutons">
      <router-link id="btn" v-bind:to="'/DisplayMessages'">Liste des Messages  </router-link>
      <router-link id="btn" v-bind:to="'/CreateMessage'">Créer un  Message  </router-link>
    </div>
    <div><hr></div>
      <img alt="Vue logo" src="../assets/images/entreprise2.png">  
    <div class="home">
      <img alt="Vue logo" src="../assets/images/icon-above-font2.png">  
    </div>
    <router-view/>
  <Footer />
</template>
<script>
import Footer from  '@/components/Footer.vue';
import Header2 from '@/components/Header2.vue';
export default {
  name: 'User',
  data () {
       return {
         messages:  "",
       }
  },
  components: { 
      Header2, Footer  
  },
}
</script>
<style>
#btn {
  border: 5px;
  line-height: 2;
  padding: 0 20px;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #F4511E;
  text-decoration: none;
  color: black;
}
.boutons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
 hr {
  height: 5px;
  background-color:  #F4511E;
  border: none;
}
</style>
