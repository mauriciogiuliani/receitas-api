const { readFileSync } = require("fs");

class CategoriasService {
  data: any;

  constructor() {
    const args = process.argv.slice(2);
    let dataPath;

    if (args[0]) {
      dataPath = args[0] + "categorias.json";
    } else {
      dataPath = "./data/categorias.json";
    }

    this.data = readFileSync(dataPath, "utf8");
    this.data = JSON.parse(this.data);
  }

  categorias() {
    return this.data;
  }
}

export default new CategoriasService();
