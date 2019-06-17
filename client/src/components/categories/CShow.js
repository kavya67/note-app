import React from 'react'
import axios from '../../config/config'
import {Link} from 'react-router-dom'
class CategoryShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category:{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/categories/${id}`)
        .then(response=>{
            console.log(response.data)
            this.setState(()=>({
                category:response.data
            }))
        })

    }

    render(){
        console.log(this.state.category.notes)
        return(
            <div>
               <h2> Lisiting notes </h2>
             {this.state.category.notes && (
                 <ul>
                     {this.state.category.notes.map(note=>{
                       return <li key={note._id}>{note.title} - {note.body}</li>
                   })}
                 </ul>
             )}
             <Link to="/categories">back</Link>
            </div>
        )
    }
}

export default CategoryShow