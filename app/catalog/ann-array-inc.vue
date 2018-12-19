<template>
	<div>
		<article v-for="ann_item in ann_array" :key="ann_item.id" class="ann_item">
			<a class="red_label" :href="ann_item.seria_url">{{ ann_item.series_mnemonic }}</a>
			<a :href="ann_item.url">
				<div class="pix-box">
					<img :src="'/img/iResize.php?w=210&h=215&bg=ffffff&img=' + ann_item.image">
				</div>
			</a>
			<h2>
				<a :href="ann_item.url">{{ ann_item.name }}</a>
			</h2>
			<ul>
				<li
					v-for="param_item in ann_item.param_array"
					:key="param_item.id"
				>{{ param_item.name }} {{ param_item.value }}</li>
			</ul>
			<div v-if="ann_item.price != 0" class="price">{{ ann_item.price_str }} р.</div>
			<div v-if="ann_item.root_cat_id != 20" class="compare_panel">
				<a
					v-if="ann_item.in_compare == 0"
					class="compare"
					title="добавить к сравнению"
					@click="setCompare(ann_item, 1)"
				>добавить к сравнению</a>
				
				<a
					v-if="ann_item.in_compare == 1"
					class="compare"
					:href="ann_item.compare_url"
				>сравнить {{ ann_item.compare_total }}</a>
				<div
					v-if="ann_item.in_compare == 1"
					class="delete"
					title="удалить из сравнения"
					@click="setCompare(ann_item, 0)"
				></div>
			</div>
		</article>
	</div>
</template>

<script>
export default {
	props: ['ann_array'],
	methods: {
		setCompare(item, in_compare) {
			if (in_compare == 1) {
				item.in_compare = 1;
			} else {
				item.in_compare = 0;
			}
			var compare_mode = in_compare == 1 ? 'add' : 'delete';
			var ann_array = this.ann_array;
			this.$http
				.post(this.$store.getters.get('script_url'), {
					mode: 'setCompare',
					id: item.id,
					compare_mode: compare_mode
				})
				.then(function(results) {
					results = results.data;
					item.compare_total = results.total;
					item.compare_url = results.url;
					for (var i = 0; i < ann_array.length; i++) {
						ann_array[i].compare_total = results.total;
						ann_array[i].compare_url = results.url;
					}
				});
		}
	}
};
</script>