
// Get all text nodes in text area
function getAllTextNodes() {
    var nodes = notepad.node
        .find(":not(iframe)")
        .addBack()
        .contents()
        .filter(function () {
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

function wordsCount() {
    var content = $(".text-area")[0].innerText.replace(/\n/ig, ' ').replaceAll(/\s+/g, ' ').trim();
    if (content) {
        var count = content.split(' ').length;
    }
    else {
        var count = 0;
    }

    $("#word-count").text(count);
}

// Easter Egg
function ee() {
    var triggerStr1 = "Rick Roll";
    var triggerStr2 = "Ricardo";
    var triggerStr3 = "<b>RICARDO</b>";
    if ($(".text-area")[0].innerText.includes(triggerStr1)) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    } else if ($(".text-area")[0].innerText.includes(triggerStr2)) {
        window.open("https://www.youtube.com/watch?v=4zBAoKtfom0");
    } else if ($(".text-area")[0].innerHTML.includes(triggerStr3)) {
        window.open("https://www.youtube.com/watch?v=S2brARroEcI");
    }
}