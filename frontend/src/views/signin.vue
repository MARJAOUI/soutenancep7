<template>
    <Header lien = "" msg = ""/>
        <div id="container">
            <h1 class="titre is-size-1">Veuillez vous connecter SVP</h1>
            <div id="formulaire">
                <label class="form_col_label" for="contact_email">Email</label>
                <input class="form_col_champ" name="contact_email" type="Email" v-model="user.email" required >
                <br /><br />

                <label class="form_col_label" for="contact_password">Password </label>
                <input class="form_col_champ" name="contact_password" type="Password" v-model="user.password" required >
                <br /><br />
                
                <input  @click="connection" id="valider_login"  type="submit" class="btn" value="Valider " />
            </div>
        </div>
    <Footer />
</template> 

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from "axios";
export default {
    name: "Signin",
    components: {
        Header, Footer
    },
    data() {
        return {
            user: { email: null, password: null, },
        };
    },
    mounted() {
        console.log(this.$route);
    },
    methods: {
        lien () {
            this.$router.push({ path: "/MessageManage" });
        },
        connection () {
            const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization : 'token',
                    }
                };
            axios.post('http://localhost:3000/api/users/login', {
                    email     : this.user.email,
                    password  : this.user.password,
            },
            config
            )
            .then((response) => {
                this.$router.push({ path: "/MessageManage"});
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                }) 
            .catch(() => {
                window.alert('Email ou password incorrect');
                 window.location.reload();

            }) 
        },
    }
};
</script>

<style>
#container {
   background-color: #ffd9d9;
}
.titre {
    color: #122442;
    font-size: 25px;
    margin-bottom: 30px;
    padding-top: 150px;
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
#valider_login{
    background:  #F4511E;          
	color: black;
    width: 200px;
	margin-left: 120px;
	margin-bottom: 100px;
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
</style>