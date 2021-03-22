import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesCodeComponent } from './phones-code.component';

describe('PhonesCodeComponent', () => {
  let component: PhonesCodeComponent;
  let fixture: ComponentFixture<PhonesCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonesCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
