import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DummyComponent } from "./dummy.component";
import { DummyRoutingModule } from "./dummy-routing.module";

@NgModule({
    declarations: [DummyComponent],
    imports: [
        CommonModule,
        DummyRoutingModule
    ]
})

export class DummyModule {}