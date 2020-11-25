function getMediaElement(e, t) {
    function E() {
        if (w < 10) {
            w++; setTimeout(E, 1e3)
        } else w = 0
    }
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
    
    var i = document.createElement("div");
    i.className = "media-container";
    var b = document.createElement("div");
    b.className = "media-box";
    i.appendChild(b);
    b.appendChild(e);
    //크기조절
    if (!t.width)
        t.width = innerWidth / 2 - 50;
    //i.style.width = t.width + "px";
    i.style.width = '59%';
    i.style.display = "contents";
    b.querySelector("video").style.width = '59%';
    b.querySelector("video").id = 'cam';
    var w = 0;
    if (t.showOnMouseEnter || typeof t.showOnMouseEnter === "undefined") {
        i.onmouseenter = i.onmousedown = function () {
            E();
            l.style.opacity = 1
        };
        i.onmouseleave = function () {
            l.style.opacity = 0
        }
    }
    else {
        setTimeout(function () {
            E();
            setTimeout(function () {
                l.style.opacity = 1
            }, 300)
        }, 700)
    }
    E();
    i.toggle = function (e) {
        if (typeof e != "string") {
            for (var t = 0;
                t < e.length;
                t++) {
                i.toggle(e[t])
            } return
        }
    };
    i.media = e;
    return i
}
function getAudioElement(e, t) {
    function p() {
        i.style.marginLeft = r.clientWidth - i.clientWidth - 7 + "px";
        i.style.marginTop = r.clientHeight - i.clientHeight - 6 + "px";
        if (h < 10) {
            h++; setTimeout(p, 1e3)
        }
        else
            h = 0
    }
    t = t || {};
    if (!e.nodeName || e.nodeName.toLowerCase() != "audio" && e.nodeName.toLowerCase() != "video") {
        var n = e;
        e = document.createElement("audio");
        e[!!navigator.mozGetUserMedia ? "mozSrcObject" : "src"] = !!navigator.mozGetUserMedia ? n : window.webkitURL.createObjectURL(n)
    }
    t.toggle = t.toggle || [];
    t.toggle.has = function (e) {
        return t.toggle.indexOf(e) !== -1
    };
    e.controls = false;
    e.play();
    var r = document.createElement("div");
    r.className = "media-container";
    
   
    if (!t.buttons || t.buttons && t.buttons.indexOf("record-audio") != -1) {
        var o = document.createElement("div");
        o.className = "control " + (t.toggle.has("record-audio") ? "stop-recording-audio selected" : "record-audio");
        i.appendChild(o);
        o.onclick = function () {
            if (o.className.indexOf("stop-recording-audio") != -1) {
                o.className = o.className.replace("stop-recording-audio selected", "record-audio");
                if (t.onRecordingStopped)
                    t.onRecordingStopped("audio")
            }
            else {
                o.className = o.className.replace("record-audio", "stop-recording-audio selected");
                if (t.onRecordingStarted)
                    t.onRecordingStarted("audio")
            }
        }
    }
    
    var l = document.createElement("div");
    l.className = "media-box";
    r.appendChild(l);
    var c = document.createElement("h2");
    c.innerHTML = t.title || "Audio Element";
    c.setAttribute("style", "position: absolute;color: rgb(160, 160, 160);font-size: 20px;text-shadow: 1px 1px rgb(255, 255, 255);padding:0;margin:0;");
    l.appendChild(c);
    l.appendChild(e);
    r.style.width = "329px";
    l.style.height = "90px";
    c.style.width = r.style.width;
    c.style.height = "50px";
    c.style.overflow = "hidden"; var h = 0;
    if (t.showOnMouseEnter || typeof t.showOnMouseEnter === "undefined") {
        r.onmouseenter = r.onmousedown = function () {
            p();
            i.style.opacity = 1
        };
        r.onmouseleave = function () {
            i.style.opacity = 0
        }
    }
    else {
        setTimeout(function () {
            p();
            setTimeout(function () {
                i.style.opacity = 1
            }, 300)
        }, 700)
    }
    p();
    r.toggle = function (e) {
        if (typeof e != "string") {
            for (var t = 0; t < e.length; t++) {
                r.toggle(e[t])
            } return
        }
        return this
    };
    r.media = e;
    return r
}
document.write('<link rel="stylesheet" href="https://cdn.WebRTC-Experiment.com/getMediaElement.css">')