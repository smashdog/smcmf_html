<template>
    <i-layout>
        <i-header>
            <div class="top">
                <span>行程记后台管理</span>
            </div>
        </i-header>
        <i-layout>
            <i-sider hide-trigger :style="{background: '#fff'}">
                <Common :menuList="menuList" :menu="menu" ref="menu" />
            </i-sider>
            <i-layout :style="{padding: '0 24px 24px'}">
                <i-content :style="{padding: '24px', minHeight: '100vh', background: '#fff'}">
                    index
                </i-content>
            </i-layout>
        </i-layout>
    </i-layout>
</template>
<script>
import Common from '../public/common.vue';
export default {
    props: [
        'menuList', 'menu'
    ],
    components:{
        Common
    }
}
</script>