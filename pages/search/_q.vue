<template>
    <ProfileCollections />
</template>
  
  <script>
export default {
    head() {
        return {
            title: this.title
        }
    },
    computed: {
       searchParam() {
           return this.$store.state.profiles.searchParam
       },
       title() {
           return `Bravado quest: Search for "${this.searchParam}"`
       }
    },
    created() {
        this.$store.dispatch('profiles/updateSearchParam', this.$route.params.q);
    }
};
</script>
  