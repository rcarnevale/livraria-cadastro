import React from 'react';
import Header from './componentes/Header';
import DataTable from './componentes/DataTable';

class Livros extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
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
                },
                {
                  nome: 'Nico',
                  livro: 'Java',
                  preco: '9999'
                }
              ],
              titulo: 'Livros'
        };

    }

    render(){
        
        return(
            <div className="livros">
                <Header />
                <div className="mb-10">
                    <DataTable dados = {this.state.autores} titulo = {this.state.titulo} colunas = {["livro"]} />
                </div>
            </div>
        )
    }
}

export default Livros;