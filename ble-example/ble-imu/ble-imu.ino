#include <CurieBLE.h>
#include <Adafruit_NeoPixel.h>
#include "CurieIMU.h"


const int ledPin = 13; // set ledPin to on-board LED
int orientation = 0;

BLEService accelerometerService("19B10010-E8F2-537E-4F6C-D104768A1214"); // create service

// create switch characteristic and allow remote device to read and write
BLECharCharacteristic shake_event_Characteristic("19B10011-E8F2-537E-4F6C-D104768A1214", BLERead | BLENotify);
BLEIntCharacteristic orientation_Characteristic("19B10012-E8F2-537E-4F6C-D104768A1214", BLERead | BLENotify);


void setup() {
  Serial.begin(9600);

  BLE.begin();

  // set the local name peripheral advertises
  BLE.setLocalName("curie");

  // set the UUID for the service this peripheral advertises
  BLE.setAdvertisedService(accelerometerService);

  // add the characteristic to the service
  accelerometerService.addCharacteristic(shake_event_Characteristic);
  accelerometerService.addCharacteristic(orientation_Characteristic);

  // add service
  BLE.addService(accelerometerService);

  Serial.println("Bluetooth device active, waiting for connections...");

  shake_event_Characteristic.setValue(0);

  // start advertising
  BLE.advertise();

  CurieIMU.begin();
  CurieIMU.attachInterrupt(eventCallback);

  /* Enable Shock Detection */
  CurieIMU.setDetectionThreshold(CURIE_IMU_SHOCK, 1500); // 1.5g = 1500 mg
  CurieIMU.setDetectionDuration(CURIE_IMU_SHOCK, 50);   // 50ms
  CurieIMU.interrupts(CURIE_IMU_SHOCK);

  Serial.println("IMU initialisation complete, waiting for events...");
}

volatile bool event = false;

void loop() {
  BLE.poll();

  int x = CurieIMU.readAccelerometer(X_AXIS);
  Serial.println(x);
  if (x > 7000 && orientation != 1) {
    orientation = 1;
    orientation_Characteristic.setValue(1);
    Serial.println("right");
  } else if (x < -7000 && orientation != -1) {
    orientation = -1;
    orientation_Characteristic.setValue(-1);
    Serial.println("left");
  } else if (x < 7000 && x > -7000 && orientation != 0) {
    orientation = 0;
    orientation_Characteristic.setValue(0);
    Serial.println("stop");
  }

  if (event) {
    Serial.println("shake");
    shake_event_Characteristic.setValue(1);
    digitalWrite(ledPin, HIGH);
    delay(10);
    digitalWrite(ledPin, LOW);
    event = false;
  }
}


static void eventCallback(void) {
  if (CurieIMU.getInterruptStatus(CURIE_IMU_SHOCK)) {
    event = true;
  }
}
