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
    const linhas = props.autores.map( (linha) => {
        return(
            <tr key={linha.id}> 
                <td>{linha.nome}</td>
                <td>{linha.livro}</td>
                <td>{linha.preco}</td>
                <td><button className="waves-effect waves-light btn indigo lighten-3" onClick={() => {props.removeAutor(linha.id)}}>Remover</button></td>
            </tr>
        )
    })

    return(
        <tbody>
            {linhas}
        </tbody>
    )
}

class Tabela extends React.Component{
    render(){
        const {autores, removeAutor} = this.props;
        return (
            <table className="centered highlight">
                <TableHead />
                <TableBody autores = {autores} removeAutor = {removeAutor}/>
            </table>
        )
    }
}

export default Tabela;