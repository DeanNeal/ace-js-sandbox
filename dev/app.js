import 'polyfils';
import 'babel-polyfill'

import Styles from 'styles/main.scss';
import { Register, Controls } from 'ace-js';

import { RootComponent } from './components/root/root.component';

import { AuthComponent } from './components/auth/auth.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
// import { RemindComponent } from './components/auth/remind/remind.component';
// import { FastSignupComponent } from './components/auth/fast-signup/fast-signup.component';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notifications/notification/notification.component';


// modals

// modules
import Modals from './modals';
import Dropdowns from './dropdowns';

// //common 
// import Common from './common';

import Services from './services';

//protectors
import { AuthProtector } from './protectors/auth.protector';


//route
import { Routes } from 'router.js';
Register({
    root: RootComponent,
    components: [
        AuthComponent,
        RegistrationComponent,
        // RemindComponent,
        // FastSignupComponent,
        HomeComponent,
        UsersComponent,
        ProfileComponent,
        HeaderComponent,
        // SidebarComponent,
        FooterComponent,


        NotFoundComponent,
        NotificationComponent,
        NotificationsComponent,
        Controls.DatepickerComponent
    ],
    import: [
        Modals,
        Dropdowns,
        // Common,
        Controls.TreeDebugComponent
    ],
    services: [
        Services,
        AuthProtector
    ],
    serverUrl: 'http://ace-js.zoom.od.ua',
    routes: Routes,
    styles: Styles
});