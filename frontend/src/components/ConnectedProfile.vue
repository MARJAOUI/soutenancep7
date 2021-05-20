<template>
    <div id="connectedProfile">
       <p id="profil_connecté">Profil Connecté : {{user.nom}} {{user.prenom}}</p> 
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ConnectedProfile',
    data() {
    return {
        user: "",
    }  
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
    }
}
</script>

<style>
#profil_connecté{
  text-align: left;
  font-size: 15px;
  font-weight: bold; 
}
</style>