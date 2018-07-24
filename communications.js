var usbDetect = require('usb-detection');

//var usb = require('usb');
//app = express();



// app.get('/test',function(res,req){
//     console.log('bhaskar bhausaheb newase');
// });

// Detect add/insert
// usbDetect.on('add', function(device) { console.log('add', device); });
// usbDetect.on('add:vid', function(device) { console.log('add', device); });
// usbDetect.on('add:vid:pid', function(device) { console.log('add', device); });

// // Detect remove
// usbDetect.on('remove', function(device) { console.log('remove', device); });
// usbDetect.on('remove:vid', function(device) { console.log('remove', device); });
// usbDetect.on('remove:vid:pid', function(device) { console.log('remove', device); });

// // Detect add or remove (change)
// usbDetect.on('change', function(device) { console.log('change', device); });
// usbDetect.on('change:vid', function(device) { console.log('change', device); });
// usbDetect.on('change:vid:pid', function(device) { console.log('change', device); });

// Get a list of USB devices on your system, optionally filtered by `vid` or `pid`

// module.exports.list = function(req, res){
// 	console.log('bhskar newase bhausaheb');
// }

usbDetect.find(function(err, devices) {
	// for (var i = 0; i < devices.length; i++) {
	//  	var device = devices[i];
	// 	console.log(device.deviceName);
	// 	console.log(device.manufacturer);

	// }
	return devices;
	//console.log(devices);
	//console.log('find', devices, err);
});
//usbDetect.find(vid, function(err, devices) { console.log('find', devices, err); });
//usbDetect.find(vid, pid, function(err, devices) { console.log('find', devices, err); });
// Promise version of `find`:
//usbDetect.find().then(function(devices) { console.log(devices); }).catch(function(err) { console.log(err); });





//var devices = usb.getDeviceList();

// for (var i = 0; i < devices.length; i++) {
// 	var device = devices[i];
	

// 	var bus = device.busNumber;
// 	var desc = device.deviceDescriptor;
// 	var address = device.deviceAddress;
// 	console.log(address);
// 	//console.log(bus);
// 	// console.log(desc.bLength);
// 	// console.log(desc.bDescriptorType);
// 	// console.log(desc.bcdUSB);
// 	// console.log(desc.bDeviceClass);
// 	// console.log(desc.bDeviceSubClass);
// 	// console.log(desc.bDeviceProtocol);
// 	// console.log(desc.bMaxPacketSize0);
// 	// console.log(desc.idVendor);
// 	// console.log(desc.idProduct);
// 	// console.log(desc.bcdDevice);
// 	// console.log(desc.iManufacturer);
// 	// console.log(desc.iProduct);
// 	// console.log(desc.iSerialNumber);
// 	// console.log(desc.bNumConfigurations);

// }