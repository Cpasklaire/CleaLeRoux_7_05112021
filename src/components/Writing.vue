<template>  
    <div class="writing">
        <form @submit.prevent="createPost">
            <div class="">
                <textarea v-model="text" class="" name="message" id="message" placeholder="Exprimez vous"/>    
                <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
            </div>
            <input type="file" @change="onFileSelected" accept="image/*">       
            <button type="submit">Publier</button>
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
                imagePreview:'',
                image: '',
                text: '',
                messError: ''
            }
        }, 
        methods: {
            // Permet de créer un nouveau message
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
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
        }
    }

</script>
<style scoped lang="scss">
    .writing
    {
        margin: 3%;
        margin-top: 5%;
        form
        {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: solid 3px #D1515A;
            border-radius: 20px;
            padding: 3%;
            width: 93%;
            textarea
            {
                width: 98%;
                height: 150px;
            }
            img
            {
                width: 100%;
            }
            button
            {
                border-radius: 30px;
                box-shadow: 0px 3px 5px #091F43;
                width: 50%;
                font-size: 1.5em;
                color: #D1515A;
                margin-top: 3%;
                margin-left: 25%;
            }
        }
    }
</style>