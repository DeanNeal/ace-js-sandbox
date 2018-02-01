import {Component, Decorators} from 'ace-js';
import Tpl from './not-found.component.html';

@Decorators.ComponentDecorator({
    selector: 'app-not-found', 
    template: Tpl
})

export class NotFoundComponent {
    constructor(options) {

    }
}
