const ApiService = {
    listaAutores: () => {
        return fetch('http://localhost:8000/api/autor');
    },

    criaAutor: autor => {
        return fetch('http://localhost:8000/api/autor', {method: 'POST', headers: {'content-type': 'application/json'}, body: autor});
    },

    listaNomes: () => {
        return fetch('http://localhost:8000/api/autor/nome');

    },

    listaLivros: () => {
        return fetch('http://localhost:8000/api/autor/livro');
    },

    removeAutor: id => {
        return fetch(`http://localhost:8000/api/autor/${id}`, {method: 'DELETE', header: {'content-type': 'application/json'}});
    },

    trataErro: res =>{
        if(!res.ok){
            throw new Error(res.responseText);
        }
        return res.json();
    }

}
export default ApiService;