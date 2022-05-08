<template>
    <div class="profile-collections">
        <section>
            <ProfileSearchBox @update="updateSearchParam" :searchParam="searchParam" />
        </section>
        <section>
            <ProfileCard @update-status="updateSelected" :selected="isSelected(profile.email)" :searchParam="searchParam" :profile="profile" v-for="(profile, i) in filteredProfiles" :key="i" />
        </section>
        <section class="no-search" v-if="noMatch">
            <p>{{ `The search parameter "${searchParam}" does not match any profile.` }}</p>
        </section>
    </div>
</template>
<script>
import debounce from 'lodash.debounce'

export default {
    computed: {
        profiles() {
            return this.$store.state.profiles.profiles
        },
        searchParam() {
            return this.$store.state.profiles.searchParam
        },
        noMatch() {
            return this.searchParam && !this.filteredProfiles.length
        },
        selectedProfiles() {
            return this.$store.state.profiles.selected
        },
        filteredProfiles() {
            return this.profiles.filter(profile => {
                return profile.name.toLowerCase().includes(this.searchParam.toLowerCase()) ||
                    profile.email.toLowerCase().includes(this.searchParam.toLowerCase()) ||
                    profile.title.toLowerCase().includes(this.searchParam.toLowerCase()) ||
                    profile.city.toLowerCase().includes(this.searchParam.toLowerCase()) ||
                    profile.address.toLowerCase().includes(this.searchParam.toLowerCase())
            })
        }
    },
    methods: {
        isSelected(email) {
           return this.selectedProfiles.includes(email)
        },
        updateSelected(email) {
            this.$store.dispatch('profiles/updateSelected', email)
        },
        updateSearchParam: debounce(function (q) {
            if (q) {
                this.$router.push(`/search/${q}`)
            }
            if (!q) {
                this.$store.dispatch('profiles/updateSearchParam', q)
                this.$router.push('/')
            }

        }, 275)
    }
}
</script>

<style lang="scss">
.profile-collections {
    background-color: #fff;
    min-width: 564px;
    max-width: 764px;
    max-height: calc(100vh - 108px);
    margin: 54px auto;
    padding: 19px 12px;
    overflow: auto;
}
.no-search {
    margin: 30px 0;
    text-align: center;
}
</style>