<template>
  <Header2 />
  <ConnectedProfile />
    <div id="nav" class="boutons">
      <input @click="suppression" id="supprimer user"  type="submit" class="btn"   value="Veuiller confirmer la suppression du User" />  
    </div>
    <div class="home">
      <img alt="Vue logo" src="../assets/images/icon-above-font2.png">  
    </div>
    <router-view/>
  <Footer />
</template>
<script>
import ConnectedProfile from '@/components/ConnectedProfile.vue'
import Header2 from '@/components/Header2.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
  name: "DeleteUser",
  data() {
    return {
      user: "",
    }
  },
  components: { 
    Header2, Footer, ConnectedProfile
  },
  mounted(userId){  
    const config = {
        headers: { Authorization: "Bearer " + localStorage.token } 
    }
    axios.get("http://localhost:3000/api/users/me/" + userId , config )
      .then(res => {
        const data = res.data;
        this.user = data;
      });   
  },
  methods :{
    suppression () {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.token } 
      }
      axios.delete('http://localhost:3000/api/users/delete/' + this.user.id, config )
      .then(()  => {
        this.$router.push({ path: "/" });
        window.alert('le user a été supprimé !')
      })  
      .catch(() => {
      window.alert(" supprimer tous vos messages ou Assurez vous d'être le propriétaire de ce profil !")
      });
    }
  }  
}
</script>
<style>
.btn {
  border: 0;
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
</style>
