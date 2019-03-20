import Vue from 'vue'
import App from './App'
//import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入组件
import Login from './components/Login'
import Home from './components/Home'
//关于我们组件
import Aboutyst from './components/aboutus/Aboutyst'
import Structure from './components/aboutus/Structure'
import Ystadvantage from './components/aboutus/Ystadvantage'
import Ystculture from './components/aboutus/Ystculture'
import Ystteam from './components/aboutus/Ystteam'
import Ysttechnology from './components/aboutus/Ysttechnology'
//核心研究组件
import Advertising from './components/coreresearch/Advertising'
import Consumer from './components/coreresearch/Consumer'
import Internetuser from './components/coreresearch/Internetuser'
import Marketaccess from './components/coreresearch/Marketaccess'
import Mysterycustomer from './components/coreresearch/Mysterycustomer'
import Publicservice from './components/coreresearch/Publicservice'
import Realty from './components/coreresearch/Realty'
import Satisfaction from './components/coreresearch/Satisfaction'

//成功案例组件
import Chain from './components/cases/Chain'
import Household from './components/cases/Household'
import Government from './components/cases/Government'
import Furniture from './components/cases/Furniture'
import Insurance from './components/cases/Insurance'
import Cars from './components/cases/Cars'
//新闻列表组件
import News from './components/News'
//联系我们组件
import Contacts from './components/Contacts'

import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.component('ImgInputer', ImgInputer);

const router = new VueRouter({
	routes:[
		  {path:'/',redirect:"/login"},
		  {path:"/login",name:'loginLink',component:Login},
		  {path:"/home",redirect:"/home/aboutyst"},
		  {path:'/home',name:'homeLink',component:Home,children:[
		  	   {path:"aboutyst",name:'aboutystLink',component:Aboutyst},
		  	   {path:"structure",name:'structureLink',component:Structure},
		  	   {path:"ystadvantage",name:'ystadvantageLink',component:Ystadvantage},
		  	   {path:"ystculture",name:'ystcultureLink',component:Ystculture},
		  	   {path:"ystteam",name:'ystteamLink',component:Ystteam},
		  	   {path:"ysttechnology",name:'ysttechnologyLink',component:Ysttechnology},
		  	   {path:"advertising",name:'advertisingLink',component:Advertising},
		  	   {path:"consumer",name:'consumerLink',component:Consumer},
		  	   {path:"internetuser",name:'internetuserLink',component:Internetuser},
		  	   {path:"marketaccess",name:'marketaccessLink',component:Marketaccess},
		  	   {path:"mysterycustomer",name:'mysterycustomerLink',component:Mysterycustomer},
		  	   {path:"publicservice",name:'publicserviceLink',component:Publicservice},
		  	   {path:"realty",name:'realtyLink',component:Realty},
		  	   {path:"satisfaction",name:'satisfactionLink',component:Satisfaction},
		  	   {path:"chain",name:'chainLink',component:Chain},
		  	   {path:"household",name:'householdLink',component:Household},
		  	   {path:"government",name:'governmentLink',component:Government},
		  	   {path:"furniture",name:'furnitureLink',component:Furniture},
		  	   {path:"insurance",name:'insuranceLink',component:Insurance},
		  	   {path:"cars",name:'carsLink',component:Cars},
		  	   {path:"news",name:'newsLink',component:News},
		  	   {path:"contacts",name:'contactsLink',component:Contacts},
		  ]},
	]
})

axios.defaults.baseURL = 'http://localhost:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
