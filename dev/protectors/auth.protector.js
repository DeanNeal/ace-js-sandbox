import {Router, Decorators} from 'ace-js';
import {UserService} from 'services/user.service';

@Decorators.Inject({
    userService: UserService
})
export class AuthProtector {
    constructor(userService) {
        this.userService = userService;
    }
    check() {
        if (this.userService.isLogged()) {
            return true;
        } else {
            setTimeout(()=>{
                Router.navigate('auth', true);
            });
            return false;
        }
    }
}