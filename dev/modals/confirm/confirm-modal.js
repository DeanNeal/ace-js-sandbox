import { Component, Utils, Decorators, Controls} from 'ace-js';
// import Style from '../modal.component.scss';
import Tpl from './confirm-modal.html';

// import NotificaitonsStore from 'stores/notifications.store';

@Decorators.ComponentDecorator({
    selector: 'app-confirm-modal', 
    template: Tpl,
    type: 'confirm',
    // stores: ['projects', 'notifications'],
    super: Controls.ModalComponent,
    // visibility: 'visible'
    hostHidden: 'visible'
})
export class ConfirmModal  {
    constructor(params) {

    }

    submit(e) {
        e.preventDefault();

        this.props.get('callback').call(this, {});
        this.close();
    }
}
