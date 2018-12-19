import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from './store';

// pages
import home from './pages/home';
import pages from './pages/pages';
import page404 from './pages/page404';
import app from './pages/app';
import action from './pages/action';
import presentation from './pages/presentation';
import contact from './pages/contact/contact';
import search_dealer from './pages/search_dealer';
import cooperation from './pages/cooperation';
import product_registration from './pages/product-registration';
import basket from './pages/basket';
import cat_item from './catalog/cat-item';
import seria_item from './catalog/seria-item';
import ann_item from './catalog/ann-item';
import compare from './catalog/compare';

// components
import c_left_sidebar from './components/left-sidebar/sidebar';
import c_basket from './components/basket';
import c_quick_search from './components/quick-search';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(store);
Vue.prototype.$http = axios;

var router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', name: 'home', component: home },
		{ path: '/pages/app/', name: 'app', component: app },
		{ path: '/pages/action/', name: 'action', component: action },
		{ path: '/pages/contact/', name: 'contact', component: contact },
		{
			path: '/pages/product_registration/',
			name: 'product_registration',
			component: product_registration
		},
		{
			path: '/pages/cooperation/',
			name: 'cooperation',
			component: cooperation
		},
		{
			path: '/pages/search_dealer/',
			name: 'search_dealer',
			component: search_dealer
		},
		{
			path: '/pages/presentation/',
			name: 'presentation',
			component: presentation
		},
		{ path: '/pages/:mnemonic/', name: 'pages', component: pages },
		{
			path: '/catalog/',
			name: 'cat_item_main',
			component: cat_item
		},
		{
			path: '/catalog/:cat_mnemonic/',
			name: 'cat_item',
			component: cat_item
		},
		{
			path: '/seria/:seria_mnemonic/',
			name: 'seria_item',
			component: seria_item
		},
		{
			path: '/catalog/:cat_mnemonic/:ann_mnemonic/',
			name: 'ann_item',
			component: ann_item
		},
		{ path: '/basket/', name: 'basket', component: basket },
		{ path: '/compare/:compare_list/', name: 'compare', component: compare },
		{ path: '*', name: 'page404', component: page404 }
	]
});

new Vue({
	store,
	router,
	el: '#app',
	components: {
		'left-sidebar': c_left_sidebar,
		'quick-search': c_quick_search,
		basket: c_basket
	},
	computed: {
		header() {
			var site_name = this.$store.getters.get('config').site_name;
			var title = this.$store.getters.get('page_item').title;
			var header = title ? site_name + ' | ' + title : site_name;
			return header;
		},
		page_change() {
			return this.$store.getters.get('page_item');
		}
	},
	watch: {
		header: function(new_header) {
			document.title = new_header;
		},
		$route(to, from) {
			var route_name = this.$route.name;
			if (
				route_name != 'cat_item_main' &&
				route_name != 'cat_item' &&
				route_name != 'ann_item'
			) {
				this.$store.commit('set', {
					type: 'cat_mnemonic',
					items: ''
				});
				this.$store.commit('set', {
					type: 'ann_mnemonic',
					items: ''
				});
			}
			fn.showPagePreloader();
		},
		page_change: function() {
			fn.hidePagePreloader();
		}
	},
	mounted() {
		this.$store.dispatch('initLoad');

		$(document).on('click', event => {
			this.initRouting(event);
		});
	},
	methods: {
		initRouting: function(event) {
			function checkUrl(url) {
				var host = document.location.host;
				if (url.includes(host)) {
					return true;
				}
				if (url.substr(0, 4) == 'http' || url.substr(0, 3) == 'ftp') {
					return false;
				}
				return true;
			}

			var url = $(event.target).attr('href');

			if (url == undefined) {
				var parent_a = $(event.target).parents('a:eq(0)');
				if (parent_a.length && $(parent_a).attr('href') != undefined) {
					url = $(parent_a).attr('href');
				} else {
					event.preventDefault();
					return;
				}
			}

			if (checkUrl(url)) {
				event.preventDefault();
				event.stopPropagation();
				this.$router.push(url);
			}
		}
	}
});
