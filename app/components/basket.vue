<template>
	<div v-show="basket.summa != 0" class="inner">
		<a class="b_info" href="/basket/">
			<div class="line_1">
				<div class="text">корзина</div>
			</div>
			<div class="line_2">
				<span class="text">Сумма:</span>
				<span class="sum">
					<span>{{ basket.summa_str }}</span> руб.
				</span>
			</div>
			<div class="rasp"></div>
		</a>
		<div class="b_detail">
			<div class="b_list">
				<a v-for="item in basket.ann_array" :key="item.id">
					<div class="item">
						<div class="delete" @click="deleteFromBasket(item);"></div>
						<div class="image">
							<img :src="'/img/iResize.php?size=80&bg=ffffff&img=' + item.image">
						</div>
						<div class="text">
							<div class="l1">{{ item.cat_name_one }}</div>
							<div class="l2">AMMITY {{ item.seria_name }} {{ item.name }}</div>
						</div>
						<div class="qty">
							<span>{{ item.amount }} шт.</span>
						</div>
						<div class="sum">
							<span>{{ item.summa_str }} руб.</span>
						</div>
					</div>
				</a>
			</div>
			<div class="b_total">
				<div class="text_panel">
					<div class="sum">
						<span>{{ basket.summa_str }}</span>
					</div>
					<div class="sum_text">Сумма заказа:</div>
				</div>
				<div class="btn_panel">
					<a href="/basket/" class="btn">Оформить...</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		basket() {
			return this.$store.getters.get('basket');
		}
	},
	methods: {
		deleteFromBasket(item) {
			item.in_basket = 1;
			this.$http
				.post(this.$store.getters.get('script_url'), {
					mode: 'deleteFromBasket',
					id: item.id
				})
				.then(results => {
					results = results.data;
					this.$store.commit('set', {
						type: 'basket',
						items: results
					});
				});
		}
	}
};
</script>