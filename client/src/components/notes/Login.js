import React from 'react'
import axios from '../../config/config';


class NoteLogin extends React.Component{
    constructor(){
    super()
    this.state={
        email:'',
        password:''
    }
    this.handleInput=this.handleInput.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
}
handleInput(e){
    e.persist()
    this.setState(()=>({
        [e.target.name]:e.target.value
    }))
}
handleSubmit(e){
    e.preventDefault()
    const formData={
        email:this.state.email,
        password:this.state.password
    }
    console.log(formData)
    axios.post(`/users/login`,formData)
    .then(response=>{
        console.log(response.token)
        if(response.data.token){
            const token=response.data.token
            localStorage.setItem('userAuthToken',token)
            this.props.handleAuth(true)
            this.props.history.push('/users/account')
        }else{
            alert(response.data.errors)
        }
    })

}
render(){
    return(
        <form onSubmit={this.handleSubmit}>

            <label>Email:
            <input type="text" value={this.state.value}
                 onChange={this.handleInput} name="email"/>
            </label><br/><br/>

            
            <label>Password:
            <input type="password" value={this.state.value}
                 onChange={this.handleInput} name="password"/>
            </label><br/><br/>  

            <input type="submit"/>   
        </form>
    )
}
}

export default NoteLogin