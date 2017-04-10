import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslateService,TranslateModule } from 'ng2-translate';
import { StatusBar, Splashscreen } from 'ionic-native';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp],

            providers: [
              {
                provide: StatusBar,
                useClass: StatusBar
              },
              {
                provide: Splashscreen,
                useClass: Splashscreen
              }
            ],

            imports: [
              IonicModule.forRoot(MyApp),
              TranslateModule.forRoot()
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {

        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();

    });

    xit('initialises with a root page of HomePage', () => {
        expect(comp['rootPage']).toBe(HomePage);
    });

});