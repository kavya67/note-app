import React from 'react'
import axios from '../../config/config'
import {Link} from 'react-router-dom'


class CategoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categories:[]
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    componentDidMount(){
        axios.get(`/categories`)
        .then((response)=>{
            this.setState(()=>({categories:response.data}))
        })
    }

    handleRemove(category){
        const confirm = window.confirm('Are you sure?')
        if(confirm){
            axios.delete(`/categories/${category._id}`)
            .then(()=>{
                this.setState((prevState)=>({categories: prevState.categories.filter(categoryItem=>{
                    return categoryItem._id !== category._id
                })
            }))
            })
        }

    }

    render(){
        return(
            <div>
                <h2>Listing Categories - {this.state.categories.length}</h2>
                <ul>
                    {
                        this.state.categories.map(category=>{
                            return <li key={category._id}><Link to={`categories/${category._id}`}>{category.name}</Link>  <button onClick={()=>{
                                this.handleRemove(category)
                            }}>x</button>  </li>
                        })
                    }
                </ul>
                <Link to='categories/new'>Add Category</Link>
            </div>
        )
    }
}

export default CategoryList