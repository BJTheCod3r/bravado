<template>
    <div class="profile-card" :class="{ 'profile-card--selected': selected }">
        <div class="profile-card__avatar">
            <img :src="profile.avatar" />
        </div>
        <div class="profile-card__info">
            <div class="profile-card__info_group">
                <div class="profile-card__owner">
                    <h2 v-highlight="searchParam">{{ profile.name }}</h2>
                    <span v-highlight="searchParam">{{ profile.email }}</span>
                </div>
                <div class="profile-card__title" v-highlight="searchParam">{{ profile.title }}</div>
                <div class="profile-card__address" v-highlight="searchParam">{{ profile.address }}, {{ profile.city }}</div>
            </div>
            <div class="profile-card__action">
                <span
                    @click="updateSelected"
                >{{ selected ? 'SKIP SELECTION' : 'MARK AS SUITABLE' }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        profile: {
            required: true,
            type: Object
        },
        searchParam: {
            type: String,
            default: ''
        },
        selected: {
            type: Boolean

        }
    },
    methods: {
        updateSelected() {
            this.$emit('update-status', this.profile.email)
        }
    },
    directives: {
        highlight: {
            inserted(el, binding) {
                const text = el.innerHTML
                el.innerHTML = text.replace(new RegExp(binding.value, "gi"), (match) => {
                    return `<span class='highlight'>${match}</span>`;
                });
            }
        }
    }
}
</script>

<style lang="scss">
.profile-card {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    border-radius: 3px;
    display: flex;
    height: 136px;
    margin-top: 21px;
    &__avatar {
        background-color: #bbb;
        width: 134px;
        height: 100%;
        border-radius: 3px 0 0 3px;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    &__info {
        display: flex;
        flex-grow: 1;
        padding-top: 8px;
        flex-direction: column;
        justify-content: space-between;
    }
    &__info_group {
        padding-left: 27.47px;
    }
    &__owner {
        display: flex;
        justify-content: space-between;
        padding-right: 9px;
        &__email {
            font-weight: 400;
            line-height: 1rem;
            color: rgba(0, 0, 0, 0.54);
        }
    }
    &__title {
        font-size: 1rem;
        line-height: 1.42rem;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.543846);
        margin-top: 5px;
    }
    &__address {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.42rem;
        color: rgba(0, 0, 0, 0.543846);
    }
    &__action {
        flex-grow: 1;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.14rem;
        color: #009688;
        padding-left: 30px;
        display: flex;
        align-items: center;
        span {
            cursor: pointer;
        }
    }
}
.profile-card--selected {
    border: 1px solid #4765ff;
}
.highlight {
    background-color: rgb(255, 247, 59, 1);
}
</style>