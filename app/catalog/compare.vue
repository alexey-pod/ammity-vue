<template>
	<section class="content-main full-content">
		<div class="page_header">
			<h1>Сравнение товаров</h1>
		</div>
		<div class="menu_nav_bar">
			<a
				:class="{active: get.diff==0 }"
				class="tab tab_control_item"
				style="margin-left:-7px; z-index:50;"
				:href="'/compare/' + get.compare_list + '/'"
			>
				<div class="gl l"></div>
				<div class="gc c" style>все характеристики</div>
				<div class="gr r"></div>
			</a>
			<a
				:class="{active: get.diff == 1}"
				class="tab tab_control_item"
				style="z-index:40;"
				:href="'/compare/' + get.compare_list + '/?diff=1'"
			>
				<div class="gl l"></div>
				<div class="gc c" style>только отличающиеся характеристики</div>
				<div class="gr r"></div>
			</a>
		</div>
		<div class="table-box clearfix">
			<table class="table-tovar">
				<tr>
					<td></td>
					<td v-for="model_item in compare_array.model_array" :key="model_item.id">
						<div class="relative">
							<a class="close" @click="deleteItem(model_item)"></a>
							<div v-if="model_item.is_disable == 1" class="disable">отключено</div>
							<a :href="model_item.url">
								<img :src="'/img/iResize.php?w=100&h=100&bg=ffffff&img=' + model_item.image">
							</a>
							<h3>
								<a :href="model_item.url">{{ model_item.name }}</a>
							</h3>
						</div>
					</td>
				</tr>
			</table>
			<div v-for="(val_1, key_1) in compare_array.param_array" :key="key_1">
				<h2>{{ key_1 }}</h2>
				<table class="table-tovar-desc">
					<tr v-for="(val_2, key_2) in val_1" :key="key_2">
						<td width="400">
							<strong>{{ key_2 }}</strong>
						</td>
						<td v-for="(val_3, key_3) in val_2" :key="key_3">{{ val_3 }}</td>
					</tr>
				</table>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			page_item: {},
			get: {
				compare_list: this.$route.params.compare_list,
				diff: this.$route.query.diff || 0
			},
			compare_array: {}
		};
	},
	watch: {
		$route(to, from) {
			this.loadPage();
			this.get = {
				compare_list: this.$route.params.compare_list,
				diff: this.$route.query.diff || 0
			};
		}
	},
	created() {
		this.loadPage();
	},
	methods: {
		deleteItem(item) {
			var compare_mode = 'delete';
			this.$http
				.post(this.$store.getters.get('script_url'), {
					mode: 'setCompare',
					id: item.id,
					compare_mode: compare_mode
				})
				.then(results => {
					results = results.data;
					this.$router.push(results.url);
				});
		},
		loadPage() {
			var url = '/app/respondents/catalog.php';
			var compare_list = this.$route.params.compare_list;
			var diff = this.$route.query.diff;
			this.$http
				.get(url, {
					params: { mode: 'compare', compare_list: compare_list, diff: diff }
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.compare_array = results.compare_array;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
					setTimeout(function() {
						$('table tr:nth-child(2n+1)').addClass('bg-td');
					}, 300);
				});
		}
	}
};
</script>
