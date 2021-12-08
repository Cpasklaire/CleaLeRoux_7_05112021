<template>
    <div class="home">
        <Header @filterMessages="filterMessage" />                
        <Wall :filter="filter" />
    </div>
    <!-- <Connect v-if="user.token==null"/> -->
</template>

<script>
import Header from '../components/Header.vue'    
import Wall from '../components/Wall.vue'
//import Connect from '../components/Connect.vue' 

export default {
    name: 'Home',
    components: {
        Header,            
        Wall,
        //Connect
    },
    data() {
        return {
            filter: 'all'
        }
    },
    methods: {
        filterMessage: function(filter) {
            this.filter = filter
        }
    }
}
</script>
