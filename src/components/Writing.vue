<template>  
    <div class="writing">
        <form @submit.prevent="createPost">
            <div class="">
                <textarea v-model="text" class="" name="message" id="message" placeholder="Exprimez vous"/>    
                <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
            </div>
            <div class="">
                <button @click="uploadFile" type="button" class=""><i class="far fa-images fa-2x"></i>Une image ?</button>
                <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*">
            </div>       
            <button type="submit" class="">Publier<i class="far fa-paper-plane"></i></button>
        </form>
        <!--<span>{{messError}}</span>-->
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
                imagePreview:'',
                image: '',
                text: ''
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