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
                    <i-tabs>
                        <i-tab-pane :label="formTitle+'列表'">
                            <i-button type="success" @click="add">添加</i-button>
                            <i-table :columns="fields" :data="list" style="margin-top:1rem;"></i-table>
                            <i-page :total="total" style="margin-top:1rem;" @on-change="onChange"></i-page>
                        </i-tab-pane>
                    </i-tabs>
                </i-content>
            </i-layout>
        </i-layout>
    </i-layout>
</template>
<script>
import Common from './common.vue';
export default {
    props: [
        'menuList', 'menu'
    ],
    components:{
        Common
    },
    data(){
        return {
            addUrl: '',
            fields: [],
            list: [],
            total: 0,
            formTitle: ''
        }
    },
    methods:{
        add(){
            this.$router.push({path: this.addUrl});
        },
        onChange(param){
            this.getList(param);
        },
        getList(page){
            let temp = this.$route.fullPath.split('/'), query = '?';
            query += 'page='+page;
            this.addUrl = '/admin/'+temp[2]+'/'+temp[2]+'Add';
            this.$submit('/index.php'+this.$route.fullPath+query, {}, (res) => {
                this.formTitle = res.data.formTitle;
                for(let k in res.data.fields){
                    res.data.fields[k].title = res.data.fields[k].title.split('：')[0]
                    if(/_img$/.test(res.data.fields[k].key)){//图片特殊处理
                        res.data.fields[k].render = (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row[res.data.fields[k].key]
                                },
                                style: {
                                    maxWidth: '32px',
                                    maxHeight: '32px'
                                }
                            });
                        }
                    }
                }
                this.fields = res.data.fields;
                this.total = res.data.total;
                this.fields.push({
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('i-button', {
                                props: {
                                    type: 'primary'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        let temp1 = '/admin/'+temp[2]+'/'+temp[2]+'Add';
                                        this.$router.push({path: temp1, query: {id: params.row.id}});
                                    }
                                }
                            }, '编辑'),
                            h('i-button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                    click: () => {
                                        // this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                });
                this.list = res.data.data;
            })
        }
    },
    mounted(){
        let page = 1;
        if(typeof this.$route.query.page != 'undefined'){
            page = this.$route.query.page;
        }
        this.getList(page);
    },
    watch:{
        '$route': function(to, from){
            this.getList(1);
        }
    }
}
</script>