import { Component, Input } from '@angular/core';

import { Language } from './language.model';

@Component({
    selector: 'language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
    @Input()
    lang: Language;

    constructor() {
    }

}
