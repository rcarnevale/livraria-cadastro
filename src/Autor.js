import React from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';
import PubSub from 'pubsub-js';
import TratadorErros from './componentes/TratadorErros.js';

export default class AutorBox extends React.Component {

    constructor (){
        super();
        this.state = {lista :[]}
      }
    componentDidMount(){
    $.ajax({
        url:"https://jsonstorage.net/api/items/1895ad31-be47-427e-af0d-17ed2a8ddf9c",
        dataType: 'json',
        success: (resposta) => {
        this.setState({lista:resposta})
        }
    });
    PubSub.subscribe("atualiza-lista-autores", function(topico, novaLista){
        this.setState({lista:novaLista})
    }.bind(this))
    }

    render(){
        return(
          <div>
            <div className="header">
              <h1>Cadastro de autores</h1>
            </div>
            <div className="content" id="content">
              <FormularioAutor />
              <TabelaAutores lista={this.state.lista} />
            </div>
          </div>
        )
    }
}

class FormularioAutor extends React.Component {

    constructor (){
        super();
        this.state = {nome:"", email:"", senha:""}
      }

    
    enviaForm(event){
        event.preventDefault();
        
        $.ajax({
        url: "https://jsonstorage.net/api/items/1895ad31-be47-427e-af0d-17ed2a8ddf9c",
        contentType: 'application/json',
        dataType: 'json',
        type: 'post',
        data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
        success:(novaLista) => {
            PubSub.publish("atualiza-lista-autores", novaLista);
            this.setState({nome:"", email:"", senha:""});
        },
        error: function(resposta){
            if(resposta.status === 400){
                new TratadorErros().publicaErro(resposta.responseJSON);
            }
            
        },
        beforeSend: () => {
            PubSub.publish("limpa",{});
        }
        })
        
    }

    salvaAlteracao(nomeInput, evento){
      let campoAlterado = {};
      campoAlterado[nomeInput] = evento.target.value;
      this.setState(campoAlterado);
    }

    render(){
        return(
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
              <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, "nome")} label="Nome"/>                                              
              <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, "email")} label="Email"/>                                              
              <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, "senha")} label="Senha"/>
              <div className="pure-control-group">                                  
                <label></label> 
                <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
              </div>
            </form>             

          </div>
        )
    }
}

export class TabelaAutores extends React.Component {

    render(){
        return(
            <div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                  {
                    this.props.lista.map(autor => {
                      return (
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
              </tbody>
            </table> 
          </div>        
        )
    }
}