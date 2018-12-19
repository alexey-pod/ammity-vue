import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		left_menu: [],
		pr_left: {},
		config: {},
		basket: {},
		page_item: {},
		script_url: '/respondents/script_client.php',
		page_load: 0,
		cat_mnemonic: '',
		ann_mnemonic: ''
	},
	getters: {
		get(state, { type }) {
			return function(type) {
				return state[type];
			};
		}
	},
	mutations: {
		set(state, { type, items }) {
			state[type] = items;
		}
	},
	actions: {
		initLoad({ state, commit }, query) {
			var url = '/app/respondents/init.php';
			axios.get(url).then(function(results) {
				results = results.data;
				commit('set', { type: 'results', items: results });
				commit('set', { type: 'left_menu', items: results.left_menu });
				commit('set', { type: 'pr_left', items: results.pr_left });
				commit('set', { type: 'config', items: results.config });
				commit('set', { type: 'compare', items: results.compare });
				commit('set', { type: 'basket', items: results.basket });
			});
		}
	},
	methods: {}
});

export default store;
