import {Component, Decorators} from 'ace-js';
import Tpl from './footer.component.html';
 
@Decorators.ComponentDecorator({
    selector: 'app-footer', 
    template: Tpl
})

export class FooterComponent {
    constructor(params) {

    }
}