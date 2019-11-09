import React from 'react';
import Header from './componentes/Header';
import DataTable from './componentes/DataTable';
import ApiService from './componentes/ApiService';

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
        .then(res => {
          this.setState({nomes: [...this.state.nomes, ...res.data]})
        }
        )
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