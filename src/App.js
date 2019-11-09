import React from 'react';
import './css/App.css';
import './css/materialize.min.css';

import Header from './componentes/Header'
import Tabela from './componentes/Tabela';
import Formulario from './componentes/Formulario';
import PopUp from './componentes/PopUp';
import ApiService from './componentes/ApiService';

class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state ={
      autores:[],
    }
  }

  removeAutor = id => {
    const {autores} = this.state;
    this.setState(
      {
        autores: autores.filter((autor) => {
          return autor.id !== id;
        })
      }
    )
    PopUp.exibeMensagem("error", "Autor removido com sucesso!");
    ApiService.removeAutor(id);
  }

  enviaForm = autor => {
    ApiService.criaAutor(JSON.stringify(autor))
              .then(res => res.data)
              .then(autor => {
                this.setState({autores:[...this.state.autores, autor]});
                PopUp.exibeMensagem('success', "Autor adicionado com sucesso!")
              })
  }

  componentDidMount(){
    ApiService.listaAutores()
                .then(res => {
                  this.setState({autores: [...this.state.autores, ...res.data]})
                });
  }
  render(){ 
    
    return (
      <div className="App">
        <Header />
        <div className="mb-10">
          <h1>Sistema de Cadastro</h1>
          <Formulario enviaForm= {this.enviaForm}/>
          <Tabela autores= {this.state.autores} removeAutor={this.removeAutor}/>
        </div>
      </div>
    );}
}


export default App;
