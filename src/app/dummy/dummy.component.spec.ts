import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyComponent } from './dummy.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DummyComponent', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DummyComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on initialization', () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.dummyURL}?_limit=20&_start=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.dummyData.length).toBe(20);
    expect(component.dummyData).toEqual(mockData);
    expect(component.offset).toBe(20);
    expect(component.allDataLoaded).toBeFalse();
  });

  it('should handle less than limit number of items fetched', () => {
    const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.dummyURL}?_limit=20&_start=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.dummyData.length).toBe(10);
    expect(component.dummyData).toEqual(mockData);
    expect(component.offset).toBe(20);
    expect(component.allDataLoaded).toBeTrue();
  });

  it('should unsubscribe on component destruction', () => {
    const subscriptionSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component['subscription'] = subscriptionSpy;
    component.ngOnDestroy();
    expect(subscriptionSpy.unsubscribe).toHaveBeenCalled();
  });

  it('should delete an item from the data', () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
    component.dummyData = mockData;

    component.deleteItem(5);
    expect(component.dummyData.length).toBe(19);
    expect(component.dummyData.find(item => item.id === 6)).toBeUndefined();
  });

  it('should track items by id', () => {
    const item = { id: 1, name: 'Item 1' };
    expect(component.trackById(0, item)).toBe(1);
  });
});
