<template>
    <div class="home">
        <Header @filterMessages="filterMessage" />                
        <Wall :filter="filter" />
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue'    
import Wall from '../components/Wall.vue'

export default {
    name: 'Home',
    components: {
        Header,            
        Wall
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
