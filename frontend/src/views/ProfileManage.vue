<template>
  <Header lien =/MessageManage/ msg = "gestion des Messages" />
    <h1> Gestion de votre Profil </h1>
    <div id="nav" >
      <router-link id="btn" v-bind:to="'/ModifyUser/'">Modifier Profil  </router-link>
      <router-link id="btn" v-bind:to="'/DeleteUser'">Supprimer Profil  </router-link>
      <router-link id="btn" v-bind:to="'/DisplayUsers/'">Annuaire Utilisateurs  </router-link>
    </div>
    <div class="hr"><hr></div>
    <ConnectedProfile />

      <img alt="Vue logo" src="../assets/images/profil.jpg">  
    <div class="home">
      <img alt="Vue logo" src="../assets/images/icon-above-font2.png">  
    </div>
    <router-view/>
  <Footer />
</template>
<script>
import axios from 'axios';
import ConnectedProfile from '@/components/ConnectedProfile.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'User',
  data () {
    return {
      users:  "",
      user: "",
    }
  },
  components: { 
    Header, Footer, ConnectedProfile
  },
  methods :{
   /* lien () {
            this.$router.push({ path: "/MessageManage" });
    },*/
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
