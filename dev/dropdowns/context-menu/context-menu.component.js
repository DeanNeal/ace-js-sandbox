import { Component, Router, Controls, Decorators} from 'ace-js';
// import { DropdownComponent } from '../dropdown.component';

import Tpl from './context-menu.component.html';

@Decorators.ComponentDecorator({
    selector: 'app-context-dropdown', 
    template: Tpl,
    super: Controls.DropdownComponent
})
export class ContextMenuComponent {
    constructor(params) {
        
    }

    edit() { 
		this.emit('editTask', 'test');
    }

    delete() {
		this.emit('deleteTask', 'test');
    }
}
