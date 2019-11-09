import React from 'react';
import Header from './componentes/Header';
import DataTable from './componentes/DataTable';
import ApiService from './componentes/ApiService';
import PopUp from './componentes/PopUp';

class Livros extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            livros: [],
            titulo: 'Livros'
        };

    }

    componentDidMount(){
      ApiService.listaLivros()
                .then(res => ApiService.trataErro(res))
                .then(res => {
                  if(res.message === 'success'){
                    this.setState({livros: [...this.state.livros, ...res.data]})}
                  }
                )
                .catch(err => PopUp.exibeMensagem('error', "Erro em comunicação com API ao tentar carregar a listagem."))
    }

    render(){
        
        return(
            <div className="livros">
                <Header />
                <div className="mb-10">
                    <DataTable dados = {this.state.livros} titulo = {this.state.titulo} colunas = {["livro"]} />
                </div>
            </div>
        )
    }
}

export default Livros;