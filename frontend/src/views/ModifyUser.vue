<template>
    <Header2 />
    <ConnectedProfile />
        <div id="container ">
            <h1 class="titre is-size-1">Modifier et Valider </h1>
            <div id="formulaire">
                <label class="form_col_label" for="contact_nom">Nom </label>
                <input class="form_col_champ" name="contact_nom"  type="text" placeholder= Nom v-model="user.nom"  > 
                <br /><br />

                <label class="form_col_label" for="contact_prenom">Prénom </label>
                <input class="form_col_champ" name="contact_prenom"  type="text" placeholder= Prenom v-model="user.prenom"  >
                <br /><br />
                
                <label class="form_col_label" for="contact_email">Email </label>
                <input class="form_col_champ" name="password"    type="Email"  placeholder= Email v-model="user.email" >
                <br /><br />

                <label class="form_col_label" for="pass">Password </label>
                <input class="form_col_champ" name="password" id="pass"   type="password"  placeholder= "+8car +1min +1maj +1num" v-model="user.password" >
                <br /><br />
                <div class="marge_btn">              
                    <div><input @click="modification" class="btn" type="submit" value="Soumettre" /> </div>
                    <div><input type="checkbox" @click="showMDP()"> <p>Show Password </p> </div>
                </div>
            </div>
        </div>
    <Footer />
</template>

<script>
import ConnectedProfile from '@/components/ConnectedProfile.vue'
import Header2 from '@/components/Header2.vue';
import Footer from '@/components/Footer.vue';
import axios from "axios";
export default {
    name: "ModifyUser",
    components: {
        Header2, Footer, ConnectedProfile  
    },
    data() {
        return {
            user: "",
        }
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
        modification () {
            const config = {
                    headers: { Authorization: "Bearer " + localStorage.token } 
                    }
            axios.put('http://localhost:3000/api/users/modify/' + this.user.id , {
                nom       : this.user.nom,
                prenom    : this.user.prenom,
                email     : this.user.email,
                isAdmin   : this.user.isAdmin,
                password  : this.user.password,
            },
            config
            )
            .then(() => {
                window.alert('user modifié avec succés !');
                this.$router.push({ path: "/ProfileManage/" });  
                })  
            .catch(err => console.error(err));
        },
         showMDP() {
            var hidePwd = document.getElementById("pass");
            if (hidePwd.type === "password") {
                hidePwd.type = "text";
            } else {
                hidePwd.type = "password";
            }
        }
    }
}
</script>

<style>
#formulaire{
    align-items: center;
}
.titre {
    color: #122442;
    margin: 50px 0 50px 0;
}
.form_col_label {
    display: inline-block;
    margin-right: 15px;
    padding: 3px 0px;
    width: 100px;
    min-height: 1px;
    text-align: left;
}
.form_col_champ{
   width: 200px;
   height: 25px;   
}
.btn {
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  background-color:  #F4511E;
}
.marge_btn {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 50px;
}
</style>