import {Component, Router, Decorators} from 'ace-js';
import Tpl from './header.component.html';
import {UserService} from 'services/user.service';

@Decorators.ComponentDecorator({
    selector: 'app-header', 
    template: Tpl,
    services: {
        userService: UserService
    },
    props: () => {
        return {
            user: {},
            userService: {}
        }
    }
})

export class HeaderComponent {
    constructor() {

    }

    onInit() {
        this.setSubscriptions(
            this.userService.user.sub(res => {
                this.user = res;
            })
        );
    }

    logout() {
        this.userService.logout('auth');
    }

    onDestroy() {

    }
}