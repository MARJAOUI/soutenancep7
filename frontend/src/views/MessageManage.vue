<template>
  <Header2 />
    <h1> Gestion de vos messages </h1>
    <div id="nav" class="boutons">
      <router-link id="btn" v-bind:to="'/DisplayMessages'">Liste des Messages  </router-link>
      <router-link id="btn" v-bind:to="'/CreateMessage'">Créer un  Message  </router-link>
    </div>
    <div class="hr"><hr></div>
    <ConnectedProfile />
      <img alt="Vue logo" src="../assets/images/entreprise2.png">  
    <div class="home">
      <img alt="Vue logo" src="../assets/images/icon-above-font2.png">  
    </div>
    <p id="profil_connecté">Profil Connecté : {{user.nom}} {{user.prenom}}</p>
    <router-view/>
  <Footer />
</template>
<script>
import axios from 'axios';
import ConnectedProfile from '@/components/ConnectedProfile.vue';
import Footer from  '@/components/Footer.vue';
import Header2 from '@/components/Header2.vue';
export default {
  name: 'User',
  data () {
       return {
         messages:  "",
         user: "",
       }
  },
  components: { 
      Header2, Footer, ConnectedProfile  
  },
  mounted(){ 
        const config = {
        headers: { Authorization: "Bearer " + localStorage.token } 
        }
        axios.get("http://localhost:3000/api/users/me/" + this.user.id ,config )
            .then(res => {
                    const data = res.data;
                    this.user = data;
            });
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
 .hr {
  height: 5px;
  background-color:  #F4511E;
  border: none;
}
#profil_connecté{
  text-align: right;
  font-size: 15px;
  font-weight: bold; 
}
</style>
