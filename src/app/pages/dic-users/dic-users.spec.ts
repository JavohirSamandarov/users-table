import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicUsers } from './dic-users';

describe('DicUsers', () => {
  let component: DicUsers;
  let fixture: ComponentFixture<DicUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
