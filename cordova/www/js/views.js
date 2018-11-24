/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var LED_SERVICE_UUID = "0000a000-0000-1000-8000-00805F9B34FB"

var LED1_UUID = "0000a001-0000-1000-8000-00805F9B34FB"
var LED2_UUID = "0000a002-0000-1000-8000-00805F9B34FB"
var LED3_UUID = "0000a003-0000-1000-8000-00805F9B34FB"
var LED4_UUID = "0000a004-0000-1000-8000-00805F9B34FB"
views = {
	main: function(device) {
		$("#info-badge").html('Connected to device')
		console.log('Connected to device: ' + device.name);
		try {
			tpl = $("#home-tpl").html()
			var homeTpl = Handlebars.compile(tpl);
			$('body').html(homeTpl);
			$("#info-list").append("<div>" + "Connecting to services..." + "</div>")
			// Get service and characteristics.

			var ledMap = [[LED1_UUID, LED2_UUID], [LED4_UUID, LED3_UUID]]
			$("#info-list").append("<div>" + "Connected to LEDs" + "</div>")
			// Create update map callback and load pixel picker
			updateMap = function(map, rowIndex, cellIndex){
				var service = evothings.ble.getService(device, LED_SERVICE_UUID)
				var ledChr = evothings.ble.getCharacteristic(service, ledMap[rowIndex][cellIndex])
				$("#info-list").html("")
				appLog("Device: " + device.name + " : " + rowIndex + "-" + cellIndex);
				appLog("Char:"  + (ledMap[rowIndex][cellIndex]));
				var i = (map[rowIndex][cellIndex].toString() == "255,255,255") ? 0 : 1;
				evothings.ble.writeCharacteristic(
					device,
					ledChr,
					new Uint8Array([i]),
					function(){}, function(){})
			}
			$('.pixel-picker-container').pixelPicker({palette: [ '#ffffff', '#000000'], update: updateMap.bind(this)});
		 }
		catch(err) {
			appLog(err);
			console.log(err.stack);
		}
	},
	connectError: function(errorCode)
	{
		$("#info-badge").html('Connect error: ' + errorCode)
		console.log('Connect error: ' + errorCode);
		$("#retry-btn-container").show();
	}
}	