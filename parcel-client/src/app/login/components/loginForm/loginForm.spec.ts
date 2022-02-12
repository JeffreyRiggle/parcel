import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './loginForm.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginState } from '../../data/reducers/login.reducer';
import { LoginFormLoginActionType } from '../../data/actions/login.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginForm: LoginFormComponent;
  let router: Router;
  let store: MockStore<{ login: LoginState }>;
  const initialState = { login: { loginPending: false, error: false, success: false } };

  beforeEach(async () => {
    router = {
      navigate: () => {},
    } as any;
    await TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent
      ],
      providers: [
          provideMockStore({ initialState }),
          { provide: Router, useValue: router },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    loginForm = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<{ login: LoginState }>;
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate');
  });

  it('should create the loginForm', () => {
    expect(loginForm).toBeTruthy();
  });

  it('should not show an error indicator', () => {
      expect(fixture.nativeElement.querySelector('.login-error')).toBeNull();
  });

  it('should not show a login indicator', () => {
    expect(fixture.nativeElement.querySelector('.login-pending')).toBeNull();
  });

  describe('when login is attempted', () => {
    beforeEach(() => {
        loginForm.password = 'notstrong';
        loginForm.userName = 'tester';
        fixture.detectChanges();

        fixture.nativeElement.querySelector('button').click();
    });

    it('should dispatch a login action', () => {
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            password: 'notstrong',
            userName: 'tester',
            type: LoginFormLoginActionType,
        }));
    });

    it('should show pending indicator', () => {
        expect(fixture.nativeElement.querySelector('.login-pending')).toBeDefined();
    });
  });

  describe('when login succeeds', () => {
    beforeEach(() => {
      store.setState({
        login: { loginPending: false, error: false, success: true }
      })
    });

    it('should navigate to the home page', () => {
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });
  })
});
