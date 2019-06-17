import React from 'react'
import CategoryForm from './CForm'
import axios from '../../config/config';

class CategoryNew extends React.Component{
    constructor(props){
        super(props)
    
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    handleSubmit(formData){
        axios.post(`/categories`,formData)
        .then(()=>{
            this.props.history.push('/categories')
        })
        

    }

    render(){
        return(
            <div>
                <CategoryForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
    
}
export default CategoryNew