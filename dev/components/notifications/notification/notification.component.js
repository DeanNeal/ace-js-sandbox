import { Component, Decorators} from 'ace-js';
import Tpl from './notification.component.html';
import {NotificationsService} from 'services/notifications.service';

@Decorators.ComponentDecorator({
    selector: 'app-notification', 
    template: Tpl,
    services: {
        notificationsService: NotificationsService
    }
})

export class NotificationComponent {
    constructor(params) {

    }

    onInit() {
        // this.timeout = setTimeout(() => {
        //     this.root.className = 'animated fadeOutDown';

        // }, 4500);
        this.timeout = setTimeout(() => {
            this.close();
        }, 8000);
    }

    close() {
        this.notificationsService.close(this.props.get('id'));
    }

    onDestroy() {
        // clearTimeout(this.timeout);
        // clearTimeout(this.timeout1);
    }
}
