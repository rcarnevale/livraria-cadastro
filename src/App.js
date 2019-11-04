import React from 'react';
import './css/App.css';
import './css/materialize.min.css';

import Header from './componentes/Header'
import Tabela from './componentes/Tabela';
import Formulario from './componentes/Formulario'

class App extends React.Component {
  state = {
    autores: [
      {
        nome: 'Paulo',
        livro: 'React',
        preco: '1000'
      },
      {
        nome: 'Daniel',
        livro: 'Java',
        preco: '99'
      },
      {
        nome: 'Marcos',
        livro: 'Design',
        preco: '150'
      },
      {
        nome: 'Bruno',
        livro: 'DevOps',
        preco: '100'
      }
    ]
  }

  removeAutor = (index) => {
    const {autores} = this.state;
    this.setState(
      {
        autores: autores.filter((autor, posAtual) => {
          return posAtual !== index;
        })
      }
    )
  }

  enviaForm = autor => {
    this.setState({autores:[...this.state.autores, autor]})
  }

  render(){
    return (
      <div className="App">
        <Header />
        <div className="mb-10">
          <Formulario enviaForm= {this.enviaForm}/>
          <Tabela autores= {this.state.autores} removeAutor={this.removeAutor}/>
        </div>
      </div>
    );}
}

export default App;
