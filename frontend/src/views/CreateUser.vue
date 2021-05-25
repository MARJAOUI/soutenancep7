<template>
    <Header lien = "" msg="" />
        <div class="container forms">
            <h1 >Valider votre inscription</h1>
            <div id="formulaire">
                <label class="form_col_label" for="contact_nom"  >Nom </label>
                <input class="form_col_champ" name="contact_nom"  placeholder="Min 4 Max 20 char" type="text" v-model="user.nom"  > 
                <br /><br />

                <label class="form_col_label" for="contact_prenom" >Prénom </label>
                <input class="form_col_champ" name="contact_prenom"  placeholder="Min 4 Max 20 char" type="text" v-model="user.prenom"  >
                <br /><br />
                
                <label class="form_col_label" for="contact_email" >Email </label>
                <input class="form_col_champ" name="contact_email"  placeholder="Format E-Mail" type="Email" v-model="user.email" >
                <br /><br />

           <!-- <label class="form_col_label" for="contact_isAdmin" >isAdmin </label>
                <input class="form_col_champ" name="contact_isAdmin"  placeholder="false or true" type="boolean" v-model="user.isAdmin" >
                <br /><br /> -->

                <label class="form_col_label" for="pass" >Password </label>
                <input class="form_col_champ" name="password" id="pass"   type="Password" placeholder= "+8car +1min +1maj +1num"  v-model="user.password" >
                <br /><br />
                
                <div class="marge_btn">              
                    <div><input @click="inscription" class="btn" type="submit" value="Soumettre" /> </div>
                    <div><input type="checkbox" @click="showMDP()"> <p>Show Password </p> </div>
                </div>
            </div>
        </div>
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from "axios";
export default {
    name: "Signup",
    components: {
        Header, Footer
    },
    data() {
        return {
            user : {nom: null , prenom: null, email: null, password: null, id: null, isAdmin: null }, //  
        }
    },
    methods :{
        inscription () {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : 'token'
                }
            };
            axios.post('http://localhost:3000/api/users/signup', {
                nom       : this.user.nom,
                prenom    : this.user.prenom,
                email     : this.user.email,
                password  : this.user.password,
                userId    : this.user.id,
                isAdmin   : this.user.isAdmin,
            },
            config )
            .then(() => {
                this.$router.push({ path: "/signin" });  
                })  
            .catch(() => {
                window.alert('Veuillez respecter les syntaxes svp !');
                window.location.reload();
            });
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
.forms {
    margin-top: 160px;
    margin-bottom: 175px;
}
.form_col_label{
    display: inline-block;
    margin-right: 15px;
    padding: 3px 0px;
    width: 100px;
    text-align: left;
}
#valider_signup{
	background:  #F4511E;          
	color: black;
    width: 200px;
	margin-left: 120px;
	margin-bottom: 100px;
}
#formulaire{
    align-items: center;
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
.form_col_champ{
 width: 200px;
 height: 25px;   
}
.marge_btn {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 50px;
}
</style>