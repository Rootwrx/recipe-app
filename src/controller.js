import Model from "./model";
import View from "./views/view";

class Controler {
  constructor() {
    this.model = new Model();
    this.View = new View(this.model);
  }
}

export default Controler;
