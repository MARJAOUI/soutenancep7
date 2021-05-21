<template>
    <div id="header">
        <input  @click="accueil" id="bouton"  type="submit" class="btn_4" value="Deconnection " />
        <img class="image_header"   src="../assets/images/icon-left-font2.png"  >
        <input  @click="user" id="bouton"  type="submit" class="btn_4" value="Gestion du profile " />
    </div>
</template>

<script>
export default {
    methods : {
        accueil () {
            this.$router.push({ path: "/" });
        },
        user () {
            this.$router.push({ path: "/ProfileManage" });
        }
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
    margin-top: 0;
}
#bouton {
    background-color: #ffd9d9;
    color:  #F4511E;
    border: 0;
    text-decoration: bold;
}
</style>