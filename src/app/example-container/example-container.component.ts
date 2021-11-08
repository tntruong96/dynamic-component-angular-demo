import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicContentOneComponent } from '../dynamic-content-one/dynamic-content-one.component';
import { DynamicContentTwoComponent } from '../dynamic-content-two/dynamic-content-two.component';

@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss'],
})
export class ExampleContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;
  @ViewChild('dynamicComponent2', { read: ViewContainerRef, static: true })
  containerRef2: ViewContainerRef;
  components: ComponentRef<DynamicContentOneComponent>[] = [];

  constructor(private cfr: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    console.log(this.containerRef);
  }

  ngOnInit() {
    console.log(this.containerRef.element);
  }

  async addDynamicCompOne() {
    const { DynamicContentOneComponent } = await import(
      '../dynamic-content-one/dynamic-content-one.component'
    );

    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentOneComponent
    );
    const componentRef = this.containerRef.createComponent(componentFactory);
    componentRef.instance.myName = 'Truong';
    this.components.push(componentRef);
  }

  async changeDynamidCompOne() {
    const { DynamicContentTwoComponent } = await import(
      '../dynamic-content-two/dynamic-content-two.component'
    );
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentTwoComponent
    );
  }

  async addDynamicCompTwo() {
    const { DynamicContentTwoComponent } = await import(
      '../dynamic-content-two/dynamic-content-two.component'
    );
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentTwoComponent
    );
    const componentRef = this.containerRef.createComponent(componentFactory);
  }

  clearDynamicComp() {
    this.containerRef.clear();
  }

  async addDynamicComp2() {
    const { DynamicContentTwoComponent } = await import(
      '../dynamic-content-two/dynamic-content-two.component'
    );
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentTwoComponent
    );
    const componentRef = this.containerRef2.createComponent(componentFactory);
    componentRef.instance.id = '9';
    componentRef.instance['change'].subscribe((emit) => {
      componentRef.instance.id = emit;
    });
  }

  //Changes dynamic component
  show(type: string) {
    this.containerRef.clear();
    switch (type) {
      case 'a':
        this.addDynamicCompOne();
        break;
      case 'b':
        this.addDynamicCompTwo();
        break;
      default:
        break;
    }
  }
}
