var config = {
    // via: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/socketio-over-nodejs
    openSocket: function (config) {
        var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';

        config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
        var sender = Math.round(Math.random() * 999999999) + 999999999;

        io.connect(SIGNALING_SERVER).emit('new-channel', {
            channel: config.channel,
            sender: sender
        });

        var socket = io.connect(SIGNALING_SERVER + config.channel);
        socket.channel = config.channel;
        socket.on('connect', function () {
            if (config.callback) config.callback(socket);
        });

        socket.send = function (message) {
            socket.emit('message', {
                sender: sender,
                data: message
            });
        };
        socket.on('message', config.onmessage);
    },
    onRemoteStream: function (media) {
        var mediaElement = getMediaElement(media.video, {

        });
        //mediaElement.id = media.stream.streamid;
        mediaElement.className = "subvideo";
        mediaElement.id = "shareID";
        videosContainer.appendChild(mediaElement);

        //document.getElementById('share-screen').style.display = 'none';
        document.getElementById('setup-new-room').style.display = 'none';
    },
    onRemoteStreamEnded: function (stream, video) {

        if (video.parentNode && video.parentNode.parentNode && video.parentNode.parentNode.parentNode) {
            video.parentNode.parentNode.parentNode.removeChild(video.parentNode.parentNode);
        }
    },
    onRoomFound: function (room) {
        var alreadyExist = document.querySelector('button[data-broadcaster="' + room.broadcaster +
            '"]');
        if (alreadyExist) return;

        if (typeof roomsList === 'undefined') roomsList = document.body;
        console.log(room);
        captureUserMedia(function () {
            conferenceUI.joinRoom({
                roomToken: room.roomToken,
                joinUser: room.broadcaster
            });
        }, function () {
            joinRoomButton.disabled = false;
            $('#picture').show();
            startConverting();
        });
    },
    onRoomClosed: function (room) {
        var joinButton = document.querySelector('button[data-roomToken="' + room.roomToken + '"]');
        if (joinButton) {
            joinButton.parentNode.parentNode.parentNode.parentNode.removeChild(joinButton.parentNode
                .parentNode.parentNode);
        }
    },
    onReady: function () {
        console.log('회의실 입장 준비 완료');
    }

};

function showErrorMessage(error, color) {
    var errorMessage = document.querySelector('#logs-message');
    errorMessage.style.color = color || 'red';
    errorMessage.innerHTML = error;
    errorMessage.style.display = 'block';
}

function getDisplayMediaError(error) {
    if (location.protocol === 'http:') {
        showErrorMessage('Please test this WebRTC experiment on HTTPS.');
    } else {
        showErrorMessage(error.toString());
    }
}

function captureUserMedia2(callback) {
    var video = document.getElementsByClassName('selected_video').item(0).firstChild.firstChild;
    console.log(video);
    video.muted = true;
    video.volume = 0;
    video.id = 'share';
    video.className = 'sahreview';


    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
    }

    if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
        function onGettingSteam(stream) {
            video.srcObject = stream;
            //videosContainer.insertBefore(video, videosContainer.firstChild);

            config.attachStream = stream;
            callback && callback();

            addStreamStopListener(stream, function () {
                location.reload();
            });

            showPrivateLink();

            document.querySelector('.hide-after-join').style.display = 'none';
        }

        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({
                video: true
            }).then(stream => {
                onGettingSteam(stream);
            }, getDisplayMediaError).catch(getDisplayMediaError);
        } else if (navigator.getDisplayMedia) {
            navigator.getDisplayMedia({
                video: true
            }).then(stream => {
                onGettingSteam(stream);
            }, getDisplayMediaError).catch(getDisplayMediaError);
        }

        console.log("화면 공유 실행");
    } else {
        if (DetectRTC.browser.name === 'Chrome') {
            if (DetectRTC.browser.version == 71) {
                showErrorMessage('Please enable "Experimental WebPlatform" flag via chrome://flags.');
            } else if (DetectRTC.browser.version < 71) {
                showErrorMessage('Please upgrade your Chrome browser.');
            } else {
                showErrorMessage('Please make sure that you are not using Chrome on iOS.');
            }
            console.log("Chrome 화면 공유");
        }

        if (DetectRTC.browser.name === 'Firefox') {
            showErrorMessage('Please upgrade your Firefox browser.');
            console.log("Firefox 화면 공유");
        }

        if (DetectRTC.browser.name === 'Edge') {
            showErrorMessage('Please upgrade your Edge browser.');
            console.log("Edge 화면 공유");
        }

        if (DetectRTC.browser.name === 'Safari') {
            showErrorMessage('Safari does NOT supports getDisplayMedia API yet.');
            console.log("Safari 화면 공유");
        }
    }
}

//회의 시작 버튼 핸들러
function setupNewRoomButtonClickHandler() {

    //btnSetupNewRoom 회의시작 버튼의 객체
    btnSetupNewRoom.disabled = true;
    document.getElementById('conference-name').disabled = true;
    captureUserMedia(function () {
        conferenceUI.createRoom({
            roomName: (document.getElementById('conference-name') || {}).value || 'Anonymous'
        });
    }, function () {
        btnSetupNewRoom.disabled = document.getElementById('conference-name').disabled = false;
    });
    navigator.getUserMedia({
        audio: true,
        video: true
    }, gotStream, onfail);

    $('#setup-new-room').hide();
    $('#picture').show();
    $('#end_room').show();
    startConverting();
    //$('#share-screen').hide();
}

function setupreturnmenc() {
    $('#div_root').hide();
    $('#videos-container').show();
    navigator.getUserMedia({
        audio: true,
        video: true
    }, gotStream, onfail);
    $('#picture').show();
    $('#share-screen').hide();
    $('#returnmen').hide();
}

function setupbtnpicture() {

    $('#div_root').show();
    $('#returnmen').show();

    $('#videos-container').hide();
    navigator.getUserMedia({
        audio: true,

    }, gotStream, onfail);

    $('#setup-new-room').hide();
    $('#share-screen').hide();
    $('#picture').hide();
}


//여기서 비디오 태그가 만들어지는데 그 상위태그는 어디있누;;
function captureUserMedia(callback, failure_callback) {
    var video = document.createElement('video');
    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
        video.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.setAttribute('controls', true);
    }
    getUserMedia({
        video: video,
        onsuccess: function (stream) {
            config.attachStream = stream;
            var mediaElement = getMediaElement(video, {

            });
            mediaElement.className = "selected_video"
            videosContainer.appendChild(mediaElement);
            $('#picture').show();
            callback && callback();
        },
        onerror: function () {
            alert('unable to get access to your webcam');
            callback && callback();
        }
    });
}

var conferenceUI = conference(config);

/* 로컬 영상을 띄우는 요소 생성을 관련하는 곳인데...?*/
var videosContainer = document.getElementById('videos-container') || document.body;
var btnSetupNewRoom = document.getElementById('setup-new-room');
var roomsList = document.getElementById('rooms-list');
var btnss = document.getElementById('div_root');
var btnpicture = document.getElementById('picture');
var returnmenc = document.getElementById('returnmen');

if (btnSetupNewRoom) btnSetupNewRoom.onclick = setupNewRoomButtonClickHandler;
if (btnpicture) btnpicture.onclick = setupbtnpicture;
if (returnmenc) returnmenc.onclick = setupreturnmenc;

var videosContainer2 = document.getElementById('videos-container2') || document.body;
document.getElementById('share-screen').onclick = function () {
    captureUserMedia2(function () {});
    this.disabled = true;
    this.style.display = 'none';
    $('#setup-new-room').hide();
};

document.getElementById('pdf-clear').onclick = function () {
    $("#pdf-meta").hide();

    var cnvs = document.getElementById('pdf-canvas');
    // context
    var ctx = cnvs.getContext('2d');

    // 픽셀 정리
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    // 컨텍스트 리셋
    ctx.beginPath();
    $("#pdf-contents").hide();
}

function rotateVideo(video) {
    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
    setTimeout(function () {
        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
    }, 1000);
    console.log('rotateVideo');
}

function startConverting() {
    //check this browser is chrome or not. because this application supported only in chrome browser
    if ('webkitSpeechRecognition' in window) {
        var speechRecognizer = new webkitSpeechRecognition();
        //continuous : you will catch mic only one time or not
        speechRecognizer.continuous = false;
        //interimResults : during capturing the mic you will send results or not
        speechRecognizer.interimResults = false;
        //lang : language (ko-KR : Korean, en-IN : englist)
        speechRecognizer.lang = "ko-KR";
        speechRecognizer.start();
        var finalTranscripts = '';

        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");

                //isFinal : if speech recognition is finished, isFinal = true
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;
                    if (finalTranscripts == 'empty string') {
                        startConverting();
                    } else {
                        //console.log(finalTranscripts);
                        socket.emit('talk', finalTranscripts);
                        startConverting();
                    }
                } else {
                    interimTranscripts += transcript;
                }
            }
        };
    }
}



