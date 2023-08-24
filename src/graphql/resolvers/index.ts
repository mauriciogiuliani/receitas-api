import ReceitasService from "../../services/receitas";
import CategoriasService from "../../services/categorias";

export const resolvers = {
  Query: {
    receitas: () => ReceitasService.receitas(),
    receita: (parent: any, args: any) =>  ReceitasService.receita(args),
    categorias: () => CategoriasService.categorias(),
  },
};

