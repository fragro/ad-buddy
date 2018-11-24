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

// views should drive data retrieval and rendering of Handlebars templates
views = {
	main: function(device) {
		$("#info-badge").html('Connected to device')
		console.log('Connected to device: ' + device.name);
		try {
			tpl = $("#home-tpl").html()
			var homeTpl = Handlebars.compile(tpl);
			$('body').html(homeTpl);
			// Create update map callback and load pixel picker
			led.initialize(device);
		 }
		catch(err) {
			appLog(err);
			console.log(err.stack);
		}
	},
	disconnect: function(errorCode)
	{
		$("#info-badge").html('Disconnected from device')
		console.log('Disconnected: ' +errorCode);
		$("#retry-btn-container").show();
	},
	error: function(errorCode){
		$("#info-badge").html('Connect error: ' + errorCode)
		console.log('Connect error: ' + errorCode);
		$("#retry-btn-container").show();

	}
}	