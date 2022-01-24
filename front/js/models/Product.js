export default class Product {
  constructor(colors, _id, name, imageUrl, description, altTxt) {
    this.colors = colors;
    this._id = _id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }
}
