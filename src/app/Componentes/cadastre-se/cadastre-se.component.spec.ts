import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastreSeComponent } from './cadastre-se.component';

describe('CadastreSeComponent', () => {
  let component: CadastreSeComponent;
  let fixture: ComponentFixture<CadastreSeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastreSeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastreSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
