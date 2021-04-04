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

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function rgb2hex(rgb) {
    if (rgb == "none") {
        return "none";
    }
    else if (rgb == "") {
        return "";
    }
    else {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

}

function hex2rgb(hex) {
    if (hex != "none") {
        var hex = hex.match(/[A-Za-z0-9]{2}/g);
        hex = hex.map(function (v) { return parseInt(v, 16) });

        return "rgb(" + hex.join(",") + ")";
    } else {
        return "none";
    }
}

function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }
}

function getRangeSelectedNodes(range) {
    var node = range.startContainer;
    var endNode = range.endContainer;

    // Special case for a range that is contained within a single node
    if (node == endNode) {
        return [node];
    }

    // Iterate nodes until we hit the end container
    var rangeNodes = [];
    while (node && node != endNode) {
        rangeNodes.push( node = nextNode(node) );
    }

    // Add partially selected nodes at the start of the range
    node = range.startContainer;
    while (node && node != range.commonAncestorContainer) {
        rangeNodes.unshift(node);
        node = node.parentNode;
    }

    return rangeNodes;
}

function getSelectedNodes() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (!sel.isCollapsed) {
            return getRangeSelectedNodes(sel.getRangeAt(0));
        }
    }
    return [];
}