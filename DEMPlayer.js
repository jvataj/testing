function initializePlayer()
{
	$('#local').hide();
    if($('#OBKey_Download_Flag_1').val().toUpperCase() == "LOCAL")
	{
		$('#player').hide();
		$('#local').show();
	}
	else if(!$('#OBKey_Asset_ID_1').val())
	{
		$('#edit').removeClass('hide');
	}
	else
	{
		$('#edit').addClass('hide');
		var WebserviceEndpointURL = "https://redacted/DEMMiddleware/api/dem/" + $('#OBKey_Asset_ID_1').val() + "/stream"
		
		$.ajax({
			//crossDomain: true,
			type: "GET",
			dataType: "json",
			url: WebserviceEndpointURL,
			xhrFields: {
				withCredentials: true
			},
			headers: {
				"accept": "application/json",
				"Access-Control-Allow-Origin":"*"
			},
			cache: false,
			success: function(data)
			{
				console.log(data.url);
				console.log(data.token);
				var myOptions = {
					autoplay: false,
					controls: true,
					fluid: true,
					poster: "",
					playbackSpeed: {
						enabled: true,
						initialSpeed: 1.0,
						speedLevels: [
							{ name: "x4.0", value: 4.0 },
							{ name: "x2.0", value: 2.0 },
							{ name: "x1.5", value: 1.5 },
							{ name: "x1.25", value: 1.25 },
							{ name: "normal", value: 1.0 },
							{ name: "x0.75", value: 0.75 },
							{ name: "x0.5", value: 0.5 },
						]
					}
				};
				
				var myPlayer = amp("azuremediaplayer", myOptions);
				myPlayer.src([{ 
					src: data.url,
					type: "application/vnd.ms-sstr+xml",
					protectionInfo: [{
						type: "AES",
						authenticationToken: data.token
					}]
				}, ]);
				
				$('#video').removeClass('hide');
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(errorThrown);
				$('#edit').addClass('hide');
				$('#noAccess').removeClass('hide');
			}
		});
	}
}

function copyPath() {
	window.open("file:///" + "//isiserver1//public");
}