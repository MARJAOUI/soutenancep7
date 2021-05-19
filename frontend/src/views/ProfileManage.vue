<template>
  <Header3 />
    <div id="nav" >
      <router-link id="btn" v-bind:to="'/ModifyUser/'">Modifier Profil  </router-link>
      <router-link id="btn" v-bind:to="'/DeleteUser'">Supprimer Profil  </router-link>
      <router-link id="btn" v-bind:to="'/DisplayUsers/'">Annuaire Utilisateurs  </router-link>
    </div>
    <div><hr></div>
      <img alt="Vue logo" src="../assets/images/profil.jpg">  
    <div class="home">
      <img alt="Vue logo" src="../assets/images/icon-above-font2.png">  
    </div>
    <router-view/>
  <Footer />
</template>
<script>
import Header3 from '@/components/Header3.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'User',
  data () {
       return {
         users:  "",
       }
  },
  components: { 
      Header3, Footer
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
#nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
 hr {
  height: 7px;
  background-color:  #F4511E;
  border: none;
}
</style>
