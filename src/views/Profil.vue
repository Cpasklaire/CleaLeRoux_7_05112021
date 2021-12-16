<template>
    <div>
        <section class="profil" >
        <router-link to="/wall"><i class="fas fa-arrow-circle-left"></i></router-link>
        <button v-on:click="logout" class="pc logout">Déconnexion</button>
            <!--profil-->
            <div class="entete">
                <i v-if="user.avatar == null || user.avatar == ''" class="fa fa-user-astronaut"></i>
                <img v-if="user.avatar == !null" :src="user.avatar" :alt="'avatar de' + user.firstname + user.lastname" class="avatar">
                <h2>{{user.lastName}} {{user.firstName}}</h2>
            </div>

            
            <div v-if="!showModifierElement">
                <div class="descrinfo">
                    <p v-if="user.description == null">Une petite description ?</p>
                    <p v-if="user.description == !null">{{user.description}}</p>
                    
                    <div class="infoUser">
                        <h3>Mes infos personnelles</h3>
                        <span>Courriel : {{ user.email }}</span><br>
                        <span>Mot de passe : **********</span><br>
                        <span>Statut : {{ user.statut }}</span><br>
                        <span class="pc">Création du compte : {{dateFormat(user.createdAt)}}</span><br>
                        <span class="pc">Derniére connection : {{dateFormat(user.lastRefreshDate)}}</span>  
                    </div>
                </div>
                <div class="bouton">
                    <div class="boutonRow">
                        <button v-on:click="togglewModifierElement">Modifier</button>
                        <button v-on:click="deleteUser">Supprimer</button>
                    </div>
                </div>
                
                <div class="bas">
                    <div class="date mobil">
                        <span>Création du compte : {{dateFormat(user.createdAt)}}</span><br>
                        <span>Derniére connection : {{dateFormat(user.lastRefreshDate)}}</span>  
                    </div>
                    <button v-on:click="logout" class="mobil logout"><i class="fas fa-sign-out-alt"></i></button>
                </div>
            </div>
        </section>
        
        <!--formulaire-->
        <form v-if="showModifierElement">
            <label>Avatar</label>
            <img v-if="imagePreview" :src="imagePreview" class="preview"/>
            <input type="file" @change="onFileSelected" accept="image/*">  
            <label>Description</label>
            <textarea v-model="description" type="text" class="description" placeholder="Taper votre description ici"/>
            <input type="checkbox" id="statut">
            <label for="statut">Vous êtes RH ?</label>
            <label>Mot de passe</label>
            <input v-model="password" type="current-password" placeholder="**********" required/>
            <span>Si vous ne souhaitez pas changer de mot de passe confirmer votre mot de passe actuelle</span>
            <button @click="modifProfil" type="submit">Valider</button>
        </form>
		
        <span>{{messError}}</span>
		<span>{{messReussite}}</span>
    </div>
</template>

<script>
	import axios from 'axios'
    import moment from 'moment'

	export default {
		name: 'Profil',
		components: {
		},

		data(){
			return {
                //Voir l'user
                user: "",        
                //Messages automatique
                messReussite: '',
                messError: '',
                //Modification user
                password:'',
                description:'',
                avatar: '',
                imagePreview:'',
                //Bouton
                showModifierElement: false
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
                console.log(response.data)
            })
            .catch(() => {this.messError = 'Une erreur c\'est produite'})
		},
		user() {
            let headers = {Authorization: 'token'}
            let user = this.$http.get('/auth', {headers: headers})
                this.user.push({
                    userId: user.id,
                    avatar: user.avatar,
                    firstname: user.firstname,
					lastname: user.lastname,
                    mail: user.mail,
                    createdAt: user.createdAt,
                    lastRefreshDate: user.lastRefreshDate, 
                })
            },

		methods: {
            //modifier profil
            onFileSelected(event) {
                this.avatar = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.avatar);
            },
			modifProfil() {
				const userId = localStorage.getItem('userId');

				const formData = new FormData();
				formData.append("avatar", this.avatar);
                formData.append("description", this.description);
                formData.append("password", this.password);

				axios.put('http://localhost:3000/api/user/' + userId, formData, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token'),
						'Content-Type': 'multipart/form-data'
					}
				})
                .then(() => {this.messReussite = 'Profile modifié', 
				window.location.reload();})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
			},
            //suprimer user
			deleteUser(){
                const userId = localStorage.getItem('userId');

                axios.delete('http://localhost:3000/api/user/' + userId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
				.then(() => {this.messReussite = 'Vous avez supprimer votre compte',                     
					localStorage.clear();
                    this.$router.push('/');})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
            //déconnection
            logout() {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('lastName');
                localStorage.removeItem('firstName');
                localStorage.removeItem('avatar');
                
                this.$router.push('/');
            },
            //bouton            
			togglewModifierElement(){
				this.showModifierElement = !this.showModifierElement
            },
            //format date
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },
		}
	}
</script>

<style scoped lang="scss">
.profil
{
    margin: 3%;
    .fa-arrow-circle-left
    {
        color: #091F43;
        font-size: 1.5em;
        position: absolute;
        right: 3%;
        top: 0.5%;
    }    
    .entete
    {    
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5%;
        .fa-user-astronaut
        {
            font-size: 70px;
            padding: 10px;
            border-radius: 100%;
            border: solid 3px #D1515A;
            height: 60px;
            width: 60px;
            color: #091F43;
            overflow: hidden;
        }
        img
        {
            width: 80px;
            height: 80px;
            border-radius: 100%;
            border: solid 3px #D1515A;
            overflow: hidden;
        }
        h2
        {
            color: #D1515A;
            font-size: 2em;
        }
    
    }
    p 
    {
        border: solid 3px #D1515A;
        border-radius: 20px;
        height: 200px;
        margin-top: 5%;
        padding: 3%;
    }
    .infoUser
    {
        margin-top: 5%;
        h3
        {
            margin-bottom: 3%;
            color: #D1515A;
        }
    }
    .boutonRow
    {
        display: flex;
        justify-content: space-around;
        align-items: center;
        button
        {
            width: 40%;
            font-size: 1.5em;
            margin-top: 5%;
        }
    }
    .bas
    {    
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5%;
        margin-top: 10%;
        .logout
        {
            border-radius: 100%;
            box-shadow: 0px 3px 5px #091F43;
            width: 50px;
            height: 50px;
            font-size: 1.5em;
            color: #D1515A;
            
        }
        span
        {
        font-size: 1em;
        }
    }
}    
form
{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    label 
    {
        font-size: 1.5em;
        color: #D1515A;
    }
    .preview
    {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        border: solid 3px #D1515A;
        overflow: hidden;
    }
    textarea
    {
    border: solid 3px #D1515A;
    border-radius: 20px;
    height: 200px;
    width: 80%;
    margin-top: 5%;
    padding: 3%;
    }
        button
    {
        font-size: 1.5em;
    }
}    
@media (min-width: 992px)
{  
    .profil
    {
        .fa-arrow-circle-left
        {
            left: 1%;
        }
        .logout
        {
            font-size: 1.5em;
            position: absolute;
            right: 1%;
            top: 0.5%;
            border-radius: 0;
            box-shadow: none;
            width: 10%;
            color: #091F43;
            margin-top: 0%;
        }
        .entete
        {  
            justify-content: flex-start;
            h2
            {
                margin-left: 5%;
            }
        }
        .descrinfo
        {
            display: flex;
            justify-content: space-around;
            align-items: center;
            p 
            {
                width: 40%;              
            }
            .infoUser
            {
                border: solid 3px #D1515A;
                border-radius: 20px;
                padding: 3%;
                width: 40%; 
                height: 200px; 
                span 
                {
                    line-height: 2em;
                }
            }
        }            
        .boutonRow
        {
            flex-direction: column;
        }
    }
}

</style>