var targetSelection = null;

$(document).ready(function () {
    // Set font-family to its style
    for (var i = 0; i < $(".font-family option").length; i++) {
        let fontFamily = $(".font-family option")[i].innerHTML;
        $(".font-family option")[i].style["font-family"] = fontFamily;
    }

    // Set highlight none
    $(".font-highlight button:first-child i").css("color", "rgba(0,0,0,0.1)");

    if (localStorage.textAreaData !== undefined) {
        $('main')[0].innerHTML = localStorage.textAreaData;
        $('main')[0].innerHTML = localStorage.textAreaData;
        $(".filename").val(localStorage.filename);
        wordsCount();
    }
});



// Set style of element
function setStyle(elem, style) {
    elem.attr("size", style['font-size']);
    elem.attr("face", style['font-family']);
    elem.attr("face", style['font-family']);

    elem.css({
        'size': style['font-size'],
        'font-family': style['font-family'],
        'font-weight': style['isBold'] ? "bold" : "normal", //ternary condition
        'font-style': style['isItalic'] ? "italic" : "normal", //ternary condition   
        'text-decoration': style['isUnderline'] ? "underline" : "none", //ternary condition 
        'color': style['font-color'],
        'background': style['font-highlight']
    });
    // elem.parent("div").css({
    //     'text-align': style['text-alignment']
    // })
}


// Get style of selected text
function getSelectionStyle() {
    // If there are no text, return the current style
    if (getSelection().anchorNode.id == "text-area") {
        return getCurrentStyle();
    } else {
        let selectedStyle = {};
        selectedStyle['font-size'] = getSelection().anchorNode.parentElement.style.fontSize;
        selectedStyle['font-family'] = getSelection().anchorNode.parentElement.style.fontFamily;
        selectedStyle['isBold'] = getSelection().anchorNode.parentElement.style.fontWeight == "bold" ? true : false;
        selectedStyle['isItalic'] = getSelection().anchorNode.parentElement.style.fontStyle == "italic" ? true : false;
        selectedStyle['isUnderline'] = getSelection().anchorNode.parentElement.style.textDecoration == "underline" ? true : false;
        selectedStyle['font-color'] = rgb2hex(getSelection().anchorNode.parentElement.style.color);
        selectedStyle['font-highlight'] = rgb2hex(getSelection().anchorNode.parentElement.style.background);
        selectedStyle['text-alignment'] = getSelection().anchorNode.parentElement.style.textAlignment;
        return selectedStyle;
    }

}

// Get style of current notepad format
function getCurrentStyle() {
    let currentStyle = {};
    currentStyle['font-size'] = $('#font-size option:selected')[0].value;
    currentStyle['font-family'] = $('#font-family option:selected')[0].value;
    currentStyle['isBold'] = $("#bold").hasClass("active");
    currentStyle['isItalic'] = $("#italic").hasClass("active");
    currentStyle['isUnderline'] = $("#underline").hasClass("active");
    currentStyle['font-color'] = $("#font-color")[0].value;
    let isHighlighting = $(".font-highlight button:first-child i")[0].style['color'] !== "rgba(0, 0, 0, 0.1)";
    currentStyle['font-highlight'] = isHighlighting ? $("#font-highlight")[0].value : "unset";
    currentStyle['text-alignment'] = $(".text-alignment input[type='radio']:checked").attr("value");
    return currentStyle;
}
/* --------- START BUTTON LISTENER --------- */

$("#new").mouseup(function () {
    $(".filename").val("");
    $("#text-area")[0].outerHTML = '<div id="text-area" class="text-area" contenteditable="true" placeholder="Text Something..." size="3" face="Calibri" style="size: 3px; font-family: Calibri; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(0, 0, 0); background: unset;"></div>';
});

$("#save").mouseup(function () {
    localStorage.setItem('textAreaData', $('main')[0].innerHTML);
    localStorage.setItem('filename', $(".filename").val());
});

$("#upload").mouseup(function () {

});

$("#download").mouseup(function () {
    $(document).googoose({
        area: '.text-area',
        filename: $(".filename").val() ? $(".filename").val() + ".doc" : "Simple.doc"
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
    $('.text-area')[0].focus();
    document.execCommand("selectAll");
});


/* --------- END BUTTON LISTENER --------- */

/* --------- START STYLE CHANGE LISTENER --------- */

//font-size
$('#font-size').on('change', function () {
    document.execCommand("fontSize", false, $('#font-size option:selected')[0].value);
    // $(getSelection().anchorNode.parentNode.parentNode).removeAttr("size").css("font-size", $('#font-size option:selected')[0].value + "px");
}
);

//font-family
$('#font-family').on('change', function () {
    document.execCommand("fontName", false, $('#font-family option:selected')[0].value);
});



//font-color
$("#font-color").on('input',
    function () {
        $(".font-color i").css("color", $("#font-color")[0].value);
        document.execCommand("foreColor", false, $("#font-color")[0].value);
    }
);

//font-highlight
$("#font-highlight").on('input',
    function () {
        $(".font-highlight button:first-child i").css("color", $("#font-highlight")[0].value);
        document.execCommand("backColor", false, $("#font-highlight")[0].value);
    }
);

$("#cancel-highlight").on('mouseup',
    function () {
        $(".font-highlight button:first-child i").css("color", "rgba(0,0,0,0.1)");
        document.execCommand("backColor", false, "unset");
    }
);

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
$(".text-alignment").on('change',
    function () {
        let alignment = $(".text-alignment input[type='radio']:checked").attr("value");
        if (alignment == "left") {
            document.execCommand("justifyLeft");
        }
        else if (alignment == "right") {
            document.execCommand("justifyRight");
        }
        else if (alignment == "center") {
            document.execCommand("justifyCenter");
        }
        else if (alignment == "justify") {
            document.execCommand("justifyFull");
        }
        else {
            console.error("Button doesnt exist");
        }
    }
);

/* --------- END STYLE CHANGE LISTENER --------- */



// Check if two nodes have the same format
function checkNodeFormat(node1, node2) {
    if (node1["font-size"] !== node2["font-size"]) {
        return false;
    } else if (node1["font-family"] !== node2["font-family"]) {
        return false;
    } else if (node1["isBold"] !== node2["isBold"]) {
        return false;
    } else if (node1["isItalic"] !== node2["isItalic"]) {
        return false;
    } else if (node1["isUnderline"] !== node2["isUnderline"]) {
        return false;
    } else if (node1["font-color"] !== node2["font-color"]) {
        return false;
    } else if (node1["font-highlight"] !== node2["font-highlight"]) {
        return false;
    } else if (node1["text-alignment"] !== node2["text-alignment"]) {
        return false;
    } else {
        return true;
    }
}

// Handle Span wrapping of selection
function spanSelection() {
    var sel = getSelection();
    let span = document.createElement("span");
    if (getSelection()) {
        let selectedContent = sel.toString();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0);

            // If the selection is within only one span
            if (sel['anchorNode'] == sel['extentNode']) {

                // Selection is a the whole span
                if (sel['extentOffset'] == 0 && sel['anchorOffset'] == sel['anchorNode'].length) {
                    range.deleteContents();
                    let parentNode = range.startContainer.parentNode;
                    parentNode.parentNode.insertBefore(span, parentNode);
                    parentNode.remove();
                    span.innerText = selectedContent;
                }

                // Selection is a fragment at the start of a span
                else if (sel['extentOffset'] == 0) {
                    range.deleteContents();
                    let parentNode = range.startContainer.parentNode;
                    parentNode.parentNode.insertBefore(span, parentNode);
                    span.innerText = selectedContent;
                }

                // Selection is a fragment in the end of a span
                else if (sel['anchorOffset'] == sel['anchorNode'].length) {
                    range.deleteContents();
                    let parentNode = range.startContainer.parentNode;
                    parentNode.parentNode.insertBefore(span, parentNode.nextSibling);
                    span.innerText = selectedContent;
                }

                // Selection is a fragment in the middle of a span
                else {
                    let style = sel["anchorNode"].parentElement.getAttribute("style");
                    let spanBefore = document.createRange();

                    spanBefore.setEnd(sel['extentNode'], sel['extentOffset']);
                    spanBefore.setStart(sel['extentNode'], 0);

                    let spanBeforeContent = spanBefore.toString();
                    spanBefore.deleteContents();
                    let parentNode = spanBefore.startContainer.parentNode;
                    parentNode.parentNode.insertBefore(span, parentNode);
                    span.innerText = spanBeforeContent;


                    let spanAfter = document.createRange();

                    spanAfter.setStart(sel['anchorNode'], sel['extentOffset']);
                    spanAfter.setEnd(sel['anchorNode'], sel['anchorNode'].length);

                }

            }
        }
    }
    return span;
}

function clearSpan() {
    let spans = $('span');
    for (var i = 0; i < spans.length; i++) {
        if (!spans[i].innerHTML) { spans[i].remove() };
    }
}

// Get all nodes in selected text
function getSelectedNodes() {
    var selection = getSelection();
    var currentNode = selection.extentNode;
    var endNode = selection.anchorNode;

    var nodes = [currentNode];
    while (currentNode.nextSibling !== endNode) {
        nodes.push(currentNode.nextSibling);
        currentNode = currentNode.nextSibling;
    }
    nodes.push(endNode);

    return nodes;
}


/* --------- TEXT AREA FOCUS LISTENER --------- */
$("html").mouseup(function (e) {
    setBoldState();
    ee();
});

$("main").mouseup(function (e) {
    // if (targetSelection) {
    //     targetSelection.css("outline", "none");
    // }

    // Set document to selected text format if empty
    if ($(".text-area").text() == "") {
        setStyle($(".text-area"), getCurrentStyle());
    }

    // Change notepad format to selected text format
    else {
    }

    // Outline selection
    // $(e.target).css("outline", "#e1e1e1 dashed 2px");
    // targetSelection = $(e.target);
}
);

function wordsCount() {
    var content = $(".text-area")[0].innerText.replace(/\n/ig, ' ').replaceAll(/\s+/g, ' ').trim();
    if (content){
        var count = content.split(' ').length;  
    }
    else{
        var count = 0;
    }

    $("#word-count").text(count);   
}

$("main").keyup(function () {
    wordsCount();
    ee();
});

// Easter Egg
function ee() {
    var triggerStr1 = "Rick Roll";
    var triggerStr2 = "Ricardo";
    var triggerStr3 = "<b>RICARDO</b>";
    if ($(".text-area")[0].innerText.includes(triggerStr1)) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }
    else if ($(".text-area")[0].innerText.includes(triggerStr2)) {
        window.open("https://www.youtube.com/watch?v=4zBAoKtfom0");
    }
    else if ($(".text-area")[0].innerHTML.includes(triggerStr3)) {
        window.open("https://www.youtube.com/watch?v=S2brARroEcI");
    }


}

/* ---------- START CHECK FORMAT ---------- */

function checkSelectionBold() {
    const BOLD = 700;
    const NORMAL = 400;

    var state = -1;

    /* 

    STATE:

    -1 : ERRPR
    0 : NORMAL
    1 : BOLD
    2 : MIXED

    */

    var nodes = getSelectedNodes();

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]["nodeType"] == 3) { //3 means text element
            var fontWeight = $(nodes[i].parentNode).css("font-weight");
            if (fontWeight == BOLD) {
                if (state == 0) {
                    state = 2;
                    return state;
                }
                state = 1;
            }
            else if (fontWeight == NORMAL) {
                if (state == 1) {
                    state = 2;
                    return state;
                }
                state = 0;
            }
            else {
                console.error("font weight not consistent");
                state = -1;
                return state;
            }

        }
    }

    return state;
}

function setBoldState() {
    var boldState = checkSelectionBold();

    if (boldState == 0) {
        // UNSET BUTTON
        $("#bold").removeClass('active');
        $("#bold").attr('aria-pressed', 'false');
        $("#bold i").css('color', 'rgb(33, 37, 41)');

    }
    else if (boldState == 1) {
        // SET BUTTON
        $("#bold").addClass('active');
        $("#bold").attr('aria-pressed', 'true');
        $("#bold i").css('color', 'rgb(33, 37, 41)');

    }
    else if (boldState == 2) {
        // UNSET BUTTON
        $("#bold").removeClass('active');
        $("#bold").attr('aria-pressed', 'false');
        $("#bold i").css('color', 'rgba(0,0,0,0.1)');
    }
    else {
        // ERROR
    }
}


function checkSelectionItalic() {
    const ITALIC = "italic";
    const NORMAL = "normal";
    var state = -1;

    /* 

    STATE:

    -1 : ERRPR
    0 : NORMAL
    1 : ITALIC
    2 : MIXED

    */

    var nodes = getSelectedNodes();

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]["nodeType"] == 3) { //3 means text element
            var fontStyle = $(nodes[i].parentNode).css("font-style");
            if (fontStyle == ITALIC) {
                if (state == 0) {
                    state = 2;
                    return state;
                }
                state = 1;
            }
            else if (fontStyle == NORMAL) {
                if (state == 1) {
                    state = 2;
                    return state;
                }
                state = 0;
            }
            else {
                console.error("font style not consistent");
                state = -1;
                return state;
            }

        }
    }

    return state;
}

function setBoldState() {
    var boldState = checkSelectionBold();

    if (boldState == 0) {
        // UNSET BUTTON
        $("#bold").removeClass('active');
        $("#bold").attr('aria-pressed', 'false');
        $("#bold i").css('color', 'rgb(33, 37, 41)');

    }
    else if (boldState == 1) {
        // SET BUTTON
        $("#bold").addClass('active');
        $("#bold").attr('aria-pressed', 'true');
        $("#bold i").css('color', 'rgb(33, 37, 41)');

    }
    else if (boldState == 2) {
        // UNSET BUTTON
        $("#bold").removeClass('active');
        $("#bold").attr('aria-pressed', 'false');
        $("#bold i").css('color', 'rgba(0,0,0,0.1)');
    }
    else {
        // ERROR
    }
}