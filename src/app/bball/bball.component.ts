import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorsDisplay} from "jasmine-spec-reporter/built/display/colors-display";

@Component({
  selector: 'app-bball',
  templateUrl: './bball.component.html',
  styleUrls: ['./bball.component.css']
})
export class BballComponent implements OnInit {

  color: string;
  bgColor: string;
  colors: string[];
  @Input() number: number;
  @Output() golyo = new EventEmitter<any>();

  //var links = document.querySelectorAll('a[target="_blank"]')
  // var szinek = [];
  // links.forEach(l => { var sz = l.firstChild.nodeValue; if (sz != null && !sz.includes("#")) szinek.push(l.firstChild.nodeValue); });

  constructor() {


  }

  ngOnInit() {

    this.colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed ", "Indigo  ", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
    console.log("Kattintott!");
    this.golyo.emit();

  }

  /*onClick() {

    this.color = this.color === 'blue' ? 'yellow' : 'blue';

  }*/


  getRandColor($colors) {

    return $colors[Math.floor(Math.random() * $colors.length)];

  }


  doubleClick($event) {

    //this.color = this.getRandColor(this.colors);
    //this.bgColor = this.getRandColor(this.colors);


    var golyok = document.getElementsByClassName('circle');

    for(var i = 0; i < golyok.length; i++) {

      // Véletlen színű hátteret állít be az elemekre! ->
      golyok[i].setAttribute('style', 'background-color:' + this.getRandColor(this.colors)+';');

    }

    $event.bgColor = 'orange';

  }

  /*onClick() {

    this.bgColor = this.bgColor.toLowerCase() === 'blue' ? 'AliceBlue' : 'blue';

  }*/



}
