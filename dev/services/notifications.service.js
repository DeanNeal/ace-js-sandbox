import {ObservableCollection, Decorators} from 'ace-js';
// let instance = null;
// import {UserService} from 'stores/user.store';

@Decorators.Inject({
    // userService: UserService
})
export class NotificationsService {
    constructor() {
        // super();
        this.notifications = new ObservableCollection();
    }

    show(params) {
        this.notifications.push(Object.assign({id: this.notifications._data.length}, params));
    }

    close(params) {
        this.notifications.remove(params);
    }
}

// export default new NotificationsStore();
