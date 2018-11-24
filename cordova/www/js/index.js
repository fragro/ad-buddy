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
		$("#info-list").html('device.name: ' + device.name)
		if (device.name == 'LED')
		{
			// Stop scanning.
			evothings.ble.stopScan()

			// Connect.
			$("#info-badge").html("Connecting...")
			evothings.ble.connectToDevice(
				device,
				function(device) { views.main(device) },
				function(errorCode) { views.disconnect(errorCode) },
				function(errorCode) { views.error(errorCode) }
			)
		}
	},
	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function() {
		var self = this
		this.receivedEvent('deviceready');
		var resetBtn = document.getElementById("retry-btn");
		resetBtn.addEventListener('click', function(){
			console.log("Retry connection...")
			$("#retry-btn-container").hide();
			evothings.ble.startScan(self.onDeviceFound.bind(this), self.onConnectError.bind(this));
		})
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