import { Component, Decorators, Router, Http } from 'ace-js';
import Tpl from './users.component.html';
import {HttpService} from 'services/http.service';

@Decorators.ComponentDecorator({
    selector: 'app-users',
    template: Tpl,
    services: {
        http: HttpService
    },
    props: {
    	tableHeader: [{name: 'id'}, {name: 'name'}, {name: 'phone'}, {name: 'updated'}],
        users: []
    }
})

export class UsersComponent {
    constructor(params) {

    }

    onInit() {
        this.http.get('/api/users').then(res => {
            this.props.set({users: res.data});
        })
    }
}