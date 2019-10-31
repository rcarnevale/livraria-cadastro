import React from 'react';
import './App.css';

import Tabela from './componentes/Tabela';

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

  removeAutor(index){
    this.setState(
      {
        autores: autores.filter((autor, posAtual) => {
          return posAtual !== index;
        })
      }
    )
  }

  render(){
    return (
      <div className="App">
        <Tabela autores= {this.state.autores} removeAutor={this.removeAutor}/>
      </div>
    );}
}

export default App;
