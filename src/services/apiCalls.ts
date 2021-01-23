import api from "./api";

const TOKEN = sessionStorage.getItem('TOKEN');

console.log(TOKEN)

/**
 * Arquivo que contem todas as rotas que são chamadas pelo sistema
 * Qualquer chamada a mais deve ser implementada aqui, conforme o módulo ao qual ela pertence
 */
const apiCalls =  {
  discente : {
    getTiposDeAcc: async function () {
      return await api.get('tipos-de-acc');
    },

    getAccsDiscente: async function () {
      return await api.get(`accs/user/${sessionStorage.getItem('USER_ID')}/completo`);
    },

    getDetalhesAcc: async function (id: string) {
      return await api.get(`accs/${id}`);
    }
  }
}

export default apiCalls;