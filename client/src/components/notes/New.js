import React from 'react'
import axios from '../../config/config'
import NotesForm from './Form'

class NotesNew extends React.Component{

    constructor(props){
        console.log('add const')
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData){
        console.log(formData)
        axios.post('/notes',formData, {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            //change from one component to another i.e Form to New
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
              
            }else{
                this.props.history.push(`/notes`)
            }
        })
    }
    render(){
        console.log('add render')
       
        return(
            <div>
                <h1>add notes</h1>
                <NotesForm handleSubmit={this.handleSubmit}/>
                
            </div>
        )
    }
}

export default NotesNew