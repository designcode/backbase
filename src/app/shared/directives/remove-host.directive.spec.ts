import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RemoveHostDirective } from './remove-host.directive';

@Component({
  selector: 'app-test-remove-host',
  template: '<div ></div>'
})
class TestRemoveHostComponent {
}

describe('RemoveHostDirective', () => {

  let component: TestRemoveHostComponent;
  let fixture: ComponentFixture<TestRemoveHostComponent>;
  let divEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRemoveHostComponent, RemoveHostDirective]
    });
    fixture = TestBed.createComponent(TestRemoveHostComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement;
  });

  it('should create an instance', () => {
    const directive = new RemoveHostDirective(divEl);
    expect(directive).toBeTruthy();
  });
});
