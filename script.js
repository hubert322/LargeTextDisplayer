const fontMap = {
    "roboto": "'Roboto', sans-serif",
    "arial": "Arial,Helvetica,sans-serif",
    "comicSans": "'Comic Sans MS',sans-serif",
    "courierNew": "'Courier New',Courier,monospace",
    "dmSerifDisplay": "'DM Serif Display',serif",
    "garamond": "Garamond,serif",
    "helvetica": "Helvetica,Arial,sans-serif",
    "impact": "Impact,Charcoal,sans-serif",
    "lato": "'Lato',sans-serif",
    "montserrat": "'Montserrat',sans-serif",
    "overpass": "'Overpass',sans-serif",
    "pacifico": "'Pacifico',cursive",
    "timesNewRoman": "'Times New Roman', Times, serif"
};

function addCookie() {
    var url = "display.html?text=" + encodeURIComponent(document.getElementById("text").value) + "&foreground=" + encodeURIComponent(document.getElementById("foreground").value) + "&background=" + encodeURIComponent(document.getElementById("background").value) + "&speed=" + encodeURIComponent(document.getElementById("speedSlider").value) + "&size=" + encodeURIComponent(document.getElementById("sizeSlider").value) + "&font=" + encodeURIComponent(document.getElementById("font").value);
    window.open(url);
}

function loadLocalStorage() {
    var LargeTextText = getURLParameter("text");
    var LargeTextForeground = getURLParameter("foreground");
    var LargeTextBackground = getURLParameter("background");
    var LargeTextSpeed = getURLParameter("speed");
    var LargeTextSize = getURLParameter("size");
    var LargeTextFontValue = getURLParameter("font");

    if (LargeTextFontValue in fontMap) {
        document.getElementById("marquee").style.fontFamily = fontMap[LargeTextFontValue];
    }
    else {
        document.getElementById("marquee").style.fontFamily = fontMap["roboto"];
    }

    document.getElementById("marquee").innerHTML = LargeTextText.replace("\n", "<br />");
    document.getElementById("background").style.color = "#" + LargeTextForeground;
    document.getElementById("background").style.backgroundColor = "#" + LargeTextBackground;
    document.getElementById("marquee").style.fontSize = LargeTextSize + "px";

    var style = document.createElement("style");
    style.innerHTML = `.marqueeAnimation { animation: scroll-left ${LargeTextSpeed}s linear infinite; }`;
    document.getElementsByTagName("head")[0].appendChild(style);
    document.getElementById("marquee").classList.add("marqueeAnimation");
}

function back() {
    window.close();
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/LargeTextDisplayer/sw.js', { scope: '/' })
      .then(function(registration) {
            console.log('Service Worker Registered');
      });
    navigator.serviceWorker.ready.then(function(registration) {
       console.log('Service Worker Ready');
    });
}