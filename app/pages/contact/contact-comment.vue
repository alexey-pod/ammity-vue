<template>
	<div class="page_form" :style="selected_tab!='comment' ? 'display:none' : ''">
		<div class="header">Отзыв о продукТЕ:</div>
		<table class="form_table">
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
				<td class="name">Выберите модель:</td>
				<td class="value">
					<select-model :input_array="ann_array" :output_id.sync="form.ann_id"></select-model>
				</td>
			</tr>
			<tr class="hide_">
				<!-- design-->
				<td class="name">Дизайн:</td>
				<td id="rating_design" class="value">
					<rating :value.sync="form.design"></rating>
				</td>
			</tr>
			<tr>
				<!-- safety-->
				<td class="name">Надежность:</td>
				<td id="rating_safety" class="value">
					<rating :value.sync="form.safety"></rating>
				</td>
			</tr>
			<tr class="hide_">
				<!-- functionality-->
				<td class="name">Функциональность:</td>
				<td id="rating_functionality" class="value">
					<rating :value.sync="form.functionality"></rating>
				</td>
			</tr>
			<tr class="hide_">
				<!-- comfort-->
				<td class="name">Комфорт:</td>
				<td id="rating_comfort" class="value">
					<rating :value.sync="form.comfort"></rating>
				</td>
			</tr>
			<tr>
				<!--отзыв:-->
				<td class="name">отзыв:</td>
				<td class="value">
					<textarea id="c_text" v-model="form.text"></textarea>
				</td>
			</tr>
			<tr>
				<!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input id="c_fio" v-model="form.fio" type="text" value>
				</td>
			</tr>
			<tr>
				<!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input id="c_email" v-model="form.email" type="text" value>
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
import rating from '../../components/rating';
import select_model from '../../components/select-model';
export default {
	components: { rating, 'select-model': select_model },
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
				form.ann_id == 0 ||
				form.fio == '' ||
				form.email == '' ||
				form.text == ''
			) {
				fn.uAlert('Все поля формы обязательны для заполнения!');
				return;
			}
			form.mode = 'addCommentItem';

			fn.showProcess('Отправка запроса');

			this.$http
				.post(this.$store.getters.get('script_url'), form)
				.then(results => {
					fn.hideProcess();
					fn.completeProcess('Сообщение', 'Спасибо за обращение');
					this.resetForm();
				});
		},
		updateRate(val, type) {
			this.form[type] = val;
		},
		resetForm() {
			var form = {
				cat_id: 0,
				seria_id: 0,
				ann_id: 0,
				comfort: 0,
				functionality: 0,
				safety: 0,
				design: 0
			};
			this.form = form;
		}
	}
};
</script>