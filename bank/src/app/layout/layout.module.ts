import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [HeaderComponent, ContainerComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
