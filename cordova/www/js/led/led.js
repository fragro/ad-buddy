var LED_SERVICE_UUID = "0000a000-0000-1000-8000-00805F9B34FB"
var LED1_UUID = "0000a001-0000-1000-8000-00805F9B34FB"
var LED2_UUID = "0000a002-0000-1000-8000-00805F9B34FB"
var LED3_UUID = "0000a003-0000-1000-8000-00805F9B34FB"
var LED4_UUID = "0000a004-0000-1000-8000-00805F9B34FB"
var ledMap = [[LED1_UUID, LED2_UUID], [LED4_UUID, LED3_UUID]]

led = {
	initialize: function(device){
		updateMap = function(map, rowIndex, cellIndex){
			// Get service and characteristics.
			$("#info-list").append("<div>" + "Connecting to LEDs" + "</div>")
			var service = evothings.ble.getService(device, LED_SERVICE_UUID)
			console.log(ledMap[rowIndex][cellIndex])
			console.log(service)
			var ledChr = evothings.ble.getCharacteristic(service, ledMap[rowIndex][cellIndex])
			$("#info-list").html("")
			appLog("Device: " + device.name + " : " + rowIndex + "-" + cellIndex);
			appLog("Char:"  + (ledMap[rowIndex][cellIndex]));
			var i = (map[rowIndex][cellIndex].toString() == "255,255,255") ? 0 : 1;
			self = this
			evothings.ble.writeCharacteristic(
				device,
				ledChr,
				new Uint8Array([i]),
				function(){}, function(){})
		}
		$('.pixel-picker-container').pixelPicker({palette: [ '#ffffff', '#000000'], update: updateMap.bind(this)});
	}
}