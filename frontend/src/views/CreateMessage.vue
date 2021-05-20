<template>
<Header3 />
<ConnectedProfile />
    <form class="flex flex-col" @submit.prevent="AjoutMessage">
      <div class="container" >
        <h1 class="margeHB">Rédiger votre message </h1>
            <div id="formulaire">
              <label id='texte_aign' for="titre">Titre:</label>
              <input type="text"  name="titre" id="titre" v-model="titre"  >
              <br /><br />

              <label id='texte_aign' for="contenu">Texte:</label>
              <textarea  name="contenu" id="contenu" v-model="contenu">Texte:</textarea><br/>
              <br /><br />

               <input id="disabledImage " type="file" name="image"  @change="onFileUpload"  accept=".png, .jpg, .jpeg" >
              <br /><br />
              <div class="boutons">
                <button type="submit" class="btn"  >Soumettre</button> 
              </div>
            </div>
      </div>
    </form> 

    <br />
    <br />
  <Footer />
</template>

<script>
import ConnectedProfile from '@/components/ConnectedProfile.vue'
import Header3 from '@/components/Header3.vue'
import Footer from '@/components/Footer.vue'
import axios from "axios";
export default {
  data() {
    return {
        titre: "",
        contenu: "",
        selectedFile: "",
        id: "",
    }  
  },
  components: {
    Header3, Footer, ConnectedProfile
  },
 /* props: {
      required: {type: String, value: "false"},
      
  },
  mounted(){
    document.getElementById("disabledImage").removeAttribute("required");
  },*/
  methods: {
    
    deletAttribute() 
{
  var removeAttr = document.getElementById("disabledImage")
  removeAttr.removeAttribute("required");
  
},
    
    onFileUpload(evenement) {
          this.selectedFile = evenement.target.files[0];
    },
    AjoutMessage(e) {
      e.preventDefault();
      const bodyFormData = new FormData();
      bodyFormData.append('contenu', this.contenu);
      bodyFormData.append('titre', this.titre);
      bodyFormData.append('image', this.selectedFile); 
      axios({
        method: "post",
        url: "http://localhost:3000/api/messages/create", 
        //  récupération autorisation
          headers: { Authorization: "Bearer " + localStorage.token },
        data: bodyFormData,
      })
      .then((response) =>  {
        this.$router.push({ path: "/DisplayMessages" });
        console.log(response);
      })
      .catch(function (response) {
        window.alert('Veuiller compléter tous les champs svp !');
      //  window.location.reload();
        console.log(response);
      });
    },
  },
}
</script>

<style>
#texte_aign{
text-align: center;
}
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.boutons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
.margeHB{
  margin: 50px 0 50px 0;
}


</style>