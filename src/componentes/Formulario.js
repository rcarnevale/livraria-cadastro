import React from 'react';
import FormValidator from './Validator';
import PopUp from './PopUp'

class Formulario extends React.Component{
    
    constructor(props){
        super(props);
        
        this.validator = new FormValidator([
            {
                campo:"nome",
                metodo:"isEmpty",
                validoQuando: false,
                mensagem: "Entre com um nome"
            },{
                campo:"livro",
                metodo:"isEmpty",
                validoQuando: false,
                mensagem: "Entre com um livro"
            },{
                campo:"preco",
                metodo:"isInt",
                args: [{min:0, max: 99999}],
                validoQuando: true,
                mensagem: "Entre com um valor numerico"
            }
        ]);
        
        this.stateInicial ={
            nome:'',
            livro:'',
            preco:'',
            validacao: this.validator.valido()
        }

        

        this.state = this.stateInicial;
    }
    
    inputFormulario = event => {
        const {name,value} = event.target;

        this.setState({
            [name]:value
        })
    }

    submitForm = () => {

        const validacao = this.validator.valida(this.state)
        if(validacao.isValid){
            this.props.enviaForm(this.state);
            this.setState(this.stateInicial);
        }else{
            const {nome, livro, preco} = validacao;
            const campos = [nome, livro, preco];

            const camposInvalidos= campos.filter(elemento => {
                return elemento.isInvalid;
            })
            
            camposInvalidos.forEach(campo => {
                PopUp.exibeMensagem('error', campo.message);
            });
        }
    }

    render(){

        const {nome,livro,preco} = this.state;

        return(
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label htmlFor="nome"></label>
                        <input
                            placeholder="Nome"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.inputFormulario}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="livro"></label>
                        <input
                            placeholder="Livro"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.inputFormulario}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="preco"></label>
                        <input
                            placeholder="Preço"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.inputFormulario}
                        />
                    </div>
                </div>
                <button className="waves-effect waves-light btn indigo lighten-3" type="button" onClick={this.submitForm}>Salvar</button>
            </form>
        )
    }
}

export default Formulario;