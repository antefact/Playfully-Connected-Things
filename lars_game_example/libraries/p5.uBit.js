var ACCEL_SRV = 'e95d0753-251d-470a-a062-fa1922dfa9a8'
var ACCEL_DATA = 'e95dca4b-251d-470a-a062-fa1922dfa9a8'
var ACCEL_PERIOD = 'e95dfb24-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_SRV = 'e95df2d8-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_DATA = 'e95dfb11-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_PERIOD = 'e95d386c-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_BEARING = 'e95d9715-251d-470a-a062-fa1922dfa9a8'
var BTN_SRV = 'e95d9882-251d-470a-a062-fa1922dfa9a8'
var BTN_A_STATE = 'e95dda90-251d-470a-a062-fa1922dfa9a8'
var BTN_B_STATE = 'e95dda91-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_SRV = 'e95d127b-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_DATA = 'e95d8d00-251d-470a-a062-fa1922dfa9a8'
var IO_AD_CONFIG = 'e95d5899-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_CONFIG = 'e95db9fe-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_PWM = 'e95dd822-251d-470a-a062-fa1922dfa9a8'
var LED_SRV = 'e95dd91d-251d-470a-a062-fa1922dfa9a8'
var LED_STATE = 'e95d7b77-251d-470a-a062-fa1922dfa9a8'
var LED_TEXT = 'e95d93ee-251d-470a-a062-fa1922dfa9a8'
var LED_SCROLL = 'e95d0d2d-251d-470a-a062-fa1922dfa9a8'
var TEMP_SRV = 'e95d6100-251d-470a-a062-fa1922dfa9a8'
var TEMP_DATA = 'e95d9250-251d-470a-a062-fa1922dfa9a8'
var TEMP_PERIOD = 'e95d1b25-251d-470a-a062-fa1922dfa9a8'



class uBit {

  constructor() {
    this.accelerometer = {
      x: 0,
      y: 0,
      z: 0
    };

    this.magnetometer_raw = {
      x: 0,
      y: 0,
      z: 0
    };

    this.magnetometer_bearing = 0;
    this.temperature = 0;
    this.buttonA = 0;
    this.buttonB = 0;
    this.connected=false;
  }

  getTemperature(){
    return this.temperature;
  }

  getAccelerometer(){
    return this.accelerometer;
  }

  getBearing(){
    return this.magnetometer_bearing;
  }

  getButtonA(){
    return this.buttonA;
  }

  getButtonB(){
    return this.buttonB;
  }

  characteristic_updated(event) {

    //BUTTON CHARACTERISTIC
    if (event.target.uuid == BTN_A_STATE) {
      //console.log("BTN_A_STATE", event.target.value.getInt8());
      this.buttonA = event.target.value.getInt8();
    }

    if (event.target.uuid == BTN_B_STATE) {
      //console.log("BTN_B_STATE", event.target.value.getInt8());
      this.buttonB = event.target.value.getInt8();
    }

    //ACCELEROMETER CHARACTERISTIC
    if (event.target.uuid == ACCEL_DATA) {
      //true is for reading the bits as little-endian
      //console.log("ACCEL_DATA_X", event.target.value.getInt16(0,true));
      //console.log("ACCEL_DATA_Y", event.target.value.getInt16(2,true));
      //console.log("ACCEL_DATA_Z", event.target.value.getInt16(4,true));
      this.accelerometer.x = event.target.value.getInt16(0, true);
      this.accelerometer.y = event.target.value.getInt16(2, true);
      this.accelerometer.z = event.target.value.getInt16(4, true);
    }

    // MAGNETOMETER CHARACTERISTIC (raw data)
    if (event.target.uuid == MAGNETO_DATA) {
      //  console.log("MAGNETO_DATA_X", event.target.value.getInt16(0,true));
      //  console.log("MAGNETO_DATA_Y", event.target.value.getInt16(2,true));
      //  console.log("MAGNETO_DATA_Z", event.target.value.getInt16(4,true));
      this.magnetometer_raw.x = event.target.value.getInt16(0, true);
      this.magnetometer_raw.y = event.target.value.getInt16(2, true);
      this.magnetometer_raw.z = event.target.value.getInt16(4, true);
    }

    // MAGNETOMETER CHARACTERISTIC (bearing)
    if (event.target.uuid == MAGNETO_BEARING) {
      //console.log("BEARING", event.target.value.getInt16(0,true));
      this.magnetometer_bearing=event.target.value.getInt16(0,true);
    }

    // TEMPERATURE CHARACTERISTIC
    if (event.target.uuid == TEMP_DATA) {
      //console.log("TEMP_DATA", event.target.value.getInt8());
      this.temperature = event.target.value.getInt8();

    }
  }

  searchDevice() {
    filters: []
    var options = {};
    options.acceptAllDevices = true;
    options.optionalServices = [ACCEL_SRV, MAGNETO_SRV, BTN_SRV, IO_PIN_SRV, LED_SRV, TEMP_SRV];

    console.log('Requesting Bluetooth Device...');
    console.log('with ' + JSON.stringify(options));

    navigator.bluetooth.requestDevice(options)
    .then(device => {

      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Connected:        ' + device.gatt.connected);

      // Attempts to connect to remote GATT Server.
      return device.gatt.connect();

    })
    .then(server => {
      // Note that we could also get all services that match a specific UUID by
      // passing it to getPrimaryServices().
      this.connected=true;
      console.log('Getting Services...');
      return server.getPrimaryServices();
    })
    .then(services => {
      console.log('Getting Characteristics...');
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
          console.log('> Service: ' + service.uuid);
          characteristics.forEach(characteristic => {
            console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
              getSupportedProperties(characteristic));
            if (getSupportedProperties(characteristic).includes('NOTIFY')) {
              characteristic.startNotifications().catch(err => console.log('startNotifications', err));
              characteristic.addEventListener('characteristicvaluechanged',
                this.characteristic_updated.bind(this));
            }
          });
        }));
      });
      return queue;
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
}









/* Utils */

function isWebBluetoothEnabled() {
  if (navigator.bluetooth) {
    return true;
  } else {
    ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
      'Please make sure the "Experimental Web Platform features" flag is enabled.');
    return false;
  }
}


function getSupportedProperties(characteristic) {
  let supportedProperties = [];
  for (const p in characteristic.properties) {
    if (characteristic.properties[p] === true) {
      supportedProperties.push(p.toUpperCase());
    }
  }
  return '[' + supportedProperties.join(', ') + ']';
}
