<template>
    <div id="app">
        <router-view :menuList="menuList" :menu="menu" ref="router"/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            menuList: [],
            menu: {
                activeName: 'index2',
                openNames: []
            }
        }
    },
    mounted(){
        let token = localStorage.getItem('token'), fullPath = this.$route.path, menu = localStorage.getItem('menu');
        if(token){
            this.$axios.post('/index.php/admin/login/isLogin').then((res) => {
                if(res.data.status == '10000'){
                    if(fullPath == '/admin/login'){
                        this.$jumpUrl();
                    }
                }else{
                    localStorage.clear();
                    this.$router.push({path: '/admin/login'});
                }
            });
        }else if(fullPath != '/admin/login'){
            this.$router.push({path: '/admin/login'});
        }
        if(!menu){
            localStorage.clear();
            this.$router.push({path: '/admin/login'});
        }else{
            this.menuList = JSON.parse(menu);
        }
    }
}
</script>
