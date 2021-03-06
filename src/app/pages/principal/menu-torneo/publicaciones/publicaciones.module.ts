import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPageRoutingModule } from './publicaciones-routing.module';

import { PublicacionesPage } from './publicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionesPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PublicacionesPage]
})
export class PublicacionesPageModule {}
