<template>
	<div class="page_form" :style="selected_tab!='service' ? 'display:none' : ''">
		<!--Обращение в сервисную службу-->
		<div class="header">Обращение в сервисную службу:</div>
		<table class="form_table">
			<tr>
				<!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input id="s_fio" v-model="form.fio" type="text" value>
				</td>
			</tr>
			<tr>
				<!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input id="s_email" v-model="form.email" type="text" value>
				</td>
			</tr>
			<tr>
				<!--Телефон с кодом города phone-->
				<td class="name">Телефон с кодом города:</td>
				<td class="value">
					<input id="s_phone" v-model="form.phone" type="text" value placeholder="8 (000) 000-00-00">
				</td>
			</tr>
			<tr>
				<!--магазин-->
				<td class="name">магазин:</td>
				<td class="value">
					<input
						id="s_shop"
						v-model="form.shop"
						type="text"
						value
						placeholder="магазин, где был приобретен товар"
					>
				</td>
			</tr>
			<tr>
				<!--Выберите Ваш продукт cat_id-->
				<td class="name">Выберите продукт:</td>
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
				<!--Выберите серию seria_id-->
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
				<!--serial_number-->
				<td class="name">Серийный номер:</td>
				<td class="value">
					<input id="s_serial_number" v-model="form.serial_number" type="text" value>
				</td>
			</tr>
			<tr>
				<!--Причина обращения::-->
				<td class="name">Причина обращения:</td>
				<td class="value">
					<textarea id="s_text" v-model="form.text"></textarea>
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
					<div class="btn_send transition" @click="sendForm">Отправить</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import select_model from '../../components/select-model';
export default {
	components: { 'select-model': select_model },
	props: ['selected_tab', 'cat_array'],
	data() {
		return {
			form: {},
			seria_array: [],
			ann_array: []
		};
	},
	mounted() {
		this.resetForm();
	},
	methods: {
		sendForm() {
			var form = this.form;
			if (
				form.fio == '' ||
				form.email == '' ||
				form.phone == '' ||
				form.shop == '' ||
				form.ann_id == 0 ||
				form.text == '' ||
				form.serial_number == ''
			) {
				fn.uAlert('Все поля формы обязательны для заполнения!');
				return;
			}

			form.mode = 'addServiceItem';

			fn.showProcess('Отправка запроса');

			this.$http
				.post(this.$store.getters.get('script_url'), form)
				.then(results => {
					fn.hideProcess();
					fn.completeProcess('Сообщение', 'Спасибо за обращение');
					this.resetForm();
				});
		},
		resetForm() {
			var form = {
				cat_id: 0,
				seria_id: 0,
				ann_id: 0
			};
			this.form = form;
		}
	}
};
</script>