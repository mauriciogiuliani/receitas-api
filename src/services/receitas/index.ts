const { readFileSync } = require("fs");

class ReceitasService {
  data: any;

  constructor() {
    const args = process.argv.slice(2);
    let dataPath;

    if (args[0]) {
      dataPath = args[0] + "receitas.json";
    } else {
      dataPath = "./data/receitas.json";
    }

    this.data = readFileSync(dataPath, "utf8");
    this.data = JSON.parse(this.data);
  }

  receitas() {
    return this.data;
  }
}

export default new ReceitasService();
