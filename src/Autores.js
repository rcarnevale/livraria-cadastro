import React from 'react';
import Header from './componentes/Header';
import DataTable from './componentes/DataTable';
import ApiService from './componentes/ApiService';
import PopUp from './componentes/PopUp';

class Autores extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            nomes: [],
              titulo: 'Autores'
        };

    }

    componentDidMount(){
      ApiService.listaNomes()
                .then(res => ApiService.trataErro(res))
                .then(res => {
                  if(res.message === 'success'){
                    this.setState({nomes: [...this.state.nomes, ...res.data]})}
                  }
                )
                .catch(err => PopUp.exibeMensagem('error', "Erro em comunicação com API ao tentar carregar a listagem."))
    }

    render(){
        
        return(
            <div className="autores">
                <Header />
                <div className="mb-10">
                    <DataTable dados = {this.state.nomes} titulo = {this.state.titulo} colunas = {["nome"]} />
                </div>
            </div>
        )
    }
}


export default Autores;