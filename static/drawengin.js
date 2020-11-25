var canvas, ctx, tool, pen = "pen",
  fabriccanvas;
var socket = io();
var isRedoing = false;
var h = [];
var textdata = '';
var textdata2='나는 중국의 찬란한 문명을 좋아한다. 인류 최고라고 생각한다. 중국의 한자를 좋아한다. 그 표현의 힘, 인간 생각의 저장고와 같은 역사, 예술로 승화된 조형미를 좋아한다. 치바이스의 그림을 넋 잃고 보았고 당나라 도시를 그린 거대한 세밀화 앞을 떠나지 못했다. 21세기적 감각을 보여주는 700년 전 중국 도자기를 보고 눈을 의심했다. 병마용 안에서 기가 질리기도 했다. 대하와 같은 중국 역사를 읽으며 자랐고 몇 번씩 읽은 책은 삼국지와 수호지뿐이다. 그러나 중국 공산당은 좋아할 수가 없다. 중국 대륙을 빈곤에서 벗어나게 했다고 하지만 그 해악이 심각하다. 공산주의가 아니라 새로운 형태의 나치즘이라고 생각한다. 서로 모순되는 국가주의와 사회주의를 동시에 외치고 중화 민족 부흥과 중국몽을 내세우는 것이 히틀러의 국가사회주의(나치), 위대한 독일 민족의 제3제국 운운처럼 들린다. 마오쩌둥이 만든 지옥, 대약진운동과 문화혁명은 생각만으로도 끔찍하고 그가 김일성과 남침을 모의하고 군대까지 보내 우리 부모 형제를 죽이고 대한민국 통일을 가로막은 것을 잊지 못한다. 어떤 분이 "중국은 9000만 공산당원이 13억 인민을 뜯어먹고 사는 사회"라고 했다. 이 말이 과장이 아니다. 공산당이 평등을 지향한다는 것은 선전일 뿐이다. 국제탐사보도협회가 조세 회피처 버진 아일랜드에 유령 회사를 세워 1000조~4000조원을 빼돌린 중국 공산당 간부들을 폭로했다. 시진핑 주석의 매형, 후진타오 사촌, 덩샤오핑 사위, 리펑과 원자바오 딸과 아들이 그 명단에 들어있었다. 중국 공산당 간부들의 비리는 상상을 넘는다. 공산당에서 황제 대접을 받는 상무위원(저우융캉)의 축재 규모는 15조원이었다. 통일전선부장은 14조원, 군 간부는 3조원이었고 공산당 중앙군사위 부주석 집에서 나온 돈은 세기가 힘들어 무게를 달았더니 1t이었다. 이 공산당이 겉으로는 검소하고 인민을 위하는 척한다. 원자바오 총리는 늘 낡은 구두에 점퍼 차림이었는데 알고 보니 가족 재산이 수천억원이었다. 그 부인이 한 전시회에 걸치고 나온 보석 총액이 3억원이었다고 한다. 외국인 사업가를 영화처럼 암살한 공산당 실력자의 아내는 남편이 정치 파동에 휘말리지 않았으면 늘 그랬듯 아무 일도 없었을 것이다. 민주와 법치, 인권이 없는 세계 초강대국은 폭력배와 얼마나 다른가. 천안문 광장에서 죽은 수천 명 희생자를 추모하는 홍콩 시민들은 "어제의 천안문이 지금의 홍콩이고, 지금의 홍콩은 내일의 세계"라고 절규한다. 공산당 간부들 비판하는 책을 팔았다고 홍콩 서점 주인들이 연이어 중국으로 납치됐다. 중국 환경운동가는 친구를 바래다주러 공항에 나갔다가 공안(경찰)에 연행됐는데 한참 뒤 시신으로 발견됐다. 중국 공산당의 패권이 커지는 그만큼 세계는 이 폭력 앞에 노출된다. 이 중국 공산당이 아시아 전체에 대한 패권을 추구하고 있다. 원로 정치학자인 이상우 전 한림대총장은 중국 공산당의 한반도 전략에 대해 "북한을 중국의 1개 성(省)으로 만들고, 한국을 한·미 동맹에서 떼어내 핀란드화하는 것"이라고 했다. "핀란드화" 는 인접한 강대국 눈치를 보며 주권이 불구가 된 나라를 말한다. 시진핑의 과도한 사드 보복, 문재인 대통령에 대한 고의적인 홀대, 한국 대통령 특사를 일부러 홍콩 행정장관 자리에 앉히는 것 등은 모두 한국의 핀란드화에 초점이 맞춰져 있다. 문 대통령은 중국에 3불(不) 약속으로 이미 주권을 양도하기 시작했다. 시진핑은 미국 대통령에게 "한국은 중국의 일부였다"고 했다. 중국 공산당은 그 과거로 돌아가려 한다. 중국 공산당은 우한에서 역병이 발생했다고 알린 의사를 유언비어 유포 혐의로 체포했다. 전형적인 공산당 방식이다. 그때 제대로 했으면 지금 중국인들이 이 엄청난 비극을 당하지 않고 역병이 전 세계를 위협하지도 않을 것이다. 역병이 창궐하자 책임자인 시진핑은 숨어버렸다. 공산당은 어떤 일을 저질러도 어떤 책임도 지지 않는다. 영구 집권이다. 심지어 이제 당이 아니라 시진핑이라는 한 개인도 영구 집권하겠다고 한다. 중국 인민은 공산당 아닌 다른 정부, 잘못에 책임지는 정부를 꿈 꿀 수도 없다. 앞으로 역병이 고비를 넘기면 공산당은 공포 분위기로 인민의 분노와 자유 요구를 짓누를 것이다. 중국 공산당을 좋아하고, 마오쩌둥을 존경하고, "큰 산봉우리 중국 앞의 작은 나라 한국" 이라고 스스로 비하했던 한국 운동권과 문 대통령은 이제 "한·중은 운명 공동체"라고 한다. 소름이 돋았다. 중국 역병이 창궐해 세계 각 나라가 중국과의 항공편을 차단하고 있을 때 마지못해 후베이성 한 곳만 막은 것이 "문재인식 운명 공동체" 인가. 중국 대사도 "한·중은 운명 공동체"라고 호응했다. 일부에선 중국과의 무역이 너무 커서 어쩔 수 없다고 한다. 무역액이 크다는 사실을 약점으로 잡고 협박 카드로 휘두르는 운명 공동체도 있나. 우리는 인권, 언론 자유, 투표권도 없고, 이웃 나라를 폭력적으로 대하는 집단과 운명 공동체가 돼야 하나. 국민은 그럴 생각이 없으니 문 대통령과 민주당은 중국 공산당과 운명 공동체가 돼라.';
//초기화
window.onload = function () {
  canvas = new fabric.Canvas("canvas");

  var url = location.href.split("#")[1];
  socket.emit('newUser', url);

  //======================undo ,redo=======================================
  document.addEventListener('keyup', ({
    keyCode,
    ctrlKey
  } = event) => {
    // Check Ctrl key is pressed.
    if (!ctrlKey) {
      return
    }

    // Check pressed button is Z - Ctrl+Z.
    if (keyCode === 90) {
      undo()
      socket.emit('undo');
    }

    // Check pressed button is Y - Ctrl+Y.
    if (keyCode === 89) {
      redo()
      socket.emit('redo');
    }
  })

  //====================cavnas 그리기===================================
  canvas.on('object:added', function () {
    if (!isRedoing) {
      h = [];
    }
    isRedoing = false;
  });

  canvas.on('mouse:up', function () {
    if (tool == "eraser") {
      var selected_object = canvas.getActiveObjects();

      for (var i = 0; i < selected_object.length; i++) {
        canvas.remove(selected_object[i]);
      }

    }
    socket.emit('senddata', JSON.stringify(canvas));
  });

  canvas.on('mouse:dblclick', function (options) {
    if (tool == "text") {
      var textbox = new fabric.Textbox('Text Box', {
        width: 250,
        cursorColor: "blue",
        top: options.pointer.y,
        left: options.pointer.x
      });
      canvas.add(textbox)
    }

    socket.emit('senddata', JSON.stringify(canvas));
  });

  $("#image-button").on('click', function () {
    $("#image-to-upload").trigger('click');
  });

  $("#upload-button").on('click', function () {
    $("#file-to-upload").trigger('click');
    console.log("업로드");
  });
  //=============================pdf 렌더링====================

  var __PDF_DOC,
    __CURRENT_PAGE,
    __TOTAL_PAGES,
    __PAGE_RENDERING_IN_PROGRESS = 0;
  //__CANVAS = $('#pdf-canvas').get(),

  function showPDF(pdf_url) {
    PDFJS.getDocument({
      url: pdf_url
    }).then(function (pdf_doc) {
      console.log(pdf_doc);

      __PDF_DOC = pdf_doc;
      __TOTAL_PAGES = __PDF_DOC.numPages;

      // Hide the pdf loader and show pdf container in HTML
      $("#pdf-contents").show();
      $("#pdf-total-pages").text(__TOTAL_PAGES);

      // Show the first page
      showPage(1);
    }).catch(function (error) {
      // If error re-show the upload button
      $("#pdf-loader").hide();
      $("#upload-button").show();

      alert(error.message);
    });;
  }

  function showPage(page_no) {
    var __CANVAS = document.getElementById('pdf-canvas');
    var __CANVAS_CTX = __CANVAS.getContext('2d');

    __PAGE_RENDERING_IN_PROGRESS = 1;
    __CURRENT_PAGE = page_no;

    // Disable Prev & Next buttons while page is being loaded
    $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

    // While page is being rendered hide the canvas and show a loading message
    $("#pdf-canvas").hide();

    // Update current page in HTML
    $("#pdf-current-page").text(page_no);

    // Fetch the page
    __PDF_DOC.getPage(page_no).then(function (page) {
      // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
      var scale_required = __CANVAS.width / page.getViewport(1).width;

      // Get viewport of the page at required scale
      var viewport = page.getViewport(scale_required);

      // Set canvas height
      __CANVAS.height = viewport.height;

      var renderContext = {
        canvasContext: __CANVAS_CTX,
        viewport: viewport
      };

      // Render the page contents in the canvas
      page.render(renderContext).then(function () {
        __PAGE_RENDERING_IN_PROGRESS = 0;

        // Re-enable Prev & Next buttons
        $("#pdf-next, #pdf-prev").removeAttr('disabled');

        // Show the canvas and hide the page loader
        $("#pdf-canvas").show();
      });
    });
  }




  $("#file-to-upload").on('change', function () {
    if (['application/pdf'].indexOf($("#file-to-upload").get(0).files[0].type) != -1) {
      $("#pdf-meta").show();
      socket.emit("sendpdf", URL.createObjectURL($("#file-to-upload").get(0).files[0]));
      showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
      return;
    }

    $("#pdf-meta").show();
    socket.emit("converter", $("#file-to-upload").get(0).files[0])
  });

  $("#pdf-prev").on('click', function () {
    if (__CURRENT_PAGE != 1) {
      socket.emit("prev");
    }
  });

  $("#pdf-next").on('click', function () {
    if (__CURRENT_PAGE != __TOTAL_PAGES) {
      socket.emit("next");
    }
  });


  $("#image-to-upload").on('change', function () {

    var imgElement = URL.createObjectURL($("#image-to-upload").get(0).files[0]);
    fabric.Image.fromURL(imgElement, function (oImg) {
      oImg.top = 300;
      oImg.left = 300;
      oImg.scale(0.3);
      canvas.add(oImg);
    });

    socket.emit('senddata', JSON.stringify(canvas));
  });

  //======================소켓통신============================


  socket.on('converter', function (file) {
    console.log("converter");
    console.log(new Blob([file]));
    showPDF(URL.createObjectURL(new Blob([file])));
  })

  socket.on("prev", function () {
    showPage(--__CURRENT_PAGE);
  })

  socket.on("next", function () {
    showPage(++__CURRENT_PAGE);
  })

  socket.on("pdfrender", function (file) {
    showPDF(file);
  })

  
  socket.on("senddata", function (data) {
    canvas.loadFromJSON(data);
  })

  socket.on('undo', function () {
    undo()
  })

  socket.on('redo', function () {
    redo()
  })

  socket.on('end', function () {
    location.href = "/main"
  })

  //회의 종료버튼
  document.getElementById('end_room').onclick = function () {
    console.log("회의종료");
    //소켓통신코드임 ㅎㅎ
    socket.emit("end", textdata,textdata2,url);
  }




  socket.on('sttmsg', function (data) {
    console.log('sttmsg');
    var chat = document.getElementById('chat')

    //textdata = textdata + " " + data.name + " : " + data.message;
    textdata = textdata + " " + data.message;
    textdata2 = textdata2+" "+data.message;

    var message = document.createElement('div')
    if (`${data.name}` != '') {
      var node = document.createTextNode(`${data.name}: ${data.message}`)
    } else {
      var node = document.createTextNode(`${data.message}`)
    }

    if (`${data.message}` == '') {
      var node = null;
    }

    message.className='other';
    message.appendChild(node)
    chat.appendChild(message)
    chat.scrollTop = chat.scrollHeight;
  })
}

////////////////////////////////////////////////////////////////////////

function undo() {
  if (canvas._objects.length > 0) {
    h.push(canvas._objects.pop());
    canvas.renderAll();
  }
}

function redo() {

  if (h.length > 0) {
    isRedoing = true;
    canvas.add(h.pop());
  }
}



//====================메뉴 이벤트===============================

$(document).on("click", "#div_menu > li", function () {
  tool = $(".selected").attr("value");
  if (tool == "painter") {
    canvas.isDrawingMode = true;
  } else {
    canvas.isDrawingMode = false;
  }
})

$(document).on("click", ".toppen li", function () {
  pen = $(".selectedpen").attr("value");
  switch (pen) {
    case "pen":
      $("#whatpen").attr("src", "style/pencil.png");
      canvas.freeDrawingBrush.width = 1;
      break;
    case "brush":
      $("#whatpen").attr("src", "style/paintbrush.png");
      canvas.freeDrawingBrush.width = 15;
      break;
  }
})

function change_color(color) {
  canvas.freeDrawingBrush.color = color;
}