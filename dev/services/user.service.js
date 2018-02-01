import {Utils, Router, ObservableModel, Http, API, Decorators } from 'ace-js';
import md5 from 'md5';
import {NotificationsService} from 'services/notifications.service';
import {HttpService} from 'services/http.service';

@Decorators.Inject({
    notificationsService: NotificationsService,
    http: HttpService
})
export class UserService {
    constructor(notificationsService, http) {
        // super();
        this.user = new ObservableModel();
        this.auth = new ObservableModel();

        this.notificationsService = notificationsService;
        this.http = http;

        this.getUser();
        // console.log('USER SERVICE IS READY');
    }

    getUser() {
        this.auth.sub(res => {
            if (res.auth) {
                this.http.get('/api/profile').then(res=>{
                    this.user.set(res);
                }).catch(err=>{
                    this.notificationsService.show({ type: 'error', text: err.response.message });
                })
            }
        });

        if (localStorage.getItem('token')) {
            try {
                this.auth.set('auth', this.base64urlDecode(localStorage.getItem('token')));
            } catch (err) {
                this.logout('auth');
            }
        }
    }

    isLogged() {
        return localStorage.getItem('token');
    }

    // getAuthFields() {
    //     return Http.get('/api/auth/login/create').then(res => {
    //         // console.log(res);
    //         let fields = [];
    //         for (let key in res) {
    //             fields.push({ name: key });
    //         }
    //         return fields;
    //     }).catch(err => {
    //         NotificationsStore.show({ type: 'error', text: err.response.message });
    //     })
    // }

    getToken() {
        return this.http.get('/api/auth/token').then(res => {
            return res;
        }).catch(err => {
            let errors = '';
            for (let key in err.response.errors){
                errors += "<br>" + '-' + err.response.errors[key] ;
            }
            
            this.notificationsService.show({ type: 'error', text: /*err.response.message  + */errors });
        })
    }

    getDash() {
        return this.http.get('/api/dashboard').then(res => {
            return res;
        }).catch(err => {
            let errors = '';
            for (let key in err.response.errors){
                errors += "<br>" + '-' + err.response.errors[key] ;
            }
            
            this.notificationsService.show({ type: 'error', text: /*err.response.message  + */errors });
        })
    }

    login(props) {
        // params.email = params.email.trim();
        // params.password = params.password.trim();
        // params.password = md5(params.password);

        return this.http.post('/api/auth/login', props).then(res => {
            this.saveJwt(res.token);
            Router.navigate('/');
            return res;
        }).catch(err => {
            let errors = '';
            for (let key in err.response.errors){
                errors += "<br>" + '-' + err.response.errors[key] ;
            }
            
            this.notificationsService.show({ type: 'error', text: /*err.response.message  + */errors });
        })
    }


    getRegisterFields() {
        return Http.makeRequest({ method: 'get', url: '/api/auth/register/create' }).then(res => {
            return res;
        }).catch(err => {
            this.notificationsService.show({ type: 'error', text: err.response.message });
        })
    }

    createUser(params) {
        // params.email = params.email.trim();
        // params.password = params.password.trim();
        // params.password = md5(params.password);
        
        return this.http.post('/api/auth/register', params).then(res => {
            this.notificationsService.show({ type: 'notification', text: 'User has been created' });
             Router.navigate('auth');
        }).catch(err => {
            let errors = '';
            for (let key in err.response.errors){
                errors += "<br>" + '-' + err.response.errors[key] ;
            }
            
            this.notificationsService.show({ type: 'error', text: /*err.response.message  + */errors });
        })
    }

    // changePassword(params) {
    //     params.current_password = md5(params.current_password);
    //     return this.updateUser(params).then(res=>{
    //         NotificationsStore.show({ type: 'notification', text: 'Password has been changed' });
    //     });
    // }

    // updateUser(params) {
    //     params.password = params.password.trim();
    //     params.password = md5(params.password);

    //     return this.user.put_self(params).then(res => {
    //         return res;
    //     });
    // }

    // resetPassword(params) {
    //     return Http.hMRequest('post', '/catalog/auth/lost-password', params).then(res => {
    //         Router.navigate('auth');
    //         NotificationsStore.show({ type: 'notification', text: 'Password has been reset. Please check your email for the new password' });
    //         return res;
    //     }).catch(err => {
    //         NotificationsStore.show({ type: 'error', text: err.response.message });
    //         return Promise.reject(err);
    //     });
    // }

    saveJwt(jwt) {
        localStorage.setItem('token', jwt);
        this.auth.set('auth', this.base64urlDecode(localStorage.getItem('token')));
    }

    logout(redirect = '') {
        localStorage.removeItem('token');
        if (redirect) {
            Router.navigate(redirect);
        }
        this.auth.set('auth', localStorage.getItem('token'));
        this.user.set({});
    }


    base64urlEncode(str) {
        const header = JSON.stringify({ typ: 'JWT', alg: 'HS256' });
        const segments = [];
        segments.push(this.base64urlEscape(new Buffer(header).toString('base64')));
        segments.push(this.base64urlEscape(new Buffer(str).toString('base64')));

        return segments.join('.');
    }

    base64urlEscape(str) {
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }

    base64urlDecode(str) {
        const base64Url = str.split('.')[1];
        return JSON.parse(new Buffer(this.base64urlUnescape(base64Url), 'base64').toString());
    }
}
