import {Component, Http, Decorators} from 'ace-js';
import Tpl from './root.component.html';
// import NotificaitonsStore from 'stores/notifications.store';
// import UserStore from 'stores/user.store';
// import HttpStore from 'stores/http.store';


@Decorators.ComponentDecorator({
    selector: 'app-root', 
    template: Tpl
})

export class RootComponent {
    constructor(params) {
        // super(params, {
        //     template: Tpl
        // });
    }

    onInit() {
        // Http.getCatalog('/api');
        // Http.onProgress(event => {
        //     // console.log(event.loaded + ' / ' + event.total);
        // });
        // Http.onError(err => {
        //     switch (err.status) {
        //         case 401:
        //             NotificaitonsStore.show({type: 'error', text: err.response.message});
        //             UserStore.logout('auth');
        //             break;
        //         case 406:
        //             NotificaitonsStore.show({type: 'error', text: err.response.message});
        //             UserStore.logout('auth');
        //             break;
        //         case 422:
        //             break;
        //         case 404:
        //             break;
        //         case 403:

        //             break;
        //         case 500:
        //         case 502:
        //             break;
        //         default:

        //             break;
        //     }
        // });
    }
}