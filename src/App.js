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
    const atualizaAutor = autores.filter(autor => {
      return autor.id !== id;
    })
    
    ApiService.removeAutor(id)
              .then(res => ApiService.trataErro(res))
              .then(res => {
                if(res.message === 'deleted'){
                  this.setState({autores: [...atualizaAutor]});
                  PopUp.exibeMensagem("error", "Autor removido com sucesso!");
                }
              })
              .catch(err => PopUp.exibeMensagem("error", "Erro em comunicação com API ao remover autor."))
    
  }

  enviaForm = autor => {
    ApiService.criaAutor(JSON.stringify(autor))
              .then(res => ApiService.trataErro(res))
              .then(res => {
                if(res.message === 'success'){
                  this.setState({autores:[...this.state.autores, autor]});
                  PopUp.exibeMensagem('success', "Autor adicionado com sucesso!")}
              })
              .catch(err => PopUp.exibeMensagem("error", "Erro em comunicação com API ao adicionar autor."))
              
  }

  componentDidMount(){
    ApiService.listaAutores()
              .then(res => ApiService.trataErro(res))
              .then(res => {
                if(res.message === 'success'){
                  this.setState({autores: [...this.state.autores, ...res.data]})}
              })
              .catch(err => PopUp.exibeMensagem("error", "Erro em comunicação com API ao tentar carregar a listagem."))
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
