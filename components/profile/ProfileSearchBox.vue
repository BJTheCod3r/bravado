<template>
    <div class="search-box">
        <img src="~assets/images/magnifier.svg" alt="search" />
        <input
            :value="searchParam"
            @input="update($event)"
            type="text"
            placeholder="Enter search parameter"
            ref="search"
        />
    </div>
</template>
<script>

export default {
    props: {
        searchParam: {
            type: String,
            default: ''
        }
    },
    methods: {
        update(event) {
            this.$emit('update', event.target.value)
        }
    },
    mounted() {
        this.$nextTick(() => this.$refs.search.focus());
    }
}
</script>


<style lang="scss">
.search-box {
    position: relative;
    input {
        background: #fafafa;
        font-size: 1.71rem;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12),
            0px 2px 2px rgba(0, 0, 0, 0.24);
        border-radius: 2px;
        width: 100%;
        border: none;
        outline: none;
        padding: 12px 20px 12px 50px;
        height: 48px;
    }
    img {
        position: absolute;
        left: 21px;
        top: 16px;
    }
}
</style>