<template>
	<div v-if="image_array" :id="'image_list_' + pr_item_id" class="image_list">
		<div class="inner">
			<a
				v-for="image_item in image_array"
				:key="image_item.id"
				:href="image_item.image"
				:style="image_item.panel_nomber != selected_panel ? 'display:none' : ''"
			>
				<img :src="'/img/iResize.php?size=125&bg=ffffff&img=' + image_item.image">
			</a>
		</div>
		<div v-if="image_array_length>5" class="panel">
			<div class="p_inner">
				<div class="text">Всего {{ image_array_length }} изображений</div>
				<div class="prev" @click="clickPrev"></div>
				<div class="next" @click="clickNext"></div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	props: ['image_array', 'pr_item_id'],
	data() {
		return {
			selected_panel: 1,
			panel_total: 1
		};
	},
	computed: {
		image_array_length: function() {
			if (this.image_array) {
				return this.image_array.length;
			}
			return 0;
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			var arr = this.image_array;
			var panel_nomber = 1;
			var total = 0;
			for (var i = 0; i < arr.length; i++) {
				if (total == 5) {
					total = 0;
					panel_nomber++;
				}
				arr[i].panel_nomber = panel_nomber;
				total++;
			}
			this.panel_total = panel_nomber;
			Vue.set(this.image_array, 'image_array', arr);

			$('.pr_item .image_list')
				.find('A')
				.lightBox();
		},
		clickNext() {
			if (this.selected_panel == this.panel_total) {
				this.selected_panel = 1;
			} else {
				this.selected_panel++;
			}
		},
		clickPrev() {
			if (this.selected_panel == 1) {
				this.selected_panel = this.panel_total;
			} else {
				this.selected_panel--;
			}
		}
	}
};
</script>