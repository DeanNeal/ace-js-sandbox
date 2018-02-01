import { Component, Decorators} from 'ace-js';
import Tpl from './notifications.component.html';

import {NotificationsService} from 'services/notifications.service';

@Decorators.ComponentDecorator({
    selector: 'app-notifications', 
    template: Tpl,
    services: {
        notificationsService: NotificationsService
    }
})

export class NotificationsComponent {
    constructor(params) {
        
    }

    onInit() {
        this.props.notificationsService.notifications.sub(res=>{
        	this.props.set('notifications', res);
        });
    }
}
