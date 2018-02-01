import {Component, Decorators, Router} from 'ace-js';
import Tpl from './home.component.html';

@Decorators.ComponentDecorator({
    selector: 'app-home', 
    template: Tpl
})

export class HomeComponent {
    constructor(params) {

    }

    onInit() {

    }
}
