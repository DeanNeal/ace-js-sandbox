import {Component, Decorators, Router} from 'ace-js';
import Tpl from './profile.component.html';
import {UserService} from 'services/user.service';

@Decorators.ComponentDecorator({
    selector: 'app-profile', 
    template: Tpl,
    services: {
        userService: UserService
    }
})

export class ProfileComponent {
    constructor(params) {

    }

    onInit() {
        this.setSubscriptions(
            this.props.userService.user.sub(res => {
                this.props.set('user', res);
            })
            // this.props.userService.getToken().then(res=>{
            //     debugger
            // })
        );
    }
}
