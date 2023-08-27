const { readFileSync } = require("fs");

class CategoriasService {
  dataPath: string;

  constructor() {
    const args = process.argv.slice(2);
    if (args[0]) {
      this.dataPath = args[0];
    } else {
      this.dataPath = "./data/";
    }

  }

  categorias() {
    return JSON.parse(readFileSync(this.dataPath + "/categorias.json", "utf8"));
    
  }
}

export default new CategoriasService();
