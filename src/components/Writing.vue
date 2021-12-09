<template>  
    <div class="writing">
        <form @submit.prevent="createPost" aria-label="Nouveau message">
            <div class="">
                <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Quoi de neuf ?" aria-label="Rédiger un nouveau message"/>    
                <img v-if="imagePreview" :src="imagePreview" id="preview" class="" alt="Prévisualisation de l'image ajoutée au message"/>     
            </div>
            <div class="newPost__option__file">
                <button @click="uploadFile" type="button" class="newPost__option__file__btnInvisible"><i class="far fa-images fa-2x"></i> Choisir un fichier</button>
                <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" aria-label="Sélectionner un fichier">
            </div>       
            <button type="submit" class="" aria-label="Publier le message">Publier <i class="far fa-paper-plane"></i></button>
        </form>
        <span>{{messError}}</span>
    </div>
</template>



<script>
    import axios from 'axios'

    export default {
        name: 'writing',
        components: {
        },
        data() {
            return {
            }
        }, 
        methods: {
            // Permet de créer un nouveau message
            uploadFile() {
                this.$refs.fileUpload.click()
            },
            onFileSelected(event) {
                this.imageURL = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.imageURL);
            },      
            createPost() {
                const formData = new FormData();
                formData.append("text", this.text);
                formData.append("image", this.imageURL);

                axios.post('http://localhost:3000/api/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
        }
    }
</script>


<style scoped lang="scss">

</style>