import { Component, Router, Http, Decorators, FormGroup, Validators } from 'ace-js';
import Tpl from './auth.component.html';
import {UserService} from 'services/user.service';

@Decorators.ComponentDecorator({
    selector: 'app-auth',
    template: Tpl,
    services: {
        userService: UserService
    },
    props: {
        form: new FormGroup({
            phone: ['', [Validators.required/*, Validators.email*/]],
            password: ['', [Validators.required]]
        })
    }
})
export class AuthComponent {
    constructor(params) {

    }


    onInit() {

    }

    submit(e) {
        e.preventDefault();

        if (this.props.form.isValid()) {
            let params = this.props.form.getValues();
            this.props.userService.login(params);
        }
        
    }
}