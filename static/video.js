function getMediaElement(e, t) {
    t = t || {};
    if (!e.nodeName || e.nodeName.toLowerCase() != "audio" && e.nodeName.toLowerCase() != "video") {
        if (!e.getVideoTracks().length) {
            return getAudioElement(e, t)
        }
        var n = e; e = document.createElement(n.getVideoTracks().length ? "video" : "audio");
        e[!!navigator.mozGetUserMedia ? "mozSrcObject" : "src"] = !!navigator.mozGetUserMedia ? n : window.webkitURL.createObjectURL(n)
    } if (e.nodeName && e.nodeName.toLowerCase() == "audio") {
        return getAudioElement(e, t)
    } e.controls = false;
  
    t.toggle = t.toggle || [];
    t.toggle.has = function (e) {
        return t.toggle.indexOf(e) !== -1
    };
    var i = document.createElement("div");
    i.className = "media-container";

    var b = document.createElement("div");
    b.className = "media-box";
    i.appendChild(b);
    b.appendChild(e);
    //크기조절
    if (!t.width)
        t.width = "50%";

    if (t.height) {
        b.style.height = t.height + "px"
    }
    //b.querySelector("video").style.Height = "100%";

    i.toggle = function (e) {
        if (typeof e != "string") {
            for (var t = 0;
                t < e.length;
                t++) {
                i.toggle(e[t])
            } return
        }      
        return this
    };
    i.media = e;
    return i
}

document.write('<link rel="stylesheet" href="https://cdn.WebRTC-Experiment.com/getMediaElement.css">')