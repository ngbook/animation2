import { Component, AfterViewInit } from '@angular/core';
import {
    trigger, state, style,
    animate, transition
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
                transform: 'translateX(0) scale(1)',
                opacity: 1
            })),
            transition(':enter', [ // void => *
                style({
                    transform: 'translateX(-100%) scale(1.1)',
                    opacity: 0
                }),
                animate('500ms ease-in')
            ]),
            transition(':leave',  // * => void
                animate('500ms ease-out', style({
                    transform: 'translateX(100%) scale(1.2)',
                    opacity: 0
                }))
            ),
        ]),
    ]
})
export class AppComponent implements AfterViewInit {
    languages: Language[] = [];

    ngAfterViewInit() {
        this.insertData();
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
