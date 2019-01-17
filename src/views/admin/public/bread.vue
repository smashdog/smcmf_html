<template>
    <i-breadcrumb :style="{margin: '24px 0'}">
        <i-breadcrumb-item v-for="(v, k) in bread" :key="k">{{v}}</i-breadcrumb-item>
    </i-breadcrumb>
</template>
<script>
export default {
    data(){
        return {
            bread: []
        }
    },
    mounted(){
        let temp = this.$route.fullPath.split('/');
        this.bread = temp;
    }
}
</script>
