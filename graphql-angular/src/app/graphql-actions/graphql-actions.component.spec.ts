import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlActionsComponent } from './graphql-actions.component';

describe('GraphqlActionsComponent', () => {
  let component: GraphqlActionsComponent;
  let fixture: ComponentFixture<GraphqlActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphqlActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
