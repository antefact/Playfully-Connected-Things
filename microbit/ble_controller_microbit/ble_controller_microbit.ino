#include <SPI.h>
#include <BLEPeripheral.h>
#include <Microbit_display.h>

Microbit_display screen = Microbit_display();

#if !defined(NRF51) && !defined(NRF52) && !defined(__RFduino__)
#error "This example only works with nRF51 boards"
#endif

char* microbitServiceUUID = "19B10010-E8F2-537E-4F6C-D104768A1214";
char* shake_event_CharacteristicUUID = "19B10011-E8F2-537E-4F6C-D104768A1214";
char* orientation_CharacteristicUUID = "19B10012-E8F2-537E-4F6C-D104768A1214";


char* localName = "micro:bit controller";

BLEPeripheral blePeripheral = BLEPeripheral();

BLEService microbitService = BLEService(microbitServiceUUID);

BLECharCharacteristic orientation_Characteristic = BLECharCharacteristic(orientation_CharacteristicUUID,  BLERead | BLENotify);


int buttonAState = 1;
int oldbuttonAState = 1;

int buttonBState = 1;
int oldbuttonBState = 1;

boolean hearth[]={
  0,1,0,1,0,
  1,0,1,0,1,
  1,0,0,0,1,
  0,1,0,1,0,
  0,0,1,0,0,
};


void setup() {
  Serial.begin (9600);
  

  blePeripheral.setLocalName(localName);
  blePeripheral.setAdvertisedServiceUuid(microbitService.uuid());

  blePeripheral.addAttribute(microbitService);
  blePeripheral.addAttribute(orientation_Characteristic);


  // assign event handlers for connected, disconnected to peripheral
  blePeripheral.setEventHandler(BLEConnected, blePeripheralConnectHandler);
  blePeripheral.setEventHandler(BLEDisconnected, blePeripheralDisconnectHandler);

  blePeripheral.begin();
  
  pinMode(PIN_BUTTON_A, INPUT_PULLUP);
  pinMode(PIN_BUTTON_B, INPUT_PULLUP);

}

void loop() {

  blePeripheral.poll();

  if (readButtonA()){
    Serial.println("A");
    orientation_Characteristic.setValue(-1);

  } 
  if (readButtonB()){
    Serial.println("B");
    orientation_Characteristic.setValue(1);

  }
}



void blePeripheralConnectHandler(BLECentral& central) {
  // central connected event handler
  Serial.print(F("Connected event, central: "));
  Serial.println(central.address());
}

void blePeripheralDisconnectHandler(BLECentral& central) {
  // central disconnected event handler
  Serial.print(F("Disconnected event, central: "));
  Serial.println(central.address());
  Serial.println("waiting for someone");
}

void characteristicWritten(BLECentral& central, BLECharacteristic& characteristic) {
  // characteristic value written event handler
  Serial.print(F("Characteristic event, writen: "));
}

boolean readButtonA() {
  buttonAState = digitalRead(PIN_BUTTON_A);
  int buttonReleased = false;
  if (buttonAState && !oldbuttonAState) {
    buttonReleased = true;
  } else {
    buttonReleased = false;
  }
  oldbuttonAState = buttonAState;
  return (buttonReleased);
}

boolean readButtonB() {
  buttonBState = digitalRead(PIN_BUTTON_B);
  int buttonReleased = false;
  if (buttonBState && !oldbuttonBState) {
    buttonReleased = true;
  } else {
    buttonReleased = false;
  }
  oldbuttonBState = buttonBState;
  return (buttonReleased);
}



