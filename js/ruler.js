var isLeftRulerClicked = false;
var isRightRulerClicked = false;
var isTopRulerClicked = false;
var isBottomRulerClicked = false;

function showWidth() {
    notepad.rulerX.children("p").show();
    notepad.rulerX.children("p").text("Document Width: " + notepad.node.outerWidth() + "px");
};

function hideWidth() {
    notepad.rulerX.children("p").hide();
}

function showHeight() {
    notepad.rulerY.children("p").show();
    notepad.rulerY.children("p").text("Document Height: " + notepad.node.outerHeight() + "px");
};

function hideHeight() {
    notepad.rulerY.children("p").hide();
}

$(document).ready(function () {

    notepad.rulerX.hover(
        function () {
            showWidth();
        },
        function () {
            hideWidth();
        }
    );

    notepad.rulerY.hover(
        function () {
            showHeight();
        },
        function () {
            hideHeight();
        }
    );

    notepad.rulerX.children().mousedown(function (e) {
        if (e.target.parentElement.className == "left-margin") {
            isLeftRulerClicked = true;
            $(".vertical-line.left").css({ left: e.pageX + "px" });
            $(e.target).css({ left: e.pageX + "px" });
        }
        else if (e.target.parentElement.className == "right-margin") {
            isRightRulerClicked = true;
            $(".vertical-line.right").css({ left: e.pageX + "px" });
            $(e.target).css({ left: e.pageX + "px" });
        }

        showWidth();
        $(".vertical-line").show();
        $(document).mouseup(function (e) {
            isLeftRulerClicked = false;
            isRightRulerClicked = false;
            $(".vertical-line").hide();
            hideWidth();
        });
    });

    notepad.rulerY.children().mousedown(function (e) {
        if (e.target.parentElement.className == "top-margin") {
            isTopRulerClicked = true;
            $(".horizontal-line.top").css({ top: e.pageY - $(".ruler.vertical").offset().top + "px" });
            $(e.target).css({ top: e.pageY - $(".ruler.vertical").offset().top + "px" });
        }
        else if (e.target.parentElement.className == "bottom-margin") {
            isBottomRulerClicked = true;
            $(".horizontal-line.bottom").css({ top: e.pageY - $(".ruler.vertical").offset().top + "px" });
            $(e.target).css({ top: e.pageY - $(".ruler.vertical").offset().top + "px" });
        }

        showHeight();
        $(".horizontal-line").show();
        $(document).mouseup(function (e) {
            isTopRulerClicked = false;
            isBottomRulerClicked = false;
            $(".horizontal-line").hide();
            hideHeight();
        });
    });

    $(document.body).mousemove(function (e) {
        if (isLeftRulerClicked) {
            showWidth();
            notepad.setPositionLeft(e.pageX);
        }
        else if (isRightRulerClicked) {
            showWidth();
            notepad.setPositionRight(e.pageX);
        }
        else if (isTopRulerClicked) {
            showHeight();
            notepad.setPositionTop(e.pageY - $(".ruler.vertical").offset().top);
        }
        else if (isBottomRulerClicked) {
            showHeight();
            notepad.setPositionBottom(e.pageY - $(".ruler.vertical").offset().top);
        }
    })

    // Set width by prompt if double click
    $(".ruler.horizontal").dblclick(function () {
        var width = prompt("Document Width: ", notepad.node.outerWidth() + "px");

        if (!isNaN(parseInt(width))) {
            notepad.setWidth(width);
            notepad.rulerX.children("p").text("Document Width: " + notepad.node.outerWidth() + "px");
        }
    });

    // Set height by prompt if double click
    $(".ruler.vertical").dblclick(function () {
        var height = prompt("Document Height: ", notepad.node.outerHeight() + "px");

        if (!isNaN(parseInt(height))) {
            notepad.setHeight(height);
            notepad.rulerY.children("p").text("Document Height: " + notepad.node.outerHeight() + "px");
        }
    });



});

