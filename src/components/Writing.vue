<template>
  <section class="whiting">
    <div class="interraction">
      <textarea placeholder="Exprimez vous" v-model="text" id="text"></textarea>
      <label for="file">Une image ?</label>
      <input @change="onFileChange" type="file" id="inputFile" name="file" multiple accept=".png, .jpg, .jpeg, .gif">
    </div>
    <button v-on:click="creatPost" value="Submit">Envoyer</button>
    <span>{{msgError}}</span>
  </section>
</template>

<script>
import axios from "axios";

  export default {
    data() {
      return {
      }
    },
    methods:{
      creatPost() {
        /*compiler un ensemble de paires clé/valeur à envoyer à l’aide de l’API XMLHttpRequest*/
        const fd = new FormData();
        fd.append("inputFile", this.contentPost.imageUrl);
        fd.append("text", this.contentPost.text);

        if (fd.get("inputFile") == "null" && fd.get("text") == "null") {
          this.messError = "Message vide";
        } 
        else {
          axios
            .post("http://localhost:3000/api/post/createPost", fd, {
              headers: {
                //Authorization: "Bearer " + window.localStorage.getItem("token")
              }
            })
            .then(response => {
              if (response) {
                window.location.reload();
              }
            })
            .catch(error => (this.messError = error));
        }
      },
    onFileChange(e) {
      this.contentPost.postImage = e.target.files[0] || e.dataTransfer.files;
    }
  }
}
</script>

<style lang="scss">
section
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2%;

  flex-direction: column;
  .interraction
  {
    border: 3px solid #091F43;
    border-radius: 30px;
    background-color: white;
    padding: 2%;
    textarea
    {
      width: 100%;
      height: 200px;
      border: none;
    }
    .mt-3
    {
      margin-left: 10%;
    }
  }
  button
  {
    margin-top: 10%;
    margin-left: 32%;
    border: 3px solid #091F43;
    border-radius: 30px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    font-size: 1.5em;
  }
}
</style>