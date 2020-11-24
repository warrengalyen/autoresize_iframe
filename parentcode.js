<script>
// Copyright (c) 2020 Warren Galyen

// This code resizes the iFrame's height in response to a postMessage from
// the child iFrame. It should be inserted into the parent page on which your
// iFrame is embedded.

// event.data - the object that the iframe sent userAgent
// event.origin - the URL from which the message came
// event.source - a reference to the 'window' object that sent the message
function receivedResizeMessage(event) {
	
	console.log("received resize message: " + JSON.stringify(event.data));
	
	var matches = document.querySelectorAll('iframe'); // iterate through all iFrames on page
	for (i = 0; i < matches.length; i++) {
			if (matches[i].contentWindow == event.source) { // found the iFrame that sent us a message
				console.log("found iframe that sent message: " + matches[i].src);
				
				//matches[i].width = Number(event.data.width);
				matches[i].height = Number(event.data.height);
				
				return 1;
			}
	}
}

document.addEventListener("DOMContentLoaded", function() {
	window.addEventListener("message", receivedResizeMessage, false);
});
</script>