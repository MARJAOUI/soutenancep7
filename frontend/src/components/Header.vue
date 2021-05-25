<template>
    <div id="header">
         <input  @click="accueil" id="bouton"  type="submit" class="btn_4" value="Deconnection" />
         <img class="image_header"   src="../assets/images/icon-left-font2.png"  >
         <router-link id="bouton2" v-bind:to="lien">{{msg}}  </router-link>
        <!--<input  @click="{lien}" id="bouton"  type="submit" class="btn_4"  />  h3 -->
    </div>
</template>

<script>
export default {
    methods : {
        accueil () {
            this.$router.push({ path: "/" });
        },
        
    },
    props : {
        lien:  String,
        msg: String,
    }   
}
</script>

<style>
#header {
    height: 100px;
    background-color:  #F4511E;
    display: flex;
    -ms-flex-align: row;
    justify-content: space-around;
}
#bouton {
    background-color: #ffd9d9;
    color:  #F4511E;
    border: 0;
    text-decoration: bold;
}
#bouton2 {
    background-color: #ffd9d9;
    color:  #F4511E;
    border: 0;
    padding-top: 35px;
    text-decoration: none;
}
</style>