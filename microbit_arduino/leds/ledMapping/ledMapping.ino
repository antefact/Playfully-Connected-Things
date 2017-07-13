//int LED_ROW1 = 26;
//int LED_ROW2 = 27;
//int LED_ROW3 = 28;
//
//int LED_COL1 = 3;
//int LED_COL2 = 4;
//int LED_COL3 = 10;
//int LED_COL4 = 23;
//int LED_COL5 = 24;
//int LED_COL6 = 25;
//int LED_COL7 = 9;
//int LED_COL8 = 7;
//int LED_COL9 = 6;

int ledRows[] = {26, 27, 28};
int ledColumns[] = {3, 4, 10, 23, 24, 25, 9, 7, 6};

int ledMapping[][25] =
{
  {ledRows[1], ledColumns[0]},
  {ledRows[2], ledColumns[4]},
  {ledRows[1], ledColumns[2]},
  {ledRows[2], ledColumns[5]},
  {ledRows[1], ledColumns[3]},

  {ledRows[3], ledColumns[4]},
  {ledRows[3], ledColumns[5]},
  {ledRows[3], ledColumns[6]},
  {ledRows[3], ledColumns[7]},
  {ledRows[3], ledColumns[8]},

  {ledRows[2], ledColumns[2]},
  {ledRows[1], ledColumns[9]},
  {ledRows[2], ledColumns[3]},
  {ledRows[3], ledColumns[9]},
  {ledRows[2], ledColumns[1]},

  {ledRows[1], ledColumns[8]},
  {ledRows[1], ledColumns[7]},
  {ledRows[1], ledColumns[6]},
  {ledRows[1], ledColumns[5]},
  {ledRows[1], ledColumns[4]},

  {ledRows[3], ledColumns[3]},
  {ledRows[2], ledColumns[7]},
  {ledRows[3], ledColumns[1]},
  {ledRows[2], ledColumns[6]},
  {ledRows[3], ledColumns[3]}

};


void setup() {
  for (int row=0;row<3;row++){
    pinMode(row,OUTPUT);
  }
  for (int col=0;col<9;col++){
    pinMode(col,OUTPUT);
  }
  
}

void loop() {
  for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {

      turnOnPixel(i, j);
      delay(100);
    }
  }

}


void turnOnPixel(int i, int j) {


  for (int c = 0; c < 9; c++) {
    if (ledMapping[i * 5 + j][1] == ledColumns[c]) {
      digitalWrite(ledColumns[c], LOW); // turn the LED on (HIGH is the voltage level)
    } else {
      digitalWrite(ledColumns[c], HIGH); // turn the LED on (HIGH is the voltage level)
    }
  }

  for (int r = 0; r < 3; r++) {
    if (ledMapping[i * 5 + j][0] == ledRows[r]) {
      digitalWrite(ledRows[r], HIGH); // turn the LED on (HIGH is the voltage level)
    } else {
      digitalWrite(ledRows[r], LOW); // turn the LED on (HIGH is the voltage level)
    }
  }
}

