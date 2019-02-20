/* exercices openclassrooms.com Nguyen thi */
import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {

        const config = {
          apiKey: 'AIzaSyBXG5SjIEgu8ZE4tXW8Oewe0flqlYJ0gjI',
          authDomain: 'blog-c520f.firebaseapp.com',
          databaseURL: 'https://blog-c520f.firebaseio.com',
          projectId: 'blog-c520f',
          storageBucket: 'blog-c520f.appspot.com',
          messagingSenderId: '708350788022'
        };

        firebase.initializeApp(config);

    }

}
