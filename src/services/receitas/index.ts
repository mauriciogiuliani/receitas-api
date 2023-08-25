const { readFileSync, writeFile } = require("fs");

class ReceitasService {
  data: any;
  dataPath: string;

  constructor() {
    const args = process.argv.slice(2);
    if (args[0]) {
      this.dataPath = args[0];
    } else {
      this.dataPath = "./data/";
    }

    this.data = readFileSync(this.dataPath + "/receitas.json", "utf8");
    this.data = JSON.parse(this.data);
  }

  receitas() {
    return this.data;
  }

  receita(args: any) {
    return this.data.find((receita: any) => receita.id === args.id);
  }

  addReceita(receita: any) {
    this.data.push(receita);

    const updatedJson = JSON.stringify(this.data, null, 2);

    // Write the updated data back to the file
    writeFile(this.dataPath, updatedJson, "utf8", (err: any) => {
      if (err) {
        console.error("Error writing the file:", err, this.dataPath);
        return;
      }
      console.log("Object added and file saved successfully.");
    });
  }

  destaques() : any[] {
    const destaques: string[] = JSON.parse(readFileSync(this.dataPath + "/destaques.json", "utf8"));
    return this.data.filter((receita: any) => destaques.includes(receita.id));
  }
}

export default new ReceitasService();
