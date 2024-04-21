import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatListItem} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";

export interface ICard {
  title: string;
  sub_title: string;
  img: string;
  desc: string;
  link: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatCardModule,
    MatListItem,
    RouterLink,
    CdkCopyToClipboard
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards: ICard[] = [
    {
      title: 'NDVI',
      sub_title: 'Vegetation Index',
      img: "assets/ndvi.png",
      desc: `
     <p>
            NDVI is a simple graphical indicator that assess whether
            the target being observed contains live green vegetation or not.
          </p>

          <p>

            The NDVI is calculated from these individual measurements as follows:
            NDVI=(NIR-RED)/(NIR+RED)
          </p>

          <p>
            The NDVI values range from -1 to +1. High values (close to +1) correspond to dense vegetation, while low
            values (close to -1) correspond to areas free of vegetation.

          </p>`,
      link: '/lst'
    },
    {
      title: 'NDWI',
      sub_title: 'Water Index',
      img: "assets/ndwi.png",
      desc: `
     <p>
            NDWI is used to assess and monitor water content and availability in vegetation, crops, and to highlight open water features in satellite images.
          </p>

          <p>

            The NDWI is calculated using the visible green and near-infrared (NIR) spectral bands, which allows it to detect subtle changes in water content of the water bodies2.
            The formula for NDWI is: NDWI = (Green−NIR) / (Green+NIR)
          </p>

          <p>
            The result of the NDWI equation is positive values for water features and negative ones (or zero) for soil and terrestrial vegetation.

          </p>`,
      link: '/lst'
    },
    {
      title: 'Land Cover',
      sub_title: 'Land cover Classification',
      img: "assets/land-cover.png",
      desc: `
     <p>
            Land cover analysis is a process that involves the study of the physical materials on the surface
            of the Earth, including vegetation (natural or planted), water bodies, bare soil, and human construction
          </p>

          <p>

            This app uses dynamic world Global 10m resolution near realtime land cover dataset,
            producing probabilities per pixel for 9 land types, useful for change-detection products and derivative maps
          </p>

          <p>


          </p>`,
      link: '/lst'
    },
    {
      title: 'LST',
      sub_title: 'Land Surface Temperature',
      img: "assets/lst.png",
      desc: `
     <p>
            Land Surface Temperature (LST) is a measure of how hot the “surface” of the Earth would feel to the touch
             in a particular location12. From a satellite’s point of view, the “surface” is whatever
             it sees when it looks through the atmosphere to the ground. It could be snow and ice,
             the grass on a lawn, the roof of a building, or the leaves in the canopy of a forest
          </p>

          <p>

            This app uses MOD11A1.061 Terra Land Surface Temperature and Emissivity Daily Global 1km dataset
            to calculate LST
          </p>

          <p>

          </p>`,
      link: '/lst'
    }
  ]
  protected readonly location = location;
  protected readonly alert = alert;
}
