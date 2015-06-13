
var closestBeacon = null, OnVoiceBeacon = null, OnBGMBeacon = null;
// Range beacons screen.
;(function(app)
{

	//alert("app");

	app.startRangingBeacons = function()
	{
		//alert("function");
        
		function onRange(beaconInfo)
		{

			displayBeconInfo(beaconInfo);

		}

		function onError(errorMessage)
		{
			console.log('Range error: ' + errorMessage);
		}

		function displayBeconInfo(beaconInfo)
		{
            
			// Clear beacon HTML items.
			$('#Result').empty();

			// Sort beacons by distance.
			beaconInfo.beacons.sort(function(beacon1, beacon2) {
				return beacon1.distance > beacon2.distance; });

			// Generate HTML for beacons.
			$.each(beaconInfo.beacons, function(key, beacon)
			{
                closestBeacon = beaconInfo.beacons[0].major;
                //console.log( " close ", closestBeacon);
				var element = $(createBeaconHTML(beacon));
				//$('#Result').append(element);
			});
		};

		function createBeaconHTML(beacon)
		{
			//var colorClasses= app.beaconColorStyle(beacon.color);
			// var htm = '<div class="displayBox">'
			// 	+ '<table><tr><td>Major</td><td>' + beacon.major
			// 	+ '</td></tr><tr><td>Minor</td><td>' + beacon.minor
			// 	+ '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi

            //---------------Device_Switch---------------------//

            //____MusicControlList_[0]butterfly___[1]watch___[2]box_____//

			if( beacon.major == 14401 && beacon.minor == 22496){
			        beacon.deviceName = "matchcase";
			        MusicControlList[0].DeviceIn = true;
			        MusicControlList[0].DistRead = beacon.distance*100;   
		    }
			else if( beacon.major == 4771 && beacon.minor == 56973){
			        beacon.deviceName = "butterfly";
			        MusicControlList[1].DeviceIn = true;
			        MusicControlList[1].DistRead = beacon.distance*100;
		    }
            else if( beacon.major == 2451 && beacon.minor == 12244){
			        beacon.deviceName = "watch";
			        MusicControlList[2].DeviceIn = true;
			        MusicControlList[2].DistRead = beacon.distance*100;
		    }
		    else if( beacon.major == 58227 && beacon.minor == 23806){
			        beacon.deviceName = "drawing";
			        MusicControlList[3].DeviceIn = true;
			        MusicControlList[3].DistRead = beacon.distance*100;   
		    }
		    else if( beacon.major == 31190 && beacon.minor == 37809){
			        beacon.deviceName = "hopeless";
			        MusicControlList[4].DeviceIn = true;
			        MusicControlList[4].DistRead = beacon.distance*100;   
		    }
		    else if( beacon.major == 37352 && beacon.minor == 57235){
			        beacon.deviceName = "box";
			        MusicControlList[5].DeviceIn = true;
			        MusicControlList[5].DistRead = beacon.distance*100;
		    }
		    //---------------put_ major & minor _by_mannul-------------//
		    // else if( beacon.major == "???" && beacon.minor == "???"){
			   //      beacon.deviceName = "???";
			   //      MusicControlList[?].DeviceIn = true;
			   //      MusicControlList[?].DistRead = beacon.distance*100;   
		    // }

            //------------------------------------------------//

            if (beacon.deviceName)
			{
				// htm += '</td></tr><tr><td>DeviceName</td><td>'
				// 	+ beacon.deviceName;
				// if( beacon.major == 4771 && beacon.minor == 56973){
			 //        beacon.deviceName = "butterfly";
			 //        htm += '</td></tr><tr><td>Vol</td><td>'
				// 	+ MusicControlList[0].currentVolume.toFixed(4);
		  //           }
		  //       else if( beacon.major == 2451 && beacon.minor == 12244){
			 //        beacon.deviceName = "watch";
			 //        htm += '</td></tr><tr><td>Vol</td><td>'
				// 	+ MusicControlList[1].currentVolume.toFixed(4);
		  //           }
		  //       else if( beacon.major == 37352 && beacon.minor == 57235){
			 //        beacon.deviceName = "box";
			 //        htm += '</td></tr><tr><td>Vol</td><td>'
				// 	+ MusicControlList[2].currentVolume.toFixed(4);
		  //           }

			}

			if (beacon.proximity)
			{
				// htm += '</td></tr><tr><td>Proximity</td><td>'
				// 	+ app.formatProximity(beacon.proximity);
					//console.log(app.formatProximity(beacon.proximity));
					//console.log(DistStatus);
			}
			if (beacon.distance)
			{
				// htm += '</td></tr><tr><td>Distance</td><td>'
				// 	+ app.formatDistance(beacon.distance);
			}
			//htm += '</td></tr></table></div>';
			//return htm;
		};

		// Show screen.
		app.showScreen('id-screen-range-beacons');
		$('#id-screen-range-beacons .style-item-list').empty();

		// Request authorisation.
		estimote.beacons.requestAlwaysAuthorization();

		// Start ranging.
		estimote.beacons.startRangingBeaconsInRegion(
			{}, // Empty region matches all beacons.
			onRange,
			onError);
	};

	app.stopRangingBeacons = function()
	{
		estimote.beacons.stopRangingBeaconsInRegion({});
		app.showHomeScreen();
	};

})(app);
