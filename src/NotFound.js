import React from 'react';
import Header from './componentes/Header';

class NotFound extends React.Component {

    render(){
        return(
            <div className='not-found'>
                <Header />
                <h1>Página não encontrada</h1>
            </div>

        )
    }
}

export default NotFound;