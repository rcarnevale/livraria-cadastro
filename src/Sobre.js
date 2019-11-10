import React from 'react';
import Header from './componentes/Header';

class Sobre extends React.Component {

    render(){
        return(
            <div className='sobre'>
                <Header />
                <h1>Sobre</h1>
                <p>Esta página representa um projeto criado por <a href="https://github.com/rcarnevale">Rodrigo Carnevale</a>.</p>
                <p>O objetivo é criar uma SPA para cadastro de livros e autores de uma livraria. </p>
                <p>Para ser testado completamente, é necessaria a instalação de uma api própria disponível juntamente com a build no <a href="https://github.com/rcarnevale/livraria-cadastro">repositório</a>.</p>
                <p>Também estão disponíveis, no mesmo repositório, alguns branches com o código antes da build final, a fim de registrar o progresso.</p>
            </div>
        )
    }
}

export default Sobre;