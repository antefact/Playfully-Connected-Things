// Variable
var discoveryButton = document.getElementById('discover')

discoveryButton.addEventListener('pointerup', function(event) {
    // Here we assign the behaviour to the button to search ble devices
    searchDevice();
});

function searchDevice() {
    filters: []

    options = {};
    // We want to see all devices
    options.acceptAllDevices = true;
    options.optionalServices= ['19b10010-e8f2-537e-4f6c-d104768a1214']

    console.log('Requesting Bluetooth Device...');
    console.log('with ' + JSON.stringify(options));

    navigator.bluetooth.requestDevice(options)
        .then(device => {

            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);
            console.log('> Connected:        ' + device.gatt.connected);

            $('#name').val(device.name);

            // Attempts to connect to remote GATT Server.
            return device.gatt.connect();

        })
        .then(server => {
            // Here we get all services that match a specific UUID (the identification of the microbit ).
            console.log('Getting All Services...');
            return server.getPrimaryServices();
        })
        .then(services => {
            // Here we look into all the characteristics (what the microbit is sending...)
            console.log('Getting Characteristics...');
            let queue = Promise.resolve();
            services.forEach(service => {
                queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                    console.log('> Service: ' + service.uuid);
                      // Here we pass all characteristics to a function that we can then control on the sketch.js file
                    characteristics.forEach(characteristic => {
                        console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                            getSupportedProperties(characteristic));
                            characteristic.startNotifications()
                            characteristic.addEventListener('characteristicvaluechanged',
                                microbit_updated);
                            // Reading Battery Level...
                            return characteristic.readValue();
                    });
                }));
            });
            return queue;
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}

/* Utils or stuff that we don't have to look into that much */


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
