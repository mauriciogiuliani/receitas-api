import ReceitasService from "../../services/receitas";
import CategoriasService from "../../services/categorias";

export const resolvers = {
  Query: {
    receitas: () => ReceitasService.receitas(),
    categorias: () => CategoriasService.categorias(),
  },
};
