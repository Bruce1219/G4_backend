<template>
    <RouterView />
    <!-- <IndexSidebar /> -->
</template>

<script>
import './assets/scss/base/_reset.scss'
import { RouterView } from 'vue-router'
// import IndexSidebar from '@/components/IndexSidebar.vue'

export default {
    name: 'App',
    components: {
        RouterView
        // IndexSidebar
    }
}
</script>

<style lang="scss">
* {
    // background-color: $bcgw;
}
</style>
