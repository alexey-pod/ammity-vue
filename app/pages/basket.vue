<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>

		<div v-if="page_item.text" class="become-box" v-html="page_item.text"></div>

		<div v-if="basket.summa != 0" class="basket_page">
			<div class="page_form">
				<table class="order_spec">
					<tr class="header">
						<td class="delete"></td>
						<td class="name">Наименование</td>
						<td class="price">Цена</td>
						<td class="qty">Кол-во</td>
						<td class="sum">Сумма</td>
					</tr>
					<tbody id="order_spec_tbody">
						<tr v-for="item in basket.ann_array" :key="item.id" class="item">
							<td class="delete" title="удалить" @click="deleteFromBasket(item);"></td>
							<td class="name">
								<a :href="item.url">{{ item.name_full }}</a>
							</td>
							<td class="price">{{ item.price_str }} руб.</td>
							<td class="qty">
								<input-amount :item="item" :updateBasketItem="updateBasketItem"></input-amount>
							</td>
							<td class="sum">{{ item.summa_str }} руб.</td>
						</tr>
					</tbody>
					<tr class="total">
						<td class="delete"></td>
						<td colspan="2" class="name">Итого</td>
						<td colspan="2" class="sum">
							<span id="basket_total_summa">{{ basket.summa_str }}</span> руб.
						</td>
					</tr>
				</table>
			</div>
			<div
				class="page_rasp bold"
			>ЗАПОЛНИТЕ ФОРМУ И ЗАКАЗ БУДЕТ ПЕРЕДАН БЛИЖАЙШЕНМУ ДИЛЕРУ В ВАШЕМ РЕГИОНЕ:</div>
			<div class="page_form">
				<table class="form_table">
					<tr>
						<!--ФИО-->
						<td class="name">Ваше ФИО:</td>
						<td class="value">
							<input id="b_fio" v-model="form.fio" type="text" size="30" value>
						</td>
					</tr>
					<tr>
						<!--Телефон-->
						<td class="name">Телефон:</td>
						<td class="value">
							<input
								id="b_phone"
								v-model="form.phone"
								placeholder="8 (000) 000-00-00"
								type="text"
								size="30"
								value
							>
						</td>
					</tr>
					<tr>
						<!--email-->
						<td class="name">E-mail:</td>
						<td class="value">
							<input
								id="b_email"
								v-model="form.email"
								placeholder="адрес электронной почты"
								type="text"
								size="30"
								value
							>
						</td>
					</tr>
					<tr>
						<!--Город-->
						<td class="name">Город:</td>
						<td class="value">
							<input
								id="b_city"
								v-model="form.city"
								placeholder="город доставки"
								type="text"
								size="30"
								value
							>
						</td>
					</tr>
					<tr>
						<!--Адрес-->
						<td class="name">Адрес:</td>
						<td class="value">
							<input
								id="b_address"
								v-model="form.address"
								placeholder="адрес доставки"
								type="text"
								size="30"
								value
							>
						</td>
					</tr>
					<tr>
						<!--вопрос:-->
						<td class="name">Примечание:</td>
						<td class="value">
							<textarea id="b_text" v-model="form.text"></textarea>
						</td>
					</tr>
					<tr>
						<!--Отправить-->
						<td class="name"></td>
						<td class="value">
							<div class="btn_send transition" @click="sendForm();">Отправить заказ</div>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<div v-if="order.send == 1" class="basket_page_confirm become-box">
			<div class="text">
				<p>Благодарим за заказ.</p>
				<p>Ожидайте звонка ближайшего торгового представителя.</p>
			</div>

			<div class="order">
				Ваш заказ
				<span>{{ order.nomber }}</span>
			</div>

			<div class="return">
				<a href="/catalog/">вернуться в каталог</a>
			</div>
		</div>

		<div v-if="basket.summa == 0 && order.send != 1" class="basket_page_empty">
			<div class="become-box" style="text-align:center;">
				<br>
				<img
					src="/img/client/basket/basket_empty.png"
					alt="Для оформления заказа - добавьте товары в корзину"
					title="Для оформления заказа - добавьте товары в корзину"
				>
			</div>
		</div>
	</section>
</template>

<script>
import input_amount from '../components/input_amount.vue';

export default {
	components: { 'input-amount': input_amount },
	data() {
		return {
			page_item: {},
			form: {},
			order: {}
		};
	},
	computed: {
		basket() {
			return this.$store.getters.get('basket');
		}
	},
	watch: {},
	created() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			var url = '/app/respondents/pages.php';
			this.$http
				.get(url, {
					params: {
						mnemonic: 'basket'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		},
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
		},
		updateBasketItem(id, amount) {
			this.$http
				.post(this.$store.getters.get('script_url'), {
					mode: 'updateBasketItem',
					id: id,
					amount: amount
				})
				.then(results => {
					results = results.data;
					this.$store.commit('set', {
						type: 'basket',
						items: results
					});
				});
		},
		sendForm() {
			var form = this.form;

			// проверка полей на заполнение
			if (!form.fio) {
				fn.uAlert('Ваше ФИО - не заполнено');
				return;
			}
			if (!form.phone) {
				fn.uAlert('Телефон - не заполнено');
				return;
			}
			if (!fn.isEmail(form.email)) {
				fn.uAlert('E-mail - заполнено неверно');
				return;
			}
			if (!form.city) {
				fn.uAlert('Город - не заполнено');
				return;
			}
			if (!form.address) {
				fn.uAlert('Адрес - не заполнено');
				return;
			}
			form.mode = 'addOrderItem';
			
			fn.showProcess('Отправка заказа');
			
			this.$http
				.post(this.$store.getters.get('script_url'), form)
				.then(results => {
					results = results.data;
					this.$store.commit('set', {
						type: 'basket',
						items: { summa: 0 }
					});
					this.order.send = 1;
					this.order.nomber = results;
					fn.hideProcess();
					this.form = {};
				});
		}
	}
};
</script>
