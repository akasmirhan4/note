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