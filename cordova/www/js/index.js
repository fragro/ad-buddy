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

appLog = function(msg) {
	debug = true
	if(debug) {
		$("#info-list").append("<div>" + msg + "</div>")
		console.log(msg);
	}
}

var app = {
	// Application Constructor
	initialize: function() {
		console.log('Init begin...');
		//Events
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		
		// Redirect console.log to Evothings Workbench.
		if (window.hyper && window.hyper.log) { console.log = hyper.log }
		console.log('Init complete!');
	},
	// This function is called when a device is detected, here
	// we check if we found the device we are looking for.
	onDeviceFound: function(device)
	{
		appLog('device.name: ' + device.name)
		if (device.name == 'LED')
		{
			// Stop scanning.
			evothings.ble.stopScan()

			// Connect.
			$("#info-badge").html("Connecting...")
			evothings.ble.connectToDevice(
				device,
				function(device)
				{
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
				function(device)
				{
					$("#info-badge").html('Disconnected from device')
					console.log('Disconnected from device: ' + device.name);
					$("#retry-btn-container").show();

				},
				function(errorCode)
				{
					$("#info-badge").html('Connect error: ' + errorCode)
					console.log('Connect error: ' + errorCode);
					$("#retry-btn-container").show();
				}
			);
		}
	},
	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function() {
		this.receivedEvent('deviceready');
		var resetBtn = document.getElementById("retry-btn");
		resetBtn.addEventListener('click', this.receivedEvent('deviceready').bind(this), false);
	},
	onConnectError: function(err) {
		appLog(err)
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		$("#retry-btn-container").hide();
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);

		$("#info-badge").html("Starting Scan")
		evothings.ble.startScan(this.onDeviceFound, this.onConnectError);
	}
};

app.initialize();