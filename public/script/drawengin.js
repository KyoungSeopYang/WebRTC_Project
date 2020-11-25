var canvas, ctx, tool, pen = "pen", fabriccanvas;
var socket = io();
var isRedoing = false;
var h = [];

socket.on('connect', function () {
    var url = location.href.split("#")[1];
    socket.emit('newUser', url);
})

socket.on('update', function (data) {
    draw();
})

//초기화
function draw() {
    canvas = new fabric.Canvas("canvas");

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


//=============================pdf 렌더링====================

var __PDF_DOC,
    __CURRENT_PAGE,
    __TOTAL_PAGES,
    __PAGE_RENDERING_IN_PROGRESS = 0,
    __CANVAS = $('#pdf-canvas').get(0),
    __CANVAS_CTX = __CANVAS.getContext('2d');

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

$("#upload-button").on('click', function () {
    $("#file-to-upload").trigger('click');
});


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
        showPage(--__CURRENT_PAGE);
        socket.emit("prev");
    }
});

$("#pdf-next").on('click', function () {
    if (__CURRENT_PAGE != __TOTAL_PAGES) {
        showPage(++__CURRENT_PAGE);
        socket.emit("next");
    }
});


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