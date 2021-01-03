import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormChatPageRoutingModule } from './form-chat-routing.module';

import { FormChatPage } from './form-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormChatPage]
})
export class FormChatPageModule {}
