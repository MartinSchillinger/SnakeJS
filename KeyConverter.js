class KeyConverter {
  convertKeyToAction(event) {
    switch (event.keyCode) {
      case 38:
      case 87:
        return Controls.up;
      case 39:
      case 68:
        return Controls.right;
      case 40:
      case 83:
        return Controls.down;
      case 37:
      case 65:
        return Controls.left;
      default:
        return Controls.unused;
    }
  }
}
