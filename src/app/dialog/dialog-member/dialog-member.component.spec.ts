import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMemberComponent } from './dialog-member.component';

describe('DialogMemberComponent', () => {
  let component: DialogMemberComponent;
  let fixture: ComponentFixture<DialogMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
