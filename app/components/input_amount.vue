<template>
	<input
		v-model="qty"
		type="text"
		value="1"
		maxlength="2"
		@keydown="disableCharInput"
		@keyup="checkUpdateBasketItem"
	>
</template>

<script>
export default {
	props: ['item', 'updateBasketItem'],
	data() {
		return {
			qty: this.item.amount
		};
	},
	methods: {
		disableCharInput(event) {
			if (
				event.keyCode &&
				event.keyCode != 37 &&
				event.keyCode &&
				event.keyCode != 39 &&
				event.keyCode &&
				event.keyCode != 8 &&
				event.keyCode &&
				event.keyCode != 46 &&
				(event.keyCode < 96 || event.keyCode > 105) &&
				(event.keyCode < 48 || event.keyCode > 57)
			) {
				event.preventDefault();
				return false;
			}
		},
		checkUpdateBasketItem() {
			var item = this.item;
			if (this.qty == '') {
				this.qty = 1;
			}
			if (this.qty == 0) {
				this.qty = item.amount;
			}
			if (this.qty == item.amount) {
				return;
			}
			this.updateBasketItem(item.id, this.qty);
		}
	}
};
</script>