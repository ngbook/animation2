import { Component, AfterViewInit } from '@angular/core';
import {
    trigger, state, style,
    animate, transition, keyframes,
    AnimationEvent,
} from '@angular/animations';

import { mockData } from './language/mock.data';
import { Language } from './language/language.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('slip', [
            state('in', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition(':enter', [ // void => *
                animate('500ms ease-in', keyframes([
                    style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(30px)',  offset: 0.3}),
                    style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
                ]))
            ]),
            transition(':leave',  // * => void
                animate('500ms ease-out', keyframes([
                    style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
                    style({opacity: 1, transform: 'translateX(-30px)', offset: 0.7}),
                    style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
                ]))
            ),
        ]),
    ]
})
export class AppComponent implements AfterViewInit {
    languages: Language[] = [];

    ngAfterViewInit() {
        this.insertData();
    }

    animationStarted(event: AnimationEvent) {
        console.log(event);
    }
    animationDone(event: AnimationEvent) {
        console.log(event);
    }

    private insertData() {
        const count = mockData.length;
        mockData.forEach((lang, index) => {
            setTimeout(() => {
                this.languages.splice(0, 0, lang);
                if (index === count - 1) {
                    this.slipAway();
                }
            }, (index + 1) * 1000);
        });
    }
    private slipAway() {
        const count = mockData.length;
        mockData.forEach((lang, index) => {
            setTimeout(() => {
                this.languages.splice(0, 1);
                if (index === count - 1) {
                    this.insertData();
                }
            }, (index + 1) * 1000);
        });
    }
}
