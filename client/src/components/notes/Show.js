import React from 'react'
import axios from '../../config/config'
import {Link} from 'react-router-dom'

class NotesShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note:{}
        }
        this.handleRemove = this.handleRemove.bind(this)
        this.handleRemoveTag=this.handleRemoveTag.bind(this)
        this.handleCopy = this.handleCopy.bind(this)
        
    }

    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/notes/${id}` ,  {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }})
        .then(response=>{
            this.setState(()=>({note:response.data}))
        })
    }

    handleRemove(){
        const id = this.props.match.params.id
        const confirmRemove = window.confirm('Are you sure?')
        if(confirmRemove){
            axios.delete(`/notes/${id}` , {
                headers: {
                    'x-auth': localStorage.getItem('userAuthToken')
                }})
            .then(()=>{
                this.props.history.push('/notes')
            })
        }

    }

    handleRemoveTag(tag){
        const id=this.props.match.params.id
        axios.delete(`/notes/removeTag?noteId=${id}&tagId=${tag._id}` , {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }})
        .then(response=>{
            this.setState(()=>({
                note:response.data
            }))
        })
      
    }

    handleCopy(){
        const formData = {
            title: this.state.note.title,
            body: this.state.note.body,
            category: this.state.note.category,
            tags: this.state.note.tags
        }

        axios.post(`/notes`,formData , {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }})
        .then(()=>{
            this.props.history.push('/notes')
        })
    }

  
    render(){
         
        return(
            <div>
               <h2> {this.state.note.title}</h2>
               <p>{this.state.note.body}</p>
               <p>{this.state.note.category && this.state.note.category.name}</p>
               {this.state.note.tags && (
                  <ul>
                      {this.state.note.tags.map((tagItem=>{
                          return <li key={tagItem.tag._id}>{tagItem.tag.name} <button onClick={()=>{this.handleRemoveTag(tagItem)}}>x</button></li>
                      }))}
                  </ul>
              )}

               <Link to="/notes" >back</Link>
               <Link to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>

               <button onClick={this.handleRemove}>
                   Remove
               </button>
               <button onClick = {this.handleCopy}>
                   Copy
               </button>
            </div>
        )
    }
}

export default NotesShow