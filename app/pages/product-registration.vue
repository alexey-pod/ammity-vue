<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box" style="margin-bottom:0;padding-bottom:0;">
			<div v-if="page_item.text" v-html="page_item.text"></div>
		</div>
		<div class="page_rasp">все поля формы являются обязательными для заполнения</div>
		<div class="page_form product_registration">
			<table class="form_table">
				<tr>
					<!--Ваше ФИО fio-->
					<td class="name">Ваше ФИО:</td>
					<td class="value">
						<input id="fio" v-model="form.fio" type="text" value>
					</td>
				</tr>
				<tr>
					<!--Email email-->
					<td class="name">Email:</td>
					<td class="value">
						<input id="email" v-model="form.email" type="text" value>
					</td>
				</tr>
				<tr>
					<!--Телефон с кодом города phone-->
					<td class="name">Телефон с кодом города:</td>
					<td class="value">
						<input id="phone" v-model="form.phone" type="text" value placeholder="8 (000) 000-00-00">
					</td>
				</tr>
				<tr>
					<!--Город city-->
					<td class="name">Город:</td>
					<td class="value">
						<input id="city" v-model="form.city" type="text" value>
					</td>
				</tr>
				<tr>
					<!--Магазин shop-->
					<td class="name">Магазин, где был приобретен товар:</td>
					<td class="value">
						<input id="shop" v-model="form.shop" type="text" value>
					</td>
				</tr>
				<tr>
					<!--Дата продажи sale_date-->
					<td class="name">Дата продажи (по чеку):</td>
					<td class="value">
						<datetime :sale_date.sync="form.sale_date"></datetime>
					</td>
				</tr>
				<tr>
					<!--Выберите Ваш продукт cat_id catChange()-->
					<td class="name">Выберите Ваш продукт:</td>
					<td class="value">
						<select-model
							:input_array="cat_array"
							:output_array.sync="seria_array"
							:output_id.sync="form.cat_id"
							:config="{mode: 'getSeriaArrayByAnnCat', select_id: 'root_cat_id'}"
						></select-model>
					</td>
				</tr>
				<tr>
					<!--Выберите серию seria_id seriaChange()-->
					<td class="name">Выберите серию:</td>
					<td class="value">
						<select-model
							:input_array="seria_array"
							:output_array.sync="ann_array"
							:output_id.sync="form.seria_id"
							:config="{mode: 'getAnnArrayForRegister', select_id: 'seria_id', root_cat_id: form.cat_id}"
						></select-model>
					</td>
				</tr>
				<tr>
					<!--Выбери модель model_id-->
					<td class="name">Выбери модель:</td>
					<td class="value">
						<select-model :input_array="ann_array" :output_id.sync="form.ann_id"></select-model>
					</td>
				</tr>
				<tr>
					<!--Введите серийный номер продукта serial_number-->
					<td class="name">Введите серийный номер продукта:</td>
					<td class="value">
						<input id="serial_number" v-model="form.serial_number" type="text" value>
					</td>
				</tr>
				<tr>
					<!--обязательно к заполнению-->
					<td class="name"></td>
					<td
						class="value info"
					>Все поля обязательны для заполнения. Пожалуйста, внимательно проверьте написание адреса вашей электронной почты, и при необходимости, укажите дополнительный способ связи. После отправки вашего обращения или вопроса, специалист ответит вам в кратчайшие сроки. Обращаем ваше внимание, что отдел поддержки работает с 10:00 до 18:00 часов по московскому времени, в будни.</td>
				</tr>
				<tr>
					<!--Отправить-->
					<td class="name"></td>
					<td class="value">
						<div class="btn_send transition" @click="sendForm();">Отправить</div>
					</td>
				</tr>
			</table>
			<br>
		</div>
	</section>
</template>

<script>
import select_model from '../components/select-model';
import datetime from '../components/datetime';
export default {
	components: { 'select-model': select_model, datetime },
	data() {
		return {
			page_item: {},
			cat_array: [],
			seria_array: [],
			ann_array: [],
			form: {
				cat_id: 0,
				seria_id: 0,
				ann_id: 0
			}
		};
	},
	created() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			var url = '/app/respondents/pages.php';
			this.$http
				.get(url, {
					params: {
						mnemonic: 'product_registration'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.cat_array = results.cat_array;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		},

		sendForm() {
			var form = this.form;

			if (!form.fio) {
				fn.uAlert('ВАШЕ ФИО - не заполнено');
				return;
			}
			if (!form.email) {
				fn.uAlert('EMAIL - не заполнено');
				return;
			}
			if (!fn.isEmail(form.email)) {
				fn.uAlert('EMAIL - заполнено неверно');
				return;
			}
			if (!form.phone) {
				fn.uAlert('ТЕЛЕФОН С КОДОМ ГОРОДА - не заполнено');
				return;
			}
			if (!form.city) {
				fn.uAlert('ГОРОД - не заполнено');
				return;
			}
			if (!form.shop) {
				fn.uAlert('МАГАЗИН, ГДЕ БЫЛ ПРИОБРЕТЕН ТОВАР - не заполнено');
				return;
			}
			if (!form.sale_date) {
				fn.uAlert('ДАТА ПРОДАЖИ (ПО ЧЕКУ) - не заполнено');
				return;
			}
			if (form.ann_id == 0) {
				fn.uAlert('МОДЕЛЬ - не заполнено');
				return;
			}
			if (!form.serial_number) {
				fn.uAlert('ВВЕДИТЕ СЕРИЙНЫЙ НОМЕР ПРОДУКТА - не заполнено');
				return;
			}

			form.mode = 'addPrItem';
			fn.showProcess('Отправка запроса');

			this.$http
				.post(this.$store.getters.get('script_url'), form)
				.then(results => {
					fn.hideProcess();
					fn.completeProcess(
						'Сообщение',
						'Спасибо ваш продукт зарегестрирован.'
					);
					this.resetForm();
				});
		},
		resetForm() {}
	}
};
</script>



