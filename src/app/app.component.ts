import { Component } from '@angular/core';
import {copyObj} from "@angular/animations/browser/src/util";
import {$} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string;
  public color: string;
  public isBlue: boolean;
  public logo: any;


  balls: number[] = [];
  tableCells: number[][] = [];
  ///rows: number[] = [];


  public constructor() {

    this.color = 'yellow';
    this.isBlue = false;
    this.logo = document.querySelector('[alt="Angular Logo"]');

    this.setLottoNumbers();
    this.setCells();

    //this.logo.classList.add('reAnimate-img');
  }

  /*sleep($milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > $milliseconds){
        break;
      }
    }
  }*/


  setLottoNumbers() {

    var exBall;
    this.balls = [];

    while(this.balls.length < 90) {

      do{
        exBall = Math.floor(Math.random() * 90) + 1;
      } while(this.balls.includes(exBall));
      this.balls.push(exBall);

    }
  }


  setCells() {

    for(var i = 0; i < 7; i++) {

      var cell;
      this.tableCells[i] = [];

      while(this.tableCells[i].length < 7) {

        var columnCells = 0;

        do{
          cell = Math.floor(Math.random() * 10) + 1;
          if (i > 0) columnCells = columnCounter(this.tableCells, this.tableCells[i].length, cell);

        } while((this.tableCells[i].includes(cell) &&
                 this.tableCells[i].indexOf(cell) != this.tableCells[i].lastIndexOf(cell)) ||  //Ha már 1-nél többször (tehát min. kétszer)
                                                                                               //szerepelt ugyanaz a szám!!!

                (i > 1 && columnCells > 1));    // Ha már az aktuális oszlopban legalább 2-szer szerepelt a szám!!!

        //} while(this.tableCells[i].includes(cell));

        this.tableCells[i].push(cell);





      }

    }


    function columnCounter(table: number[][], column : number, cell: number) : number {

      var sum = 0;
      var tableColumns = table[0].length;
      var n = 0;

      table.forEach(row => {
                    row.forEach(field => {
                                if (n % tableColumns == column && field == cell) sum++;
                                n++;
                    });
      });

      return sum;
    }


  }



  public onClick($event) {

    if ($event.shiftKey) {

      //this.color = this.color === 'blue' ? 'yellow' : 'blue';
      this.color = this.isBlue ? 'yellow' : 'blue';

          this.title = this.color;

      this.logo = document.querySelector('[alt="Angular Logo"]');

      if (this.color == 'blue') {

        this.logo.setAttribute('class','animate-img');

        //this.logo.classList.remove("reAnimate-img");

        //this.logo.classList.add("animate-img");

        /*$(this.logo).css({
          opacity       : 0.66,
          transition : 'opacity 0.3s ease-in-out'
        });*/

        //this.logo.setAttribute('transition', 'opacity 0.3s ease-in-out');    // ==>  ???
      }else {

        //this.logo.classList.remove('animate-img');
        //this.logo.classList.add('reAnimate-img');

        this.logo.setAttribute('class','reAnimate-img');

      }
      this.isBlue = !this.isBlue;

        //this.logo.setAttribute('opacity', '1');

    }else {
      if ($event.altKey) {
        /*var ballSize = 0;
        var maxBalls = 0;
        var billiars = document.querySelector('.billiards');

        //var pad = billiars.css('padding').... jQuery...???

        if (this.balls.length > 0) {

          ballSize = document.querySelector('.circle').getBoundingClientRect().width;
          maxBalls = Math.floor(document.querySelector('.billiards').clientWidth / ballSize) *
                      Math.floor(document.querySelector('.billiards').clientHeight / ballSize);
        }

        if (this.balls.length == 0 || this.balls.length < maxBalls) this.balls.push(Math.floor(Math.random() * 10));
        else alert('Megtelt a box!!');*/

        this.setLottoNumbers();

      }
    }

    console.log($event);




  }


  onGolyo($event) {

    console.log("Golyóbis!!!");
    console.log($event);
  }


  onClick2($event) {

    var exBall = -1;
    var golyok = document.getElementsByClassName('circle');

    for(var i = 0; i < 200; i++) {

      lottoSorsolas();
      //console.log('-> ' + exBall);
      /*window.setTimeout(function lottoSorsolas() {

        if (exBall == -1){

          for(var i = 0; i < golyok.length; i++) {

            golyok[i].setAttribute('style', 'background-color:gray;');

          }
        }
        else golyok[exBall].setAttribute('style', 'background-color:gray;');


        exBall = Math.floor(Math.random() * 90);
        golyok[exBall].setAttribute('style', 'background-color:LightGray;');
        console.log('-> ' + exBall);
      }, 1000);*/


    }

    function lottoSorsolas() {

      if (exBall == -1){

        for(var i = 0; i < golyok.length; i++) {

          golyok[i].setAttribute('style', 'background-color:gray;');

        }
      }
      else golyok[exBall].setAttribute('style', 'background-color:gray;');


      exBall = Math.floor(Math.random() * 90);
      golyok[exBall].setAttribute('style', 'background-color:LightGray;');
      console.log('-> ' + exBall);
    }



    /*var firstOut = false;

    for (var i = 0; i < golyok.length && !firstOut; i++) {

      if (golyok[i].getAttribute('style') != null && golyok[i].getAttribute('style').includes('LightGray')) {
        firstOut = true;
        golyok[i].setAttribute('style', 'background-color:gray;');
      }
    }*/

    //this.balls.forEach(b => {b.});

  }

  onCell($event) {

    console.log("Cellák!!!");
    console.log($event);

  }


  game1 : GameForm = new GameForm();

}


class GameForm {

  /// countDown myCountDowner;
  tippClicked : boolean;

  exX : number;
  exY : number;

  gameTime : number;

  rowSums : number[];
  colSums : number[];

  matrix : number[][];   // tableCells ....
  ///fields : JButton[][];
  fields : object[][];
  size : number;
  difficulty : number;
  minValue : number;
  maxValue : number;

  selectedFields : number;

  points : number;
  exPoints : number;

  isMaxRow : boolean;
  isMinRow : boolean;
  isMaxCol : boolean;
  isMinCol : boolean;

  maxRow : number;
  minRow : number;
  maxCol : number;
  minCol : number;

  rowMinHit : boolean;
  rowMaxHit : boolean;
  colMaxHit : boolean;
  colMinHit : boolean;

  doubleTip : boolean;

  clickButton : number;

  ///   Container area;

  constructor(size : number, difficulty : number, minValue : number, maxValue : number) {

    this.size = size;
    this.difficulty = difficulty;
    this.minValue = minValue;
    this.maxValue = maxValue;

    this.points = 0;
    this.gameTime = 31;

    initGUI(size, difficulty);
  }


  private setRandFields(minValue : number, maxValue : number) : void {

    for(var i = 0; i < this.matrix.length; i++) {
      for(var j = 0; j < this.matrix[0].length; j++) {

        this.matrix[i][j] = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      }
    }

  }


  private columnFullCount(x : number) : number {

    var sum = 0;
    for(var i = 0; i < this.matrix.length; i++) {

      sum += this.matrix[i][x];
    }

    return sum;
  }


  private rowFullCount(y : number) : number {

    var sum = 0;
    for(var i = 0; i < this.matrix[0].length; i++) {

      sum += this.matrix[y][i];
    }

    return sum;
  }


  private viewSelectedRowAndColumn(deSelect : boolean, x : number, y : number, X : number, Y : number) : void {


    var xField = this.fields[i][j] as HTMLTableCellElement;

    if (!deSelect) {

      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[0].length; j++) {

          if (xField.bgColor == 'gray' && (j == x || i == y) &&
            //fields[i][j].getBackground() != 'lightgray' && fields[i][j].getBackground() != 'pink' &&
            //fields[i][j].getBackground() != Color.white &&
            ((this.selectedFields == 0 && !(j == x && i == y)) || (this.selectedFields > 0 && !(j == X && i == Y))))
            xField.classList.add('green');
          else if (xField.bgColor == 'gray' &&
            //fields[i][j].getBackground() != 'lightgray' &&
            //fields[i][j].getBackground() != 'pink' &&
            ((this.selectedFields == 0 && j == x && i == y) || (this.selectedFields > 0 && !(j == X && i == Y))))
            xField.classList.add('orange');
        }
      }
    }
    else {

      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[0].length; j++) {

          if (xField.bgColor != 'gray' || xField.bgColor != 'pink' ||
            xField.bgColor != 'lightgray')
            xField.classList.add('gray');
        }
      }
    }

  }


  private unSetAllOtherFields(unSetting : boolean, x : number, y : number) : void {

    var xField = this.fields[i][j] as HTMLTableCellElement;

    xField

    for(var i = 0; i < this.matrix.length; i++) {
      for(var j = 0; j < this.matrix[0].length; j++) {

        if ((xField.bgColor != 'lightgray' || !xField.classList.toString().includes('notEnabled')) && !(i == y && j == x) && unSetting) {

          xField.classList.add('lightgray');
          if (!xField.classList.toString().includes('notEnabled')) xField.classList.add('notEnabled');
        }
        else if (unSetting && i == y && j == x) {

          if (this.selectedFields == 0 || xField.bgColor == 'gray')
            xField.classList.add('pink');
          else if (this.selectedFields == 1 && xField.bgColor == 'pink')
            xField.classList.add('magenta');    //  <-  new Color(255, 128,64, 32)

          if (xField.classList.toString().includes('notEnabled')) xField.classList.remove('notEnabled');
        }
        else if (!unSetting && ((i == this.minRow && (j != this.maxCol)) || (j == this.minCol && i != this.maxRow)) && !(j == x && i == y)) {

          xField.classList.add('blue');
        }
        else if (!unSetting && (i == this.maxRow || j == this.maxCol) && !(j == x && i == y)) {

          xField.classList.add('red');
        }
        else if (!unSetting && !(i == this.maxRow || i == this.minRow || j == this.maxCol || j == this.minCol) && !(j == x && i == y)) {

          xField.classList.add('gray');
        }

      }
    }
  }


  private outPut() : void {

    var myTipWas = "";

    var diffPoints = this.points - this.exPoints;

    if (diffPoints >= 1) {

      if (diffPoints % 2 == 0) diffPoints = diffPoints / 2;

      if (myTipWas == "" && this.colMaxHit) { myTipWas = "legmagasabb értékű oszlopot (+" + diffPoints + "p)"; }
      else if (this.colMaxHit) { myTipWas += "\n és a legmagasabb értékű oszlopot (+" + diffPoints + "p)"; }
      if (myTipWas == "" && this.colMinHit) { myTipWas = "legkisebb értékű oszlopot (+" + diffPoints + "p)"; }
      else if (this.colMinHit) { myTipWas += "\n és a legkisebb értékű oszlopot (+" + diffPoints + "p)"; }
      if (myTipWas == "" && this.rowMaxHit) { myTipWas = "legmagasabb értékű sort (+" + diffPoints + "p)"; }
      else if (this.rowMaxHit) { myTipWas += "\n és a legmagasabb értékű sort (+" + diffPoints + "p)"; }
      if (myTipWas == "" && this.rowMinHit) { myTipWas = "legkisebb értékű sort (+" + diffPoints + "p)"; }
      else if (this.rowMinHit) { myTipWas += "\n és a legkisebb értékű sort (+" + diffPoints + "p)"; }

    }
    else if (diffPoints < 0) {

      if (diffPoints == -1) myTipWas = "Sajnos nem talált!! (" + diffPoints + "p)";
      else if (diffPoints == -2) myTipWas = "Egy találatod sem volt! (" + diffPoints + "p)";
      else if (diffPoints == -4) myTipWas = "Egy találatod sem volt! (" + diffPoints + "p)";
    }
    else if (this.doubleTip) {

      if (this.colMaxHit) { myTipWas += "a legmagasabb értékű OSZLOPON (a SOR mellétrafált)"; }
      else if (this.colMinHit) { myTipWas += "a legkisebb értékű OSZLOPON (a SOR mellétrafált)"; }
      else if (this.rowMaxHit) { myTipWas += "a legmagasabb értékű SORON (az OSZLOP mellétrafált)"; }
      else if (this.rowMinHit) { myTipWas += "a legkisebb értékű SORON (az OSZLOP mellétrafált)"; }
    }

    myTipWas += "\nPONTSZÁMOD: " + this.points;


    /*try {
      Thread.sleep(400);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }*/


    switch (diffPoints) {

      case 0:  this.popUp("Nem kapsz pontot! \nTalálat " + myTipWas, false);  break;
      case 1:  this.popUp("Eltaláltad a " + myTipWas, false);  break;
      case 2:  this.popUp("Eltaláltad a " + myTipWas, false);  break;
      case 3:  this.popUp("Eltaláltad a " + myTipWas, false);  break;
      case 4:  this.popUp("Eltaláltad a " + myTipWas, false);  break;
      case -1:  this.popUp(myTipWas, false);  break;
      case -2:  this.popUp(myTipWas, false);  break;
      case -4:  this.popUp(myTipWas, false);  break;
      default:  break;
    }
  }


  private newPointsCalc(x : number, y : number) : void {

    this.rowSums = [];
    this.colSums = [];

    for(var Y = 0; Y < this.matrix.length; Y++) {

      this.rowSums.push(this.rowFullCount(Y));

    }

    for(var X = 0; X < this.matrix[0].length; X++) {

      this.colSums.push(this.columnFullCount(X));

    }


    /// --->  ....?!!
    ///this.maxRow = Arrays.asList(this.rowSums).indexOf(Arrays.stream(this.rowSums).max((a, b) -> Integer.compare(a, b)).get());
    // => megkeresi a legnagyobb összértékű sort (pontosabban annak az indexét a mátrixban!)
    ///this.minRow = Arrays.asList(this.rowSums).indexOf(Arrays.stream(this.rowSums).min((a, b) -> Integer.compare(a, b)).get());
    // => megkeresi a legkisebb összértékű sort...
    ///this.maxCol = Arrays.asList(this.colSums).indexOf(Arrays.stream(this.colSums).max((a, b) -> Integer.compare(a, b)).get());
    // => megkeresi a legnagyobb összértékű oszlopot...
    ///this.minCol = Arrays.asList(this.colSums).indexOf(Arrays.stream(this.colSums).min((a, b) -> Integer.compare(a, b)).get());
    // => megkeresi a legkisebb összértékű oszlopot...


    this.rowMaxHit = y == this.maxRow ? true : false;
    this.rowMinHit = y == this.minRow ? true : false;
    this.colMaxHit = x == this.maxCol ? true : false;
    this.colMinHit = x == this.minCol ? true : false;

    this.exPoints = this.points;

    if (this.doubleTip) {

      this.isMaxRow = true;
      this.isMinRow = true;
      this.isMaxCol = true;
      this.isMinCol = true;

      if (!this.rowMaxHit && !this.rowMinHit && !this.colMaxHit && !this.colMinHit) this.points -= 2;  // =>  Egyetlen legnagyobb v. legkisebb oszlop/sor sem talált!!
      else if (this.rowSums[this.maxRow] != this.colSums[this.maxCol] && this.rowSums[this.minRow] != this.colSums[this.minCol]) {

        if (this.rowMaxHit || this.rowMinHit) this.points++;
        else this.points--;

        if (this.colMaxHit || this.colMinHit) this.points++;
        else this.points--;
      }
      else {

        if (this.rowMaxHit && (this.rowSums[y] == this.rowSums[this.maxRow] && (this.rowSums[this.maxRow] == this.colSums[this.maxCol] ||
            this.rowSums[this.maxRow] == this.colSums[this.minCol]))) this.points += 2;
        else if (this.rowMinHit && (this.rowSums[y] == this.rowSums[this.minRow] && (this.rowSums[this.minRow] == this.colSums[this.minCol] ||
            this.rowSums[this.minRow] == this.colSums[this.maxCol]))) this.points += 2;
        else if (this.colMaxHit && (this.colSums[x] == this.colSums[this.maxCol] && (this.colSums[this.maxCol] == this.rowSums[this.maxRow] ||
            this.colSums[this.maxCol] == this.rowSums[this.minRow]))) this.points += 2;
        else if (this.colMinHit && (this.colSums[x] == this.colSums[this.minCol] && (this.colSums[this.minCol] == this.rowSums[this.minRow] ||
            this.colSums[this.minCol] == this.rowSums[this.maxRow]))) this.points += 2;

        if (this.colMaxHit && this.rowMaxHit && this.rowSums[this.maxRow] == this.colSums[this.maxCol]) this.points += 2;
        else if (this.colMinHit && this.rowMinHit && this.rowSums[this.minRow] == this.colSums[this.minCol]) this.points += 2;

      }

    }
    else {

      if (this.colMaxHit && this.isMaxCol) this.points++;
      else if (this.colMinHit && this.isMinCol) this.points++;
      else if (this.rowMaxHit && this.isMaxRow) this.points++;
      else if (this.rowMinHit && this.isMinRow) this.points++;    //JAVÍTVA LETT:     && isMinCol) points++;   !!!!
      else this.points--;

    }

    ///return this.points;
  }


  private newTable() : void {

    ///this.setVisible(false);

    ///**********...   area.setVisible(false);

    //this.dispose();
    //Main.main(null);

    ////this(size, difficulty, minValue, maxValue);

    ///**********...   area.removeAll();
    this.initGUI(this.size, this.difficulty);

  }


  private initGUI(size : number, difficulty : number) : void {

    this.matrix = new int[size][size];

    this.setRandFields(this.minValue, this.maxValue);

    this.tippClicked = false;
    this.selectedFields = 0;

    this.exPoints = this.points;

    this.isMaxRow = false;
    this.isMinRow = false;
    this.isMaxCol = false;
    this.isMinCol = false;

    this.rowMaxHit = false;
    this.colMaxHit = false;
    this.rowMinHit = false;
    this.colMinHit = false;

    ///********   setTitle("Mixi-Maxi-Mini");
    ///********   setSize(450, 450);

    ///********   setLocationRelativeTo(null);

    ///********   setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    ///********   area = getContentPane();
    ///********   area.setVisible(false);

    ///********   GridLayout glay = new GridLayout(0, size);

    this.fields = new JButton[size + 1][size];
    area.setLayout(glay);

    myCountDowner = new countDown(this.fields, this.matrix);


    for(var i = 0; i <= this.matrix.length; i++) {
      for(var j = 0; j < this.matrix[0].length; j++) {

        if (i < this.matrix.length) {

          this.fields[i][j] = new JButton();
          area.add(this.fields[i][j]);

          this.fields[i][j].setForeground(new Color(128, 0,128, 205));
          this.fields[i][j].setBackground(Color.gray);

          this.fields[i][j].setFont(new Font("Monaco", Font.PLAIN, 25));
          this.fields[i][j].setBorder(BorderFactory.createLineBorder(new Color(185, 122,87, 5)));

          this.fields[i][j].setText(String.valueOf(this.matrix[i][j]));

        }
        else {

          this.fields[i][j] = new JButton();
          area.add(this.fields[i][j]);

          this.fields[i][j].setForeground(Color.black);
          if (j < this.matrix[0].length - 1) this.fields[i][j].setBackground(Color.black);
          else  this.fields[i][j].setBackground(Color.lightGray);


          this.fields[i][j].setFont(new Font("Tahoma", Font.PLAIN, 15));

          this.fields[i][j].setBorderPainted(false);
          if (j < this.matrix[0].length - 1) this.fields[i][j].setEnabled(false);
        }

        final int i2 = i;
        final int j2 = j;


        this.fields[i][j].addMouseListener(new MouseAdapter() {

        public mouseEntered(MouseEvent evt) : void {

            if (((i2 != this.exY && j2 != this.exX) && this.exX != -1) && this.fields[i2][j2].getBackground() != Color.lightGray) {
            this.viewSelectedRowAndColumn(false, j2, i2, this.exX, this.exY);

            this.playSound("sounds/klakk.wav");
          }
        }

        public mouseExited(MouseEvent evt) : void {

            if (((i2 != this.exY && j2 != this.exX) && this.exX != -1) && this.fields[i2][j2].getBackground() != Color.lightGray)
          this.viewSelectedRowAndColumn(true, j2, i2, this.exX, this.exY);

        }


        public mouseClicked(MouseEvent me) : void {

            //if ((me.getModifiers() & InputEvent.BUTTON1_DOWN_MASK) != 0) ...
            //==> ha MouseEvent, akkor így is használható??!  ->> event.isShiftDown()

            var shiftDown = me.getModifiersEx() != 0 ? true : false;
          this.clickButton = (me.getButton() == MouseEvent.BUTTON1 ? 1 : (me.getButton() > MouseEvent.BUTTON1 ? 2 : 0));
          //int this.clickButton = InputEvent.BUTTON1_DOWN_MASK != 0 ? 1 : (InputEvent.BUTTON2_DOWN_MASK != 0 ? 2 : 0);

          if (this.clickButton != 0) {

            var X = j2;
            var Y = i2;

            var specField = 4;
            if (i2 != 0) specField--; else if (!shiftDown) this.isMaxCol = true;
            if (j2 != 0) specField--; else if (!shiftDown) this.isMaxRow = true;
            if (i2 != this.matrix.length - 1) specField--; else if (!shiftDown) this.isMinCol = true;
            if (j2 != this.matrix[0].length - 1) specField--; else if (!shiftDown) this.isMinRow = true;

            this.selectedFields = (int) Arrays.stream(this.fields).flatMap(r -> Arrays.stream(r)).filter(f -> f.getBackground() == Color.pink).count();


            if (this.selectedFields > 0 && (this.exX != X || this.exY != Y)) {

              Arrays.stream(this.fields).flatMap(r -> Arrays.stream(r)).forEach(f -> {
                if (f.getBackground() != Color.gray) f.setBackground(Color.gray);
              });
              this.selectedFields = 0;
              this.doubleTip = false;
            }

            this.exX = X;
            this.exY = Y;

            var trueMaxOrMin = [];

            if (this.isMaxRow) trueMaxOrMin.push(this.isMaxRow);
            if (this.isMinRow) trueMaxOrMin.push(this.isMinRow);
            if (this.isMaxCol) trueMaxOrMin.push(this.isMaxCol);
            if (this.isMinCol) trueMaxOrMin.push(this.isMinCol);

            if (this.selectedFields == 0 || trueMaxOrMin.length > 1) {

              this.doubleTip = false;
              this.isMaxRow = false;
              this.isMinRow = false;
              this.isMaxCol = false;
              this.isMinCol = false;
            }


            if (!this.doubleTip && specField == 1 && !shiftDown && this.clickButton == 1 &&
              ((this.selectedFields == 0 && (this.fields[i2][j2].getBackground() == Color.gray ||
                this.fields[i2][j2].getBackground() == Color.orange)) ||
                (this.selectedFields == 1 && this.fields[i2][j2].getBackground() == Color.pink))) {

              if (this.selectedFields == 0) {
                this.unSetAllOtherFields(true, j2, i2);
                this.playSound("sounds/kloty.wav");
              }
              else {
                this.doubleTip = false;

                try {
                  Thread.sleep(500);
                } catch (InterruptedException e) {
                  e.printStackTrace();
                }
                this.tippClicked = true;

                this.newPointsCalc(X, Y);
                this.unSetAllOtherFields(false, j2, i2);

                this.fields[i2][j2].setBackground(Color.lightGray);
                this.outPut();
              }
            }
            else if (!this.doubleTip && specField == 2 && !shiftDown &&
              ((this.selectedFields == 0 && this.fields[i2][j2].getBackground() != Color.pink) ||
                (this.selectedFields == 1 && this.fields[i2][j2].getBackground() == Color.pink))) {
              // => valamelyik sarok esetén... a tippelésünk irányát (függőleges/vízszintes) a bal-jobb
              //    egér kattintással lehet megerősíteni!!!

              if (this.selectedFields == 1) {

                this.doubleTip = false;  // egyszerre csak egy irányra /oszlopra VAGY sorra/ történő tippelés!!!

                if (this.clickButton == 2) {   // ha a jobb egérgombot nyomtuk -> ekkor a sorra tippelünk!!

                  if (this.isMaxCol) this.isMaxCol = false;
                  if (this.isMinCol) this.isMinCol = false;
                }
                else {   // ha a bal egérgombot nyomtuk -> ekkor az oszlopra tippelünk!!

                  if (this.isMaxRow) this.isMaxRow = false;
                  if (this.isMinRow) this.isMinRow = false;
                }

              }

              if (this.selectedFields == 0) {
                this.unSetAllOtherFields(true, j2, i2);
                this.playSound("sounds/kloty.wav");
              }
              else {

                /*try {
                  Thread.sleep(500);
                } catch (InterruptedException e) {
                  e.printStackTrace();
                }*/

                this.tippClicked = true;

                this.newPointsCalc(X, Y);
                this.unSetAllOtherFields(false, j2, i2);

                this.fields[i2][j2].setBackground(Color.lightGray);
                this.outPut();
              }

            }
            else if (this.clickButton == 1 && shiftDown &&
              ((this.selectedFields == 0 && this.fields[i2][j2].getBackground() != Color.pink) ||
                (this.selectedFields == 1 || this.fields[i2][j2].getBackground() == Color.pink))) {

              if (this.selectedFields == 0) {
                if (specField == 0) this.doubleTip = true;
                this.unSetAllOtherFields(true, j2, i2);
                this.playSound("sounds/kloty.wav");
              }
              else {

                if (!this.doubleTip) this.doubleTip = true;

                /*try {
                  Thread.sleep(500);
                } catch (InterruptedException e) {
                  e.printStackTrace();
                }*/


                this.tippClicked = true;

                this.newPointsCalc(X, Y);
                this.unSetAllOtherFields(false, j2, i2);

                this.fields[i2][j2].setBackground(Color.lightGray);
                this.outPut();
              }

            }


            if (this.tippClicked || this.exPoints != this.points || (this.selectedFields > 0 && this.doubleTip && this.fields[i2][j2].getBackground() == Color.lightGray)) {

              if (this.exPoints >= this.points)
                this.playSound("sounds/klakk.wav");
              else this.playSound("sounds/phuhhuuj.wav");

              /*try {
                Thread.sleep(300);
              } catch (InterruptedException e) {
                e.printStackTrace();
              }*/

              this.exPoints = this.points;

              myCountDowner.timer.cancel();

              this.newTable();
            }
          }

        }});

        /*this.fields[i][j].addMouseListener(new MouseAdapter() {  //=>  egyszerre két külön mouseAdapter nem lehet!!??

        });*/
      }
    }

    ///********   if (!area.isVisible()) area.setVisible(true);

  }




private popUp(message : string, gameOver : boolean) : boolean {

    if (!gameOver) { alert(message); return false; }
    else { alert(message); return true; }

  }





}
