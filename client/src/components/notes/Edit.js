import React from 'react'
import axios from '../../config/config'
import NotesForm from './Form';

class NotesEdit extends React.Component{
    
    constructor(props){
        console.log('notes constructor') //1
        super(props)
        this.state={
            note:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        console.log('cdm - to get note information')
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`, {
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            
            this.setState(()=>({
                note:response.data
            }))
        })
        
        
    }

    handleSubmit(formData){
        axios.put(`/notes/${this.state.note._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
               
            }else{
                this.props.history.push(`/notes/${response.data._id}`)
            }
        })

       


    }

    render(){
        console.log('notes render',this.state.note)
        return(
            <div>
                <h2>Edit notes</h2>
                <NotesForm note={this.state.note} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NotesEdit