import { Component, Router, Http, Decorators, FormGroup, Validators } from 'ace-js';
import Tpl from './registration.component.html';
import {UserService} from 'services/user.service';

@Decorators.ComponentDecorator({
    selector: 'app-registration',
    template: Tpl,
    services: {
        userService: UserService
    },
    props: () => {
        return {        
            form: new FormGroup({
                name: ['', [Validators.required]],
                phone: ['', [Validators.required]],
                password: ['', [Validators.required]],
                password_confirm: ['', [Validators.required]]
            })
        }
    }
})

export class RegistrationComponent {
    constructor(params) {

    }

    onInit() {
        this.props.userService.getRegisterFields().then(fields=>{
            this.props.set({ fields });
        })
    }

    submit(e) {
        e.preventDefault();

        if (this.props.form.isValid()) {
            let params = this.props.form.getValues();
            params.invite = this.props.fields.invite;
            this.props.userService.createUser(params);
        }

        
    }
}