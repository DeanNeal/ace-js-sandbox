import {AuthProtector} from 'protectors/auth.protector';


export let Routes = [
    {path: '/', component: 'app-home', protector: AuthProtector},
    {path: 'auth', component: 'app-auth'},
    {path: 'registration', component: 'app-registration'},
    {path: 'users', component: 'app-users', protector: AuthProtector},
    // {path: 'fast-signup/:id', component: 'app-fast-signup'},
    // {path: 'remind', component: 'app-remind'},

    {path: 'profile', component: 'app-profile', protector: AuthProtector},
    // {path: 'tracker', component: 'app-tracker', protector: AuthProtector},
    // {path: 'project/:id', component: 'app-project-page', protector: AuthProtector},
    // {path: 'task/:id', component: 'app-task-page', protector: AuthProtector},
    // {path: 'finances', component: 'app-finances', protector: AuthProtector},

    {path: '404', component: 'app-not-found'} // wrong route
];