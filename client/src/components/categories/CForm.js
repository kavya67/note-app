import React from 'react'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:''
        }
        this.handleName = this.handleName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName(e){
        e.persist()
        this.setState(()=>({[e.target.name]: e.target.value}))


    }
    
    handleSubmit(e){
        e.preventDefault()
        const formData = {
            name:this.state.name
        }

        this.props.handleSubmit(formData)
    }
    render(){
        return(
            <div>
                <h2>Add Category</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input type = 'text' onChange={this.handleName} name= 'name' value = {this.state.value}/>
                    </label>
                    <label>
                        <input type='submit'/>
                    </label>
                </form>
            </div>
        )
    }
}

export default CategoryForm