import React from 'react';
import Header from './componentes/Header';
import DataTable from './componentes/DataTable';
import ApiService from './componentes/ApiService';

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
        .then(res => {
          this.setState({livros: [...this.state.livros, ...res.data]});
        })
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