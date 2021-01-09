import api from "./api";

const TOKEN = localStorage.getItem('TOKEN');

/**
 * Arquivo que contem todas as rotas que são chamadas pelo sistema
 * Qualquer chamada a mais deve ser implementada aqui, conforme o módulo ao qual ela pertence
 */
const apiCalls =  {
  discente : {
    getTiposDeAcc: async function () {
      return await api.get('tipos-de-acc', {headers: { Authorization: `Bearer ${TOKEN}`}});
    },
  }
}

export default apiCalls;