class CollisionDetector {
  constructor() {
    this.elements = [];
    this.intersection = false;
  }

  addElement(e) {
    this.elements.concat(e.getVector());
  }

  detect() {
    let seen = new Set();
    let duplicates = this.elements.filter(e => {
      return seen.size === seen.add(e.x + "_" + e.y).size;
    });
    //TODO: find the duplicates
    return duplicates;
  }
}
