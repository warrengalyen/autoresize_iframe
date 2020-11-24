<script>
// Copyright (c) 2020 Warren Galyen

// This code monitors the page for changes in size. When a change is detected
// it sends the latest size to the parent page using postMessage.
// This script should be inserted into the page that will appear inside an iFrame.

// determine height of content on this page
function getHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

// send the latest page dimensions to the parent page on which this iframe is embedded
function sendDimensionsToParent() {
	var iframeDimensionsNew = {
		'width': window.innerWidth, // supported from IE9 onwards
		'height': getHeight()
	};
	
	if ((iframeDimensionsNew.width != iframeDimensionsOld.width) || (iframeDimensionsNew.height != iframeDimensionsOld.height)) {
		window.parent.postMessage(iframeDimensionsNew, "*");
		iframeDimensionsOld = iframeDimensionsNew;
	}
}

// on load - send the page dimensions.
window.addEventListener('load', function() {
	
	iframeDimensionsOld = {
		'width': window.innerWidth, // supported from IE9 onwards
		'height': getHeight()
	};
	
	window.parent.postMessage(iframeDimensionsOld, "*"); // send our dimensions once, initially - so the iFrame is initialized to the correct size
	
	if (window.MutationObserver) { // if mutationobserver is supported by this browser
		// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
		
		var observer = new MutationObserver(sendDimensionsToParent);
		config = {
			attributes: true,
			attributeOldValue: false,
			characterData: true,
			characterDataOldValue: false,
			childList: true,
			subtree: true
		};
		
		observer.observe(document.body, config);
	} else { // if mutationobserver is NOT supported
		// check for changes on a timed interval, every 1/3 of a second
		window.setInterval(sendDimensionsToParent, 300);
	}
});
</script>