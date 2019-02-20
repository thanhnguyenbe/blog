/* exercices openclassrooms.com Nguyen thi */
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription, interval } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuth: boolean;

    constructor(private authService: AuthService) { }

    secondes: number;
    counterSubscription: Subscription;

    ngOnInit() {

        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
        );

        this.realTimeConnect();
     }

    realTimeConnect() {
        this.secondes = 0;
        const counter = interval(1000);
        this.counterSubscription = counter.subscribe(
            (value: number) => {
                this.secondes = value;
            }
        );
    }

    onSignOut() {
        this.authService.signOutUser();
    }

    ngOnDestroy(): void {
        this.counterSubscription.unsubscribe();
    }



}
