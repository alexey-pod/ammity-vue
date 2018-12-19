<template>
	<div class="sale_date_container">
		<input id="sale_date" v-model="sale_date" type="text" value>
		<div class="icon"></div>
	</div>
</template>

<script>
export default {
	props: ['sale_date'],
	mounted() {
		this.init();
	},
	methods: {
		init($el) {
			var self = this;
			$('#sale_date').datepicker({
				buttonImageOnly: true,
				dateFormat: 'dd-mm-yy',
				onSelect: function(dateText, inst) {
					self.$emit('update:sale_date', dateText);
				}
			});
			$('.sale_date_container .icon').click(function(e) {
				$('#saledate').datepicker('show');
			});
		}
	}
};
</script>