<template>
    <div>
        <i-row type="flex" justify="center" align="middle">
            <i-col :xs="{span: 20}" :sm="{span: 20}" :md="{span: 12}" :lg="{span: 12}">
                <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <i-form-item prop="username">
                        <i-input prefix="md-person" size="large" v-model="formValidate.username" placeholder="用户名" />
                    </i-form-item>
                    <i-form-item prop="password">
                        <i-input prefix="md-key" size="large" v-model="formValidate.password" placeholder="密码" type="password" />
                    </i-form-item>
                    <i-form-item prop="captcha">
                        <i-input prefix="md-warning" size="large" v-model="formValidate.captcha" placeholder="验证码" />
                    </i-form-item>
                    <i-form-item>
                        <img src="/index.php/index/login/captcha" alt="" id="captcha" @click="captcha()">
                    </i-form-item>
                    <i-form-item>
                        <i-button type="primary" size="large" @click="handleSubmit('formValidate')">登录</i-button>
                    </i-form-item>
                </i-form>
            </i-col>
        </i-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formValidate: {
                username: '',
                password: '',
                captcha: '',
            },
            ruleValidate: {
                username: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                captcha: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$submit('/index.php/admin/login/index', this.formValidate, (res) => {
                        this.$Spin.show();
                        localStorage.setItem('token', res.data.data.token);
                        localStorage.setItem('username', res.data.data.username);
                        this.$axios.post('/index.php/admin/common/getUserMenuList').then(res => {
                            localStorage.setItem('menu', JSON.stringify(res.data.data));
                            let temp, temp1 = {index2: 'index2'};
                            for(let k in res.data.data){
                                if(typeof res.data.data[k].sub != 'undefined'){
                                    for(let k1 in res.data.data[k].sub){
                                        temp = res.data.data[k].sub[k1].url.replace(/\//g, '_');
                                        temp1[temp] = 'menu'+res.data.data[k].sub[k1].pid;
                                    }
                                }
                            }
                            localStorage.setItem('menu1', JSON.stringify(temp1));
                            this.$Spin.hide();
                            this.$router.push({path: '/'});
                        });
                    });
                } else {
                    this.$message('error', '请完善表单后再提交');
                }
            })
        },
        captcha(){
            this.$captcha();
        }
    }
}
</script>
<style scoped>
.ivu-form-item-content img{
    height: 32px;
}
.ivu-row-flex-middle{
    height: 100vh !important;
}
i-input{
    border-top:0px !important;
    border-left:0px !important;
    border-right:0px !important;
    border-radius: 0 !important;
}
form.ivu-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
