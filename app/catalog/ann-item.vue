<template>
	<section class="content-main">
		<div class="page_header">
			<h1>{{ ann_item.name_full }}</h1>
		</div>
		<div id="tab_control" class="menu_nav_bar" style="overflow:hidden_;">
			<a
				:class="{'active': selected_tab == 'descr'}"
				class="tab tab_control_item"
				style="margin-left:-7px; z-index:50;"
				:href="ann_item.url + '#descr'"
				@click="setTab('descr')"
			>
				<div class="gl l"></div>
				<div
					class="gc c"
					style="width:98px; padding-left:0px; padding-right:0px;text-align:center"
				>ОПИСАНИЕ</div>
				<div class="gr r"></div>
			</a>
			<a
				v-if="ann_item.features"
				:class="{'active': selected_tab == 'feature'}"
				:href="ann_item.url + '#feature'"
				class="tab tab_control_item"
				style="z-index:140;"
				@click="setTab('feature')"
			>
				<div class="gl l"></div>
				<div
					class="gc c"
					style="width:121px; padding-left:0px; padding-right:0px;text-align:center"
				>ОСОБЕННОСТИ</div>
				<div class="gr r"></div>
			</a>
			<a
				:class="{'active': selected_tab == 'ttx'}"
				:href="ann_item.url + '#ttx'"
				class="tab tab_control_item"
				style="z-index:30;"
				@click="setTab('ttx')"
			>
				<div class="gl l"></div>
				<div
					class="gc c"
					style="width:141px; padding-left:0px; padding-right:0px;text-align:center"
				>ХАРАКТЕРИСТИКИ</div>
				<div class="gr r"></div>
			</a>
			<!--compare-->
			<a
				v-if="ann_item.compare_total == 0"
				:class="{'disabled': ann_item.compare_total == 0}"
				style="z-index:20;"
				class="tab tab_control_item"
			>
				<div class="gl l"></div>
				<div style="width:85px; padding-left:0px; padding-right:0px;text-align:center" class="gc c">
					<span>Сравнить</span>
					<span ng-if="ann_item.compare_total">{{ ann_item.compare_total }}</span>
				</div>
				<div class="gr r"></div>
			</a>
			<a
				v-if="ann_item.compare_total != 0"
				:class="{'disabled': ann_item.compare_total == 0}"
				:href="ann_item.compare_url"
				style="z-index:20;"
				class="tab tab_control_item"
			>
				<div class="gl l"></div>
				<div style="width:85px; padding-left:0px; padding-right:0px;text-align:center" class="gc c">
					<span>Сравнить</span>
					<span ng-if="ann_item.compare_total">{{ ann_item.compare_total }}</span>
				</div>
				<div class="gr r"></div>
			</a>
			<!--compare END-->
			<a
				v-if="ann_item.cat_extended_warranty"
				class="tab tab_control_item"
				style="z-index:10;"
				:href="'/pages/product_registration/'"
			>
				<div class="gl l"></div>
				<div
					class="gc c"
					style="width:189px; padding-left:0;padding-right:0;text-align:center;"
				>РАСШИРЕННАЯ ГАРАНТИЯ</div>
				<div class="grlast rlast"></div>
			</a>
		</div>
		<div class="tab_item" :style="selected_tab == 'descr' ? '' : 'display:none'">
			<div class="tovar-box clearfix">
				<a :href="ann_item.seria_url" class="red_label">{{ ann_item.series_mnemonic }}</a>
				<div class="right-box">
					<div v-if="ann_item.price != 0" class="price">{{ ann_item.price_str }} р.</div>

					<div class="price_btn_panel">
						<a v-if="ann_item.in_basket == 1" class="price_btn_text" :href="/basket/">
							В Корзине
							<span>{{ ann_item.in_basket_amount }}</span> шт.
						</a>
						<div v-if="ann_item.in_basket == 0 && ann_item.price != 0" class="price_btn">
							<div class="qty">
								<span>{{ qty }}</span>
							</div>
							<div class="control">
								<div class="up" @click="changeBasketAmount('+')"></div>
								<div class="down" @click="changeBasketAmount('-')"></div>
							</div>
							<div class="text" @click="addToBasket(ann_item, qty);">
								<span>в корзину</span>
							</div>
						</div>
					</div>
					<ul class="tabs">
						<!--превью справа страницы-->
						<li
							v-for="(image_item, index) in ann_item.image_array"
							:key="index"
							:class="{current: index + 1 == selected_image}"
							:style="image_item.panel_nomber == selected_panel ? '' : 'display:none'"
							@click="selectImage(index + 1)"
						>
							<img :src="'/img/iResize.php?w=90&h=90&bg=ffffff&img=' + image_item.image">
						</li>
					</ul>
					<div class="panel">
						<!--панель вперёд назад-->
						<div class="text">Всего {{ image_array_length }} изображений</div>
						<div class="prev" @click="clickPrev();"></div>
						<div class="next" @click="clickNext();"></div>
					</div>
					<div class="compare_btn_panel">
						<a
							v-if="ann_item.in_compare == 0"
							class="btn-tovar"
							@click="setCompare(ann_item, 1);"
						>Добавить к сравнению</a>
						<a
							v-if="ann_item.in_compare!=0"
							class="btn-tovar disable"
							@click="setCompare(ann_item, 0);"
						>Удалить из сравнения</a>
					</div>
					<div class="ware_icons">
						<a href="/pages/presentation/#pr_8" style="border:none">
							<img class="ware_icon" src="/img/client/ware_icon/ware_icon_rus.png" style="margin-left:0px">
						</a>
						<a href="/pages/app/" style="border:none">
							<img class="ware_icon" src="/img/client/ware_icon/ware_icon_app.png">
						</a>
						<a href="/pages/app/" style="border:none">
							<img class="ware_icon" src="/img/client/ware_icon/ware_icon_apple.png">
						</a>
						<a href="/pages/app/" style="border:none">
							<img class="ware_icon" src="/img/client/ware_icon/ware_icon_android.png">
						</a>
						<a href="/pages/product_registration/" style="border:none">
							<img
								class="ware_icon"
								src="/img/client/ware_icon/ware_icon_warranty.png"
								style="margin-right:0px"
							>
						</a>
					</div>
				</div>
				<div class="panes">
					<!--основные фото-->
					<div
						v-for="(image_item, index) in ann_item.image_array"
						:key="index"
						:style="index + 1 == selected_image ? '' : 'display:none'"
						:href="image_item.image"
					>
						<img :src="image_item.image" alt>
					</div>
				</div>
			</div>
			<div class="block-content">
				<h3>Описание модели</h3>
				<div id="more_content" v-html="ann_item.text"></div>
				<div id="more_btn" class="more" style>
					<div class="icon"></div>
					<div class="text">ещё</div>
				</div>
				<div id="more_btn_hide" class="more up" style>
					<div class="icon"></div>
					<div class="text">скрыть</div>
				</div>
			</div>
			<div class="tovar-widgets clearfix" style="margin-right:-6px;">
				<article v-for="(feature_item, index) in ann_item.feature_array" :key="index" class="widget">
					<img :src="feature_item.image" :alt="feature_item.name">
					<div class="desc">
						<h3>{{ feature_item.name }}</h3>
						<p v-html="feature_item.text"></p>
					</div>
				</article>
			</div>
		</div>
		<div class="tab_item" :style="selected_tab == 'feature' ? '' : 'display:none'">
			<div class="block-content" v-html="ann_item.features"></div>
		</div>
		<div class="tab_item" :style="selected_tab == 'ttx' ? '' : 'display:none'">
			<div class="table-box clearfix">
				<div v-for="(ch_item, index) in ann_item.ch_array" :key="index">
					<h2>{{ ch_item.name }}</h2>
					<table class="table-tovar-desc">
						<tr v-for="(param_item, index2) in ch_item.param" :key="index2">
							<td width="400">
								<strong>{{ param_item.name }}</strong>
							</td>
							<td>{{ param_item.value }}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			ann_item: {},
			cat_item: {},
			qty: 1,
			selected_image: 1,
			selected_panel: 1,
			selected_tab: 'descr',
			panel_total: 1,
			pp: 4
		};
	},
	computed: {
		image_array_length: function() {
			if (this.ann_item.image_array) {
				return this.ann_item.image_array.length;
			}
			return 0;
		},
		basket() {
			var basket = this.$store.getters.get('basket');
			return basket.ann_array;
		}
	},
	watch: {
		$route(to, from) {
			this.qty = 1;
			this.selected_image = 1;
			this.selected_panel = 1;
			this.loadPage();
		},
		basket: function(basket) {
			this.checkInBasket(basket);
		}
	},
	created() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			var url = '/app/respondents/catalog.php';
			this.$http
				.get(url, {
					params: {
						mode: 'ann_item',
						cat_mnemonic: this.$route.params.cat_mnemonic,
						ann_mnemonic: this.$route.params.ann_mnemonic
					}
				})
				.then(results => {
					results = results.data;

					this.page_item = results.page_item;
					this.ann_item = results.ann_item;
					this.cat_item = results.cat_item;

					this.prepareImage();

					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
					this.$store.commit('set', {
						type: 'cat_mnemonic',
						items: this.$route.params.cat_mnemonic
					});
					this.$store.commit('set', {
						type: 'ann_mnemonic',
						items: this.$route.params.ann_mnemonic
					});
				});
		},
		prepareImage() {
			var pp = this.pp;
			var ann_item = this.ann_item;
			var image_array = ann_item.image_array;

			var image_total = image_array.length;
			this.panel_total =
				image_total % pp == 0
					? image_total / pp
					: 1 + (image_total - (image_total % pp)) / pp;
			var panel_nomber = 1;
			var total = 0;

			for (var i = 0; i < image_array.length; i++) {
				if (total == pp) {
					total = 0;
					panel_nomber++;
				}
				image_array[i].panel_nomber = panel_nomber;
				total++;
			}

			setTimeout(function() {
				$('.panes DIV').lightBox();
			}, 500);

			$('table tr:nth-child(2n+1)').addClass('bg-td');
		},
		selectImage(val) {
			this.selected_image = val;
		},
		setTab(val) {
			this.selected_tab = val;
		},
		clickPrev() {
			if (this.selected_panel == 1) {
				this.selected_panel = this.panel_total;
			} else {
				this.selected_panel--;
			}
			this.selected_image = 1 + (this.selected_panel - 1) * this.pp;
		},
		clickNext() {
			if (this.selected_panel == this.panel_total) {
				this.selected_panel = 1;
			} else {
				this.selected_panel++;
			}
			this.selected_image = 1 + (this.selected_panel - 1) * this.pp;
		},
		changeBasketAmount(mode) {
			if (mode == '+') {
				this.qty++;
			}
			if (mode == '-') {
				this.qty--;
			}
			if (this.qty == 100) {
				this.qty = 99;
			}
			if (this.qty == 0) {
				this.qty = 1;
			}
		},
		addToBasket(item, qty) {
			item.in_basket = 1;
			item.in_basket_amount = qty;
			this.$http
				.post(this.$store.getters.get('script_url'), {
					mode: 'addToBasket',
					id: item.id,
					amount: qty
				})
				.then(results => {
					results = results.data;
					this.$store.commit('set', {
						type: 'basket',
						items: results
					});
				});
		},
		setCompare(item, in_compare) {
			if (in_compare == 1) {
				item.in_compare = 1;
			} else {
				item.in_compare = 0;
			}
			var compare_mode = in_compare == 1 ? 'add' : 'delete';
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
				});
		},
		checkInBasket(basket) {
			for (var i = 0; i < basket.length; i++) {
				if (basket[i].id == this.ann_item.id) {
					return;
				}
			}
			this.ann_item.in_basket = 0;
			this.qty = 1;
		}
	}
};
</script>
