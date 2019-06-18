import React from 'react'
import axios from '../../config/config'
import {Link} from 'react-router-dom'

class NoteList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            notes:[]
        }
        this.handlePin = this.handlePin.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        axios.get('/notes',{
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }} )
        .then(response=>{
            console.log(response.data)
            this.setState(()=>({
                notes:response.data
            }))
        })
    }

    handlePin(note){
       note.isPinned = !note.isPinned
        axios.put(`/notes/${note._id}`,note , {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }})
        .then((response)=>{
            if(response.data.hasOwnProperty('error')){
                console.log(response.data.errors)
            }else{
                this.props.history.push('/notes')
            }
        })
        

    }

    handleDelete(note){
        axios.delete(`/notes/${note._id}` , {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }})
        .then(()=>{
            const confirm = window.confirm('are you sure?')
            if(confirm){
                this.setState((prevState)=>({notes: prevState.notes.filter(item=>{
                    return item._id !== note._id
                })
            }))
            }

        })

    }

    

    render(){
        return(
            <div>
                {/* {
                    this.state.notes.length
                } */}
                <h1>Listing Notes - {this.state.notes.length}</h1>
                <h2>Pinned</h2>
                <ul>
                {(this.state.notes.length >=1) && (this.state.notes.map(note=>{
                    return (note.isPinned === true && <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link><button onClick={()=>{
                        this.handlePin(note)
                    }}>Unpin</button><button onClick={()=>{this.handleDelete(note)}}>x</button>
                       </li>)
                }))}
                       
                </ul>
                <h2>Others</h2>
                <ul>
               
                    {(this.state.notes.length >=1) && (this.state.notes.map(note=>{
                    return (note.isPinned === false && <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link><button onClick={()=>{
                        this.handlePin(note)
                    }}>pin</button><button onClick={()=>{this.handleDelete(note)}}>x</button>
                       </li>)
                }))}
                       
                </ul>


                <Link to="notes/new">Add notes</Link>
               
            </div>
        )
    }
}

export default NoteList