import {Component, Router, Controls, Decorators} from 'ace-js';
// import {DropdownComponent} from '../dropdown.component';

import Tpl from './assignee-dropdown.component.html';

@Decorators.ComponentDecorator({
    selector: 'app-assignee-dropdown', 
    template: Tpl,
    super: Controls.DropdownComponent
})

export class AssigneeDropdownComponent {
    constructor(params) {

    }

    INPUT(params) {
        this.props.get('assignees').forEach(item => {
            if (params.assignee == item.id) {
                this.props.set('model', item);
            }
        });
    }

    onInit() {
        let assignees = [{name: 'Bogdan Z.', id: 1, selected: true}, {name: 'Dmitry K.', id: 2}];
        this.props.set('assignees', assignees);
        this.props.set('model', assignees[0]);
    }

    select(e, params) {
        event.stopPropagation();
        this.props.set('assignees', this.props.get('assignees').map(item => {
            item.selected = item.id === params.id;
            return item;
        }));
        this.emit('modelChange', params.id);
        this.close();
    }
}
