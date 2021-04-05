var targetSelection = null;
var dpi = 300;
var notepad;
const NOTEPAD = $(".text-area");
const RULERX = $(".ruler.horizontal .inner");
const RULERY = $(".ruler.vertical .inner");

$(document).ready(function () {

    // Initialise Notepad
    var width = localStorage.textAreaWidth ?? 900;
    var height = localStorage.textAreaHeight ?? 600;
    initNotepad(parseInt(width), parseInt(height));

    // Set font-family to its style
    for (var i = 0; i < $(".font-family option").length; i++) {
        let fontFamily = $(".font-family option")[i].innerHTML;
        $(".font-family option")[i].style["font-family"] = fontFamily;
    }

    // Set highlight none
    $(".font-highlight button:first-child i").css("color", "rgba(0,0,0,0.1)");

    if (localStorage.textAreaData !== undefined) {
        notepad.node.html(localStorage.textAreaData);
        $(".filename").val(localStorage.filename);
        wordsCount();

        if (localStorage.textAreaData != notepad.node.html()) {
            $('#save i').addClass('shake');
            $('#save i').css('color', "rgb(33, 37, 41)");
        } else {
            $('#save i').removeClass('shake');
            $('#save i').css('color', "rgba(0,0,0,0.1)");
        }
    }
});

function initNotepad(width, height) {
    NOTEPAD.html("");
    notepad = new Notepad(NOTEPAD, 50, 50, width, height, RULERX, RULERY);

}

// Set style of element
function setStyle(elem, style) {
    elem.attr("size", style["font-size"]);
    elem.attr("face", style["font-family"]);
    elem.attr("face", style["font-family"]);

    elem.css({
        size: style["font-size"],
        "font-family": style["font-family"],
        "font-weight": style["isBold"] ? "bold" : "normal", //ternary condition
        "font-style": style["isItalic"] ? "italic" : "normal", //ternary condition
        "text-decoration": style["isUnderline"] ? "underline" : "none", //ternary condition
        color: style["font-color"],
        background: style["font-highlight"],
    });
    // elem.parent("div").css({
    //     'text-align': style['text-alignment']
    // })
}

// Get style of current notepad format
function getCurrentStyle() {
    let currentStyle = {};
    currentStyle["font-size"] = $("#font-size option:selected")[0].value;
    currentStyle["font-family"] = $("#font-family option:selected")[0].value;
    currentStyle["isBold"] = $("#bold").hasClass("active");
    currentStyle["isItalic"] = $("#italic").hasClass("active");
    currentStyle["isUnderline"] = $("#underline").hasClass("active");
    currentStyle["font-color"] = $("#font-color")[0].value;
    let isHighlighting =
        $(".font-highlight button:first-child i")[0].style["color"] !==
        "rgba(0, 0, 0, 0.1)";
    currentStyle["font-highlight"] = isHighlighting
        ? $("#font-highlight")[0].value
        : "unset";
    currentStyle["text-alignment"] = $(
        ".text-alignment input[type='radio']:checked"
    ).attr("value");
    return currentStyle;
}
/* --------- START BUTTON LISTENER --------- */

$("#new").mouseup(function () {
    if (confirm("Are you sure you want to create a new document?")) {
        $(".filename").val("");
        initNotepad(900, 600);
        localStorage.setItem("textAreaData", notepad.node.html());
        localStorage.setItem("filename", $(".filename").val());
    }
});

$("#save").mouseup(function () {
    localStorage.setItem("textAreaData", notepad.node.html());
    localStorage.setItem("filename", $(".filename").val());
    localStorage.setItem("textAreaWidth", notepad.node.outerWidth());
    localStorage.setItem("textAreaHeight", notepad.node.outerHeight());
});

$("#upload").mouseup(function () { });

$("#download").mouseup(function () {
    $(document).googoose({
        area: ".text-area",
        filename: $(".filename").val()
            ? $(".filename").val() + ".doc"
            : "Simple.doc",
    });
});

$("#undo").mouseup(function () {
    document.execCommand("undo");
});

$("#redo").mouseup(function () {
    document.execCommand("redo");
});

$("#cut").mouseup(function () {
    document.execCommand("cut");
});

$("#copy").mouseup(function () {
    document.execCommand("copy");
});

$("#paste").mouseup(function () {
    document.execCommand("paste");
});

$("#select-all").mouseup(function () {
    $(".text-area")[0].focus();
    document.execCommand("selectAll");
});

/* --------- END BUTTON LISTENER --------- */

/* --------- START STYLE CHANGE LISTENER --------- */

//font-size
$("#font-size").on("change", function () {
    document.execCommand(
        "fontSize",
        false,
        $("#font-size option:selected")[0].value
    );
    // $(getSelection().anchorNode.parentNode.parentNode).removeAttr("size").css("font-size", $('#font-size option:selected')[0].value + "px");
});

//font-family
$("#font-family").on("change", function () {
    document.execCommand(
        "fontName",
        false,
        $("#font-family option:selected")[0].value
    );
});

//font-color
$("#font-color").on("input", function () {
    $(".font-color i").css("color", $("#font-color")[0].value);
    document.execCommand("foreColor", false, $("#font-color")[0].value);
});

//font-highlight
$("#font-highlight").on("input", function () {
    $(".font-highlight button:first-child i").css(
        "color",
        $("#font-highlight")[0].value
    );
    document.execCommand("backColor", false, $("#font-highlight")[0].value);
});

$("#cancel-highlight").on("mouseup", function () {
    $(".font-highlight button:first-child i").css("color", "rgba(0,0,0,0.1)");
    document.execCommand("backColor", false, "unset");
});

//font-decoration
$("#bold").mouseup(function () {
    document.execCommand("bold");
});

$("#italic").mouseup(function () {
    document.execCommand("italic");
});

$("#underline").mouseup(function () {
    document.execCommand("underline");
});
//text-alignment
$(".text-alignment").on("change", function () {
    let alignment = $(".text-alignment input[type='radio']:checked").attr(
        "value"
    );
    if (alignment == "left") {
        document.execCommand("justifyLeft");
    } else if (alignment == "right") {
        document.execCommand("justifyRight");
    } else if (alignment == "center") {
        document.execCommand("justifyCenter");
    } else if (alignment == "justify") {
        document.execCommand("justifyFull");
    } else {
        console.error("Button doesnt exist");
    }
});

/* --------- END STYLE CHANGE LISTENER --------- */

function getTextChildNode(node) {
    var textNode = [];
    // Loop through all siblings
    for (var n = 0; n < node.childNodes.length; n++) {
        if (node.childNodes[n].nodeType == 1) {
            // Iterative function
            var tempNodes = getTextChildNode(node.childNodes[n]);
            textNode = textNode.concat(tempNodes);

        } else if (node.childNodes[n].nodeType == 3) {
            textNode.push(node.childNodes[n]);
        }
    }
    return textNode;
}

// Get all text nodes in text area
function getAllTextNodes() {
    var nodes = notepad.node.find(":not(iframe)").addBack().contents().filter(function () {
        return this.nodeType == 3;
    });
    return nodes;
}

// Get all text nodes in selected text
function getTextNodes() {
    var allNodes = getAllTextNodes();
    var selection = getSelection();

    var nodes = [];

    // If selection is empty
    if (selection.type == "None") {
        return null;
    } else {

        // Loop through all text nodes in text-area
        for (var n = 0; n < allNodes.length; n++) {

            //If selection contain a text node, push into the result
            if (selection.containsNode(getAllTextNodes()[n])) {
                nodes.push(getAllTextNodes()[n]);
            }
        }
        return nodes;
    }
}

/* --------- TEXT AREA FOCUS LISTENER --------- */

function updateTextArea() {
    // update save button
    if (localStorage.textAreaData != notepad.node.html()) {
        $('#save i').addClass('shake');
        $('#save i').css('color', "rgb(33, 37, 41)");
    } else {
        $('#save i').removeClass('shake');
        $('#save i').css('color', "rgba(0,0,0,0.1)");
    }
    wordsCount();
    checkSelectionFormat();
    ee();

}


$("html").mouseup(function (e) {
    updateTextArea();
});

$("html").keyup(function () {
    updateTextArea();
});


/* ---------- START CHECK FORMAT ---------- */

function stateCheck(style, currentState, ACTIVE, NORMAL) {
    if (currentState != 2) {
        if (style == ACTIVE) {

            // stop once there are text that is mixed state
            if (currentState == 0) {
                return 2;
            }
            else {
                return 1;
            }
            // stop once there are text that is mixed state
        } else if (style == NORMAL) {
            if (currentState == 1) {
                return 2;
            }
            else {
                return 0;
            }
        } else {
            console.error("style not consistent");
            return -1;
        }
    }
}

function checkSelectionFormat() {
    const BOLD_ACTIVE = 700;
    const BOLD_NORMAL = 400;

    const ITALIC_ACTIVE = "italic";
    const ITALIC_NORMAL = "normal";

    const UNDERLINE_ACTIVE = "underline";
    const UNDERLINE_NORMAL = "none";

    /* 
  
      STATE:
  
      -1 : ERROR
      0 : SINGLE
      1 : MIXED
  
    */

    var states = {
        'fontFamily': -1,
        'fontSize': -1,
        'color': -1,
        'backgroundColor': -1,
        'bold': -1,
        'italic': -1,
        'underline': -1,
        'alignment': -1,
    }

    var nodes = getTextNodes();
    if (nodes == null || nodes.length == 0) {
        return null;
    }

    var initFontFamily = $(nodes[0].parentNode).css("font-family");
    states.fontFamily = 0;

    var initFontSize = $(nodes[0].parentNode).attr('size');
    states.fontSize = 0;

    var initColor = $(nodes[0].parentNode).css("color");
    states.color = 0;

    var initBackgroundColor = $(nodes[0].parentNode).css("background-color");
    states.backgroundColor = 0;

    var initBold = $(nodes[0].parentNode).css("font-weight");
    states.bold = 0;

    var initItalic = $(nodes[0].parentNode).css("font-style");
    states.italic = 0;

    var initUnderline = $(nodes[0].parentNode).css("text-decoration-line");
    states.underline = 0;

    var initAlignment = $(nodes[0].parentNode).css("text-align");
    states.alignment = 0;

    // Check for mixed styling
    for (var i = 0; i < nodes.length; i++) {
        //if node is #text
        if (nodes[i]["nodeType"] == 3) {

            // Check for font-family state
            if ($(nodes[i].parentNode).css("font-family") != initFontFamily) {
                states.fontFamily = 1;
            }

            // Check for font-size state
            if ($(nodes[i].parentNode).attr('size') != initFontSize) {
                states.fontSize = 1;
            }

            // Check for color state
            if ($(nodes[i].parentNode).css("color") != initColor) {
                states.color = 1;
            }

            // Check for background-color state
            if ($(nodes[i].parentNode).css("background-color") != initBackgroundColor) {
                states.backgroundColor = 1;
            }

            // Check for bold state
            if ($(nodes[i].parentNode).css("font-weight") != initBold) {
                states.bold = 1;
            }

            // Check for italic state
            if ($(nodes[i].parentNode).css("font-style") != initItalic) {
                states.italic = 1;
            }

            // Check for underline state
            if ($(nodes[i].parentNode).css("text-decoration-line") != initUnderline) {
                states.underline = 1;
            }

            // Check for alignment state
            if ($(nodes[i].parentNode).css("text-align") != initAlignment) {
                states.alignment = 1;
            }


        }
    }

    // Update notepad style options
    if (states.fontFamily == 0) {
        $('#font-family').val(initFontFamily);
    }
    else {
        $('#font-family').val("");
    }

    if (states.fontSize == 0) {
        $('#font-size').val(initFontSize);
    }
    else {
        $('#font-size').val("");
    }

    if (states.color == 0) {
        $("#font-color").val(initColor);
        $(".font-color i").css("color", initColor);
    }
    else {
        $("#font-color").val("");
        $(".font-color i").css("color", "rgba(0,0,0,0.1)");
    }

    if (states.backgroundColor == 0) {
        if (nodes[0].parentNode.id == "text-area" || $(nodes[0]).parent().css("background-color") == "rgba(0, 0, 0, 0)") {
            $("#font-highlight").val("");
            $("#font-highlight i").css("color", "rgba(0,0,0,0.1)");
        }
        else {
            $("#font-highlight").val(initBackgroundColor);
            $("#font-highlight i").css("color", initBackgroundColor);
        }
    }
    else {
        $("#font-highlight").val("");
        $("#font-highlight i").css("color", "rgba(0,0,0,0.1)");
    }

    if (states.bold == 0) {
        if (initBold == BOLD_ACTIVE) {
            // SET
            $("#bold").addClass("active");
            $("#bold").attr("aria-pressed", "true");
            $("#bold i").css("color", "rgb(33, 37, 41)");
        } else if (initBold == BOLD_NORMAL) {
            // UNSET
            $("#bold").removeClass("active");
            $("#bold").attr("aria-pressed", "false");
            $("#bold i").css("color", "rgb(33, 37, 41)");
        }
        else {
            // ERROR
            $("#bold").removeClass("active");
            $("#bold").attr("aria-pressed", "false");
            $("#bold i").css("color", "rgba(0,0,0,0.1)");
        }
    }
    else {
        // MIXED
        $("#bold").removeClass("active");
        $("#bold").attr("aria-pressed", "false");
        $("#bold i").css("color", "rgba(0,0,0,0.1)");
    }

    if (states.italic == 0) {
        if (initItalic == ITALIC_ACTIVE) {
            // SET
            $("#italic").addClass("active");
            $("#italic").attr("aria-pressed", "true");
            $("#italic i").css("color", "rgb(33, 37, 41)");
        } else if (initItalic == ITALIC_NORMAL) {
            // UNSET
            $("#italic").removeClass("active");
            $("#italic").attr("aria-pressed", "false");
            $("#italic i").css("color", "rgb(33, 37, 41)");
        }
        else {
            // ERROR
            $("#italic").removeClass("active");
            $("#italic").attr("aria-pressed", "false");
            $("#italic i").css("color", "rgba(0,0,0,0.1)");
        }
    }
    else {
        // MIXED
        $("#italic").removeClass("active");
        $("#italic").attr("aria-pressed", "false");
        $("#italic i").css("color", "rgba(0,0,0,0.1)");
    }

    if (states.underline == 0) {
        if (initUnderline == UNDERLINE_ACTIVE) {
            // SET
            $("#underline").addClass("active");
            $("#underline").attr("aria-pressed", "true");
            $("#underline i").css("color", "rgb(33, 37, 41)");
        } else if (initUnderline == UNDERLINE_NORMAL) {
            // UNSET
            $("#underline").removeClass("active");
            $("#underline").attr("aria-pressed", "false");
            $("#underline i").css("color", "rgb(33, 37, 41)");
        }
        else {
            // ERROR
            $("#underline").removeClass("active");
            $("#underline").attr("aria-pressed", "false");
            $("#underline i").css("color", "rgba(0,0,0,0.1)");
        }
    }
    else {
        // MIXED
        $("#underline").removeClass("active");
        $("#underline").attr("aria-pressed", "false");
        $("#underline i").css("color", "rgba(0,0,0,0.1)");
    }

    if (states.alignment == 0) {
        $(".text-alignment input:checked").parent().removeClass('active');
        $(".text-alignment input:checked").attr("checked", false);
        $(".text-alignment [value='" + initAlignment + "']").attr("checked", true);
        $(".text-alignment input:checked").parent().addClass('active');
    }
    else {
        // ERROR OR MIXED
        $(".text-alignment input").parent().removeClass('active');
    }

    return states;
}
/* ---------- END CHECK FORMAT ---------- */


// Make header position fixed at certain scrollpoint
$('body').scroll(function () {
    var scrollTop = $('body').scrollTop();
    var targetScrollPoint = $("header").outerHeight();
    if (scrollTop > targetScrollPoint) {
        $("header").css("position", "fixed");
    }
    else {
        $("header").css("position", "initial");
    }
});