import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Field,Button,Row,Col,Swipe,SwipeItem,Lazyload,NavBar,Tabs,Tab,List,Stepper,Tabbar,TabbarItem,Icon, Cell, CellGroup ,Loading,PullRefresh,SwipeCell} from 'vant'
Vue.use(Field).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(NavBar).use(Tabs).use(Tab).use(List).use(Stepper).use(Tabbar).use(TabbarItem)
.use(Icon).use(Cell).use(CellGroup).use(Loading).use(PullRefresh).use(SwipeCell)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
