<template>
	<ul class="rating_box" style="height:50px;">
		<li class>1</li>
		<li class>2</li>
		<li class>3</li>
		<li class>4</li>
		<li class>5</li>
		<input v-model="value" type="hidden">
	</ul>
</template>

<script>
import Vue from 'vue';
export default {
	props: ['value'],
	watch: {
		value: function(val) {
			if (val == 0) {
				this.setStar(this.$el, 0);
			}
		}
	},
	mounted() {
		this.initRating(this.$el);
	},
	methods: {
		updateValue(val) {
			this.$emit('update:value', val);
		},
		setStar($element, val) {
			// начальный инит звёздочек
			jQuery.each($($element).find('LI'), function() {
				var index = 0;
				if (val == undefined) {
					index = $($element)
						.find('INPUT')
						.val();
				}

				$.each($($element).find('LI'), function() {
					var index_inner = $(this).html();
					if (index_inner <= index) {
						$(this).addClass('selected');
					} else {
						$(this).removeClass('selected');
					}
				});
			});
		},
		initRating($element) {
			this.setStar($element);

			// наведение мыши на li
			jQuery.each($($element).find('LI'), function() {
				$(this).mouseenter(function() {
					var index = $(this).html();
					$.each($($element).find('LI'), function() {
						var index_inner = $(this).html();
						if (index_inner <= index) {
							$(this).addClass('selected');
						} else {
							$(this).removeClass('selected');
						}
					});
				});
			});

			// уведение мыши от всего UL
			$($element).mouseleave(function() {
				var index = $($element)
					.find('INPUT')
					.val();
				if (index == undefined) {
					$($element)
						.find('LI')
						.removeClass('selected');
					return;
				}
				$.each($($element).find('LI'), function() {
					var index_inner = $(this).html();
					if (index_inner > index) {
						$(this).removeClass('selected');
					} else {
						$(this).addClass('selected');
					}
				});
			});

			var self = this;
			$($element)
				.find('LI')
				.click(function() {
					var index = $(this).html();
					self.updateValue(index);
				});
		}
	}
};
</script>