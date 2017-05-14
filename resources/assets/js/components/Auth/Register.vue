<template>

	<div class="uk-section">

		<div class="uk-container uk-container-small">

			<div class="uk-flex-center" uk-grid>

				<form class="uk-form-large uk-width-1-2@s" v-form="{form, submit}">

					<fieldset class="uk-fieldset">

						<legend class="uk-legend">Register</legend>

						<form-text v-model="form.name" name="name" placeholder="Name"/>

						<form-text v-model="form.email" name="email" placeholder="john.doe@provider.com"/>

						<form-password v-model="form.password" name="password" placeholder="Password"/>

						<form-password v-model="form.password_confirmation" name="password_confirmation"
						               placeholder="Confirm password"/>

						<div class="uk-margin uk-text-center">
							<form-submit :form="form" class="uk-width-1-1"/>
						</div>

					</fieldset>

				</form>
			</div>

		</div>

	</div>

</template>


<script>

    import Vue from "vue";

    export default {

        data(){

            return {

                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                }),
            }
        },

        methods: {

            submit()
            {
                this.form.submit('/register')
                    .then(({data}) => {
                        this.$store.commit('auth/login', {user: data});
                        this.$router.push({name: 'home'});
                    })
                    .catch(({response}) => {
                        if (response.status === 422) {
                            this.form.password = '';
                            this.form.password_confirmation = '';
                        }
                    });
            }

        }

    };

</script>