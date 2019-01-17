<template>
    <i-menu ref="left_menu" :active-name="menu.activeName" theme="light" width="auto" :open-names="menu.openNames" :style="{minHeight: '100vh'}" :accordion="true" @on-select="onLeftSelect">
        <i-menu-item name="index2">
            <i-icon type="md-home"></i-icon>
            首页
        </i-menu-item>
        <span v-for="v in menuListData" :key="v.id">
            <i-submenu v-if="typeof v.sub != 'undefined'" :name="'menu'+v.id">
                <template slot="title">
                    <i-icon v-if="v.icon" :type="v.icon"></i-icon>
                    {{v.title}}
                </template>
                <i-menu-item v-for="v1 in v.sub" :key="v1.id" :name="v1.url.replace(/\//, '_')">
                    <i-icon v-if="v1.icon" :type="v1.icon"></i-icon>
                    {{v1.title}}
                </i-menu-item>
            </i-submenu>
            <i-menu-item v-else :name="v.url == '#' ? 'menu'+v.id : v.url.replace(/\//, '_')">
                <i-icon v-if="v.icon" :type="v.icon"></i-icon>
                {{v.title}}
            </i-menu-item>
        </span>
        <i-menu-item name="logout">
            <i-icon type="md-exit"></i-icon>
            登出
        </i-menu-item>
    </i-menu>
</template>
<script>
export default {
    props: [
        'menuList',
        'menu'
    ],
    data(){
        return {
            menuListData: this.menuList
        }
    },
    created(){
        if(this.menuListData.length == 0){
            this.menuListData = JSON.parse(localStorage.getItem('menu'));
        }
    },
    methods: {
        onLeftSelect(name){
            this.$router.push({path: '/admin/login'});
            try{
                if(name == 'logout'){
                    localStorage.clear();
                    location.href = '/#/admin/login';
                }else if(name == 'index2'){
                    this.$router.push({path: '/admin'});
                }else if(!/^menu\d+/.test(name)){
                    this.$router.push({path: '/admin/'+name.replace(/\_/g, '/')});
                }
                this.menu.activeName = name;
                let temp = JSON.parse(localStorage.getItem('menu1'));
                this.menu.openNames = [temp[name]];
            }catch(e){

            }
        }
    }
}
</script>

<style lang="scss">
.top{
    span{
        color:#fff;
        font-size: 2rem;
    }
}
</style>