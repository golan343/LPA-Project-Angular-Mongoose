
export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}

export interface RegionalBloc {
    acronym: string;
    name: string;
    otherAcronyms: string[];
    otherNames: string[];
}

export interface County {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    gini: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;
}

export class autoComplete {
    constructor(list) {
        this.show = false;
        this.list = [];
        this.imutetelist = [...list];
    }
    show: boolean;
    list: Array<County>;
    imutetelist: Array<County>;
    selected: County;
    current: County;
    index = 0;
    open() {
        this.show = true;
    }
    close() {
        this.show = false;
    }
    goingDown() {
        if (this.index + 1 < this.list.length) {
            this.index++;
            this.current = this.list[this.index];
        }
    }
    goingUp() {
        if (this.index > 0) {
            this.index--;
            this.current = this.list[this.index];
        }
    }
    filterdListEvent(val: string) {

        this.list = this.imutetelist.filter(item => {
            return new RegExp('^' + val.replace(/[()]/, '')).test(item.name.toLowerCase().replace(/[()]/, ''));
        });
        if (this.index > this.list.length) { this.index = 0 }
        this.current = this.list[this.index];
    }
}