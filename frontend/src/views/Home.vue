<template>
  <div class="home">
    <div><hr></div>
    <div id="nav">
    <input  @click="inscription" id="btn"  type="submit"  value="Incsription " />
    <input  @click="identification" id="btn"  type="submit"  value="connection " />
    </div>
    <div><hr></div>
    <img alt="Vue logo" src="../assets/images/entreprise2.png">  
  </div>
    <p class="bienvenue"> <span>GROUPOMANIA </span>vous souhaite la bienvenue sur son réseau social </p>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/icon-above-font2.png">  
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
    }
  },
    components: {
    },
    methods : {
      inscription () {
            this.$router.push({ path: "/CreateUser" });
      },
      identification ()  {
            this.$router.push({ path: "/signin"  }); 
      },
   }
}
</script>
<style scoped>
.bienvenue {
  font-size: 30px;
  }
  span {
    font-weight: bold;
    color:  #F4511E;
  }
  #footer {
    margin-bottom: 0;
  }
  #nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  hr {
  height: 5px;
  background-color:  #F4511E;
  border: none;
}
#btn {
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

