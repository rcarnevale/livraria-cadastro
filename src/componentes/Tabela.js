import React from 'react';

const TableHead = () => {
    return(
        <thead>
          <tr>
            <th>Autores</th>
            <th>Livros</th>
            <th>Preços</th>
            <th>Remover</th>
          </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const linhas = props.autores.map( (linha,index) => {
        return <tr>
            <td>{linha.nome}</td>
            <td>{linha.livro}</td>
            <td>{linha.preco}</td>
            <td><button>Remover</button></td>
        </tr>
    })
}

class Tabela extends React.Component{
    render(){
        const {autores} = this.props;
        return (
            <table>
                <TableHead />
                <TableBody autores = {autores}/>
            </table>
        )
    }
}

export default Tabela;