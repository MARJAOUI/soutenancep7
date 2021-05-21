<template>
    <Header2 />
    
        <div id="container">
            <ConnectedProfile />
            <div class="flex">
                <p id="message_accueil"> Annuaire Utilisateurs  </p>
                <ul class="list flex" >
                    <li v-for="user in users " :key="user.id"    >  
                        <div id="cadre">  
                            <p class="texte"><span >Nom: </span>{{user.nom}}</p>
                            <p class="texte"><span >Prenom: </span>{{user.prenom}}</p>
                            <p class="texte"><span >Email: </span>{{user.email}}</p>
                            <p class="texte"><span>Créé le: </span>{{getTime(user.createdAt)}}</p>
                            <br />
                        </div> 
                            <div>
                                <input @click="()=> deleteUser(user.id)" id="supprimer user"  type="hidden" class="btn"   value="Supprimer User" /> 
                            </div>   
                        <div id="hr"> <hr id="hr"> </div> 
                    </li >
                </ul>
            </div>    
        </div>
    <Footer />  
</template>
<script>
import ConnectedProfile from '@/components/ConnectedProfile.vue';
import Header2 from '@/components/Header2.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
import moment from 'moment';
export default {
    name: 'DisplayMessages',
    components: {
      Header2, Footer, ConnectedProfile
    },
    data() { 
        return { 
            users: "",
        }
    },
    props: {
  },
    mounted(){  
        const config = {
        headers: { Authorization: "Bearer " + localStorage.token } 
        }
        axios.get("http://localhost:3000/api/users/display", config )
            .then(response => {
                const data = response.data;
                this.users = data;
            });
    },
    methods: {
        deleteUser (userId) {
            const config = {
            headers: { Authorization: "Bearer " + localStorage.token } 
            }
            axios.delete('http://localhost:3000/api/users/delete/' + userId, config )
            .then(()  => {
                window.alert('le user a été supprimé !')
                 window.location.reload();
            })  
            .catch(() => {
                window.alert("le user n'a pas été supprimé  !")
            });
        },
         getTime(createdAt) {
            return moment(createdAt).format('LLL');
        }
    }
}   
</script>

<style>
#container {
    background-color: #ffd9d9;
}
.flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
}
#message_accueil {
    color: #f57a54;
    font-size: 25px;
    text-decoration: underline;
}
.list {
    list-style-type: none;
    width: 400px;
}
#hr {
  height: 15px;
  background-color:  black;
  border: none;
}
span {
    color: red;
}
.texte {
    font-size: 15px;
    text-align: left;
    margin-left: 10px;  
}
.btn {
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #F4511E;
  text-decoration: none;
}
#cadre {
    
    box-shadow: 5px 5px 8px #bb581e, -5px -5px 8px #bb581e;
    border-radius: 3%;
    background-color: cornflowerblue;
    height: 150px;
}
.flex_entete {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>