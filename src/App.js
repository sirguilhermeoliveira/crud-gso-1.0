import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'CRUD',
      act: 0,
      index: '',
      datas: []
      
    }
  } 
/* Cria um looping de renderização para não desaparecer */
  componentDidMount(){
    this.refs.name.focus();
  }
/* Cria as variáveis do formulário e Envia o formulário(definida as variáveis ref em cada formulário).
Caso não esteja nada vazio */
  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let age = this.refs.age.value;
    let email = this.refs.email.value;
    if(name=== "" || address === "" || age === "" || email === ""){
      return alert("Todos os campos precisam estar preenchidos.")
    }
 /*    cria um novo se as confições do if anterior forem aceitas */
    if(this.state.act === 0){   //new
      let data = {
        name, age, address, email
      }
/*       e em seguida a let datas é puxada no push(puxa uma de cada) para criar uma nova aba do formulário */
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].age = age;
      datas[index].email = email;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }
/* botão remove que tira o item */
  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }
/* botão de editar o item com o que está atualmente */
  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.age.value = data.age;
    this.refs.email.value = data.email;
    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  
/* aplica estilo e cria o formulário, ativa as funções, cria o click */
  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
      <div className="crud">
        <h2>{this.state.title}</h2>
        </div>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Seu Nome" className="formField" />
          <input type="text" ref="age" placeholder="Sua Idade" className="formField" />
          <input type="text" ref="address" placeholder="Seu Endereço" className="formField" />
          <input type="text" ref="email" placeholder="Seu Email" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Enviar</button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.age}, {data.address},{data.email}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Remover </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Editar</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;