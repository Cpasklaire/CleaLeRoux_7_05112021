<template>
    <div>
        <section class="profil">
        <router-link to="/"><i class="fas fa-arrow-circle-left"></i></router-link>
            <div class="entete">
                <img :src="`/images/avatar/${req.file.filename}`" :alt="'avatar de' + user.lastName + firstName" class="avatar">
                <h2>{{user.lastName + firstName}}</h2>
            </div>
            <p>{{item.description}}</p>
            <div class="infoUser">
                <span>Mes infos personnelles</span> <br>
                <span>Courriel : {{ user.email }}</span><br>
                <span>Mot de passe : **********</span><br>
            </div>
            <div class="bouton">
                <button v-on:click="togglewModifierElement">Modifier</button>
                <button @click="deleteAccount">Supprimer</button>
            </div>
            <div class="date">
                <span>Création du compte : {{item.createDate}}</span><br>
                <span>Derniére connection : {{item.lastRefreshDate}}</span>
            </div>
        </section>
        <form v-if="showModifierElement">
            <label>Avatar</label>
            <input type="file" ref="fileUpload" @change="onFileSelected"  accept="image/*" id="file-input" aria-label="Modifier ma photo de profil">
            <label>Description</label>
            <input type="text"/>
            <label>Mot de passe</label>
            <input type="password"/>
            <button @click="modifyProfile" type="submit">Valider</button>
        </form>
		<!--<span>{{messError}}</span>-->
		<!--<span>{{messReussite}}</span>-->
    </div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'Profil',
		components: {
			
		},
		data(){
			return {
			showModifierElement: false,
			user: "",
			avatar: null,
			}
		},
		mounted() {
				const userId = localStorage.getItem('userId');

				axios.get('http://localhost:3000/api/user/' + userId, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(response => {
					this.user = response.data;
				})
				//.catch(() => {this.messError = 'Une erreur c\'est produite'})
		},
		methods: {
			onFileSelected(event) {
				this.avatar = event.target.files[0]
			},
			modifyProfile() {
				const userId = localStorage.getItem('userId');

				const formData = new FormData();
				formData.append("avatar", this.avatar);

				axios.put('http://localhost:3000/api/user/' + userId, formData, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token'),
						'Content-Type': 'multipart/form-data'
					}
				})
                .then(() => {//this.messReussite = 'Vous pouvez vous connecter', 
				window.location.reload();})
                //.catch(() => {this.messError = 'Une erreur c\'est produite'})
			},
			deleteAccount(){
                const userId = localStorage.getItem('userId');

                axios.delete('http://localhost:3000/api/user/' + userId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
				.then(() => {//this.messReussite = 'Vous avez supprimer votre compte',                     
					localStorage.clear();
                    this.$router.push('/');})
                //.catch(() => {this.messError = 'Une erreur c\'est produite'})

            }
		}
	}
</script>

<style scoped lang="scss">

</style>