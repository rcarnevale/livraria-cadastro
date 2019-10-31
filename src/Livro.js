import React from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';
import PubSub from 'pubsub-js';
import TratadorErros from './componentes/TratadorErros.js';

export default class LivroBox extends React.Component {

    constructor (){
        super();
        this.state = {lista :[], autores:[]}
      }
    componentDidMount(){
    $.ajax({
        url:"https://jsonstorage.net/api/items/ed903eb2-f745-41e2-9c64-e80d06438b51",
        dataType: 'json',
        success: (resposta) => {
        this.setState({lista:resposta})
        }
    });

    $.ajax({
        url: "https://jsonstorage.net/api/items/1895ad31-be47-427e-af0d-17ed2a8ddf9c",
        dataType: 'json',
        success:(data) => {
          this.setState({autores: data});
        }
      });

    PubSub.subscribe("atualiza-lista-livros", function(topico, novaLista){
        this.setState({lista:novaLista})
    }.bind(this))
    }

    render(){
        return(
          <div>
            <div className="header">
              <h1>Cadastro de Livros</h1>
            </div>
            <div className="content" id="content">
              <FormularioLivro autores={this.state.autores}/>
              <TabelaLivros lista={this.state.lista} />
            </div>
          </div>
        )
    }
}

class FormularioLivro extends React.Component {

    constructor (){
        super();
        this.state = {titulo:"", preco:"", autorID:""}
      }

    
    submitLivro(event){
        event.preventDefault();
        
        $.ajax({
        url: "https://jsonstorage.net/api/items/ed903eb2-f745-41e2-9c64-e80d06438b51",
        contentType: 'application/json',
        dataType: 'json',
        type: 'post',
        data:JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorID:this.state.autorID}),
        success:(novaLista) => {
            PubSub.publish("atualiza-lista-livros", novaLista);
            this.setState({titulo:"", preco:"", autorID:""});
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

    setTitulo(event){
        this.setState({titulo:event.target.value});
      }
    
      setPreco(event){
        this.setState({preco:event.target.value});
      }
    
      setAutorID(event){
        this.setState({autorID:event.target.value});
      }

      render() {
        var autores = this.props.autores.map((autor) => {
          return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
        });
        return (
          <div className="autorForm">
            <form className="pure-form pure-form-aligned" onSubmit={this.submitLivro.bind(this)} method="post">
              <InputCustomizado id="titulo" name="titulo" label="Titulo: " type="text" value={this.state.titulo} placeholder="Titulo do livro" onChange={this.setTitulo.bind(this)} />
              <InputCustomizado id="preco" name="text" label="Preco: " type="decimal" value={this.state.preco} placeholder="Preço do livro" onChange={this.setPreco.bind(this)} />
              <div className="pure-controls">
                <label htmlFor="autorID">Autor</label>
                <select value={this.state.autorID} name="autorId" onChange={this.setAutorID.bind(this)}>
                  <option value="">Selecione</option>
                  {autores}
                </select>
              </div>
              <div className="pure-control-group">                                  
                <label></label> 
                <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
              </div>          
            </form>             
          </div>
        );
      }
}

export class TabelaLivros extends React.Component {

    render(){
            var livros = this.props.lista.map((livro) => {
                return(
                    <tr key={livro.titulo}>
                      <td>{livro.titulo}</td>
                      <td>{livro.autor.nome}</td>
                      <td>{livro.preco}</td>
                    </tr>
                  );
                });

        return(
            <div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Autor</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                  {livros}
              </tbody>
            </table> 
          </div>        
        )
    }
}

