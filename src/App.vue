<template>
  <div id="app">
    
  <router-view></router-view >
  </div>
</template>
<script>

// 导入 vant 包
import axios from 'axios'
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });

Vue.use(Vant);
export default {
  name: "App"
};
</script>
