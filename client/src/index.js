import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import _ from 'lodash'

//notes
import NotesList from './components/notes/List'
import NotesShow from './components/notes/Show'
import NotesNew from './components/notes/New'
import NotesEdit from './components/notes/Edit'
import NoteRegister from './components/notes/Register'
import NoteLogin from './components/notes/Login'
import NoteAccount from './components/notes/Account'
import NoteLogout from './components/notes/logout';


//Categories

import CategoryList from './components/categories/CList'
import CategoryNew from './components/categories/CNew';
import CategoryEdit from './components/categories/CEdit'
import CategoryShow from './components/categories/CShow'






class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
          isAuthenticated:false //updating state from different components
        }
      }
      handleAuth=(bool)=>{
        console.log('am hadle')
        this.setState({isAuthenticated:bool})
      }

      //when i reload the page componentdidmount will happen by state is false, in my view it is showing true
      componentDidMount(){
        // console.log('componentdidmount'+this.state.isAuthenticated)
        if(localStorage.getItem('userAuthToken')){
          this.setState({isAuthenticated:true})
          // console.log('am in')

        }
      }
    render(){
        return(
            <BrowserRouter>
                <div>
                    <h1>My note app</h1>

                    <ul>
                    {this.state.isAuthenticated && (
                    <div>
                        <li><Link to='users/account'>Account</Link></li>
                        <li><Link to='users/logout'>Logout</Link></li>
                        <Link to ="/notes">List Notes</Link><br/>
                        <Link to="/categories">List Categories</Link>

                        </div>
                    )}
                    {!this.state.isAuthenticated && (
                        <div>
                        <li><Link to="/users/register">Register</Link><br/></li>
                        <li><Link to="/users/login">Login</Link><br/></li>
                        </div>
                    )}
                    </ul>
                    
                    
                    
                    <Switch>
                    {/* logged out routes */}
                    {!this.state.isAuthenticated && (
                    <div>
                        <Route path="/users/register" component={NoteRegister} exact={true}/>
                        <Route path="/users/login" render={(props)=>{
                        return <NoteLogin {...props } handleAuth={this.handleAuth}/>
                    }} exact={true}/>
                    </div>
                    )}
                    {/* <logged in router */}
                    {this.state.isAuthenticated &&(
                    <div>
                    <Route path="/users/account" component={NoteAccount} exact/>
                    <Route path="/notes" component={NotesList} exact={true}/>
                    <Route path="/notes/new" component={NotesNew}/>
                    <Route path="/notes/edit/:id" component={NotesEdit} exact={true}/>
                    <Route path="/categories/edit/:id" component={CategoryEdit}/>
                    <Route path="/categories/new" component={CategoryNew}/> 
                    <Route path="/categories/:id" component={CategoryShow}/>
                    <Route path="/notes/:id" component={NotesShow} exact/>
                    <Route path="/categories" component={CategoryList}/> 
                    <Route path="/users/logout" render={(props)=>{
                    return <NoteLogout {...props} handleAuth={this.handleAuth}/> }} exact={false}/>
                    </div>
                    )}
                    
                    </Switch>
                            </div>
                        </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))