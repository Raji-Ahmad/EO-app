import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  @Input({required: true}) title: string = '';
  @Input({required: true}) link: string = '';
  @Input({required: true}) iconUrl: string = '';
}
