class Notepad {
    constructor(node, left, top, width, height, rulerX, rulerY) {
        this.left = left;
        this.top = top;
        this.right = parseInt(node.parent().css("width")) - (left + width);
        this.bottom = parseInt(node.parent().css("height")) - (top + height);
        this.node = node;
        this.rulerX = rulerX;   
        this.rulerY = rulerY;
        this.update();
    }

    update() {
        this.node.css('left', this.left + 'px');
        this.node.css('top', this.top + 'px');
        this.node.css('right', this.right + 'px');
        this.node.css('bottom', this.bottom + 'px');
        this.rulerX.css('left', this.left + 'px');
        this.rulerX.css('right', this.right + 'px');
        this.rulerY.css('top', this.top + 'px');
        this.rulerY.css('bottom', this.bottom + 'px');
    }

    setWidth(width) {
        this.right = parseInt(this.node.parent().css("width")) - (this.left + width);
        this.update();
    }

    setHeight(height) {
        this.bottom = parseInt(this.node.parent().css("height")) - (this.top + height);
        this.update();
    }

    setPositionLeft(left) {
        this.left = left;
        this.update();
    }

    // Right Position = parent width - cursorX
    setPositionRight(right) {
        this.right = parseInt(this.node.parent().css("width")) - right;
        this.update();
    }

    setPositionTop(top) {
        this.top = top;
        this.update();
    }

    // Bottom Position = parent height - cursorY
    setPositionBottom(bottom) {
        this.bottom = parseInt(this.node.parent().css("height")) - bottom;
        this.update();
    }
}