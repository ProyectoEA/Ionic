import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetusernamePageRoutingModule } from './setusername-routing.module';

import { SetusernamePage } from './setusername.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetusernamePageRoutingModule
  ],
  declarations: [SetusernamePage]
})
export class SetusernamePageModule {}
