import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {

  //color: string;
  //bgColor: string;
  //colors: string[];
  @Input() number: number;
  @Output() cella = new EventEmitter<any>();


  constructor() {

  }

  ngOnInit() {

    this.cella.emit();

    var cellak = document.getElementsByTagName('td');

    for(var i = 0; i < cellak.length; i++) {

      cellak[i].setAttribute('style', 'background-color:blue;');
    }

  }


  doubleClick($event: Event) {

    //this.color = this.getRandColor(this.colors);
    //this.bgColor = this.getRandColor(this.colors);

    //console.log($event.valueOf($event.bgColor));

    $event.preventDefault();
    let clickedCell = $event.target as HTMLTableCellElement;

    //console.log($event.target);
    console.log(clickedCell);

    //Háttérszín váltogatása, dupla-kattintásra ->
    if (clickedCell.getAttribute('style').includes('blue')) clickedCell.setAttribute('style', 'background-color:cyan;');
    else clickedCell.setAttribute('style', 'background-color:blue;');


    /*var cellak = document.getElementsByTagName('td');

    for(var i = 0; i < cellak.length; i++) {

      // Véletlen színű hátteret állít be az cellákra! ->
      //cellak[i].setAttribute('style', 'background-color:' + this.getRandColor(this.colors)+';');

      //Háttérszín váltogatása, dupla-kattintásra ->
      if (cellak[i].getAttribute('style').includes('blue')) cellak[i].setAttribute('style', 'background-color:cyan;');
      else cellak[i].setAttribute('style', 'background-color:blue;');

    }*/

    ///$event.bgColor = 'orange';

  }

}
