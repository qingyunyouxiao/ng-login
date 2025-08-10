import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-content',
  imports: [CommonModule, WelcomeContentComponent, ButtonsComponent, LoginFormComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  componentToShow = "welcome";
    atLogin() {
      this.componentToShow = "login";
    }
    atLogout() {
      this.componentToShow = "welcome";
    }
}
