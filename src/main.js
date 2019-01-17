import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';

Vue.use(iView);
Vue.prototype.$axios = axios;
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if(token){
    config.headers['token'] = token;
  }
  return config;
},
error => {
  return Promise.reject(error.response);
});
router.beforeEach((to, from, next) => {
  let fullPath = to.path.replace(/^\/admin\//, ''), temp = fullPath.split('/'), token = localStorage.getItem('token'), menu = localStorage.getItem('menu');
  if((!token || !menu) && fullPath != 'login'){
      router.push({path: '/admin/login'});
      localStorage.clear();
  }else if(to.matched.length === 0){
    if(temp.length == 2){
      router.addRoutes([{
        name: fullPath.replace(/\//g, '_'),
        path: '/admin/'+fullPath,
        component: () => import('./views/admin/public/'+(/Add/.test(fullPath) ? 'add' : 'list')+'.vue')
      }]);
      router.push({name: fullPath.replace(/\//g, '_'), query: to.query});
    }else{
      router.push({name: 'error404'});
    }
  }
  next();
});
Vue.prototype.$message = function(type, title, onOk){
  this.$Modal[type]({
    title: title,
    onOk: () => {
      try{
        onOk();
      }catch(e){

      }
    }
  });
}
Vue.prototype.$captcha = function(){
  let captcha = document.getElementById('captcha');
  if(captcha){
    captcha.src = '/index.php/index/login/captcha?r='+Math.random();
  }
}
Vue.prototype.$submit = function(url, param, success, error){
  this.$Spin.show();
  this.$axios.post(url, param).then((res) => {
    this.$Spin.hide();
    if(res.data.status == '10000'){
      if(typeof success != 'undefined'){
        success(res);
      }
    }else{
      this.$message('error', res.data.msg, error);
      this.$captcha();
    }
  }).catch((error) => {
    this.$Spin.hide();
    console.log(error);
    // this.$message('error', '服务器开小差了，请稍后再试');
  });
}
Vue.prototype.$jumpUrl = (url) => {
  if(!url){
    url = localStorage.getItem('jumpUrl') ? localStorage.getItem('jumpUrl') : '/';
  }
  router.push({path: url});
}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
