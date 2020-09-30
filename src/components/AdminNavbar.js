import React, { Component } from 'react'
import { Button, NavbarToggler, Nav, NavItem, NavLink,Collapse } from 'reactstrap'
import './AdminNavBar.css';
import { withRouter } from 'react-router-dom'


export default class AdminNavbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             sidenavbar:false
        }
    }
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <div class="ad">
            <div className="tophead">
                <div className="brand">
                    MOVIE SEARCH ENGINE
                    </div>
                <div>
                </div>
                <div className="sidenavbar" id="sidenav">
                <NavbarToggler onClick={this.toggle} />
            
                    <Nav className='mr-auto' navbar>
                     
                        <NavItem >
                            <NavLink color='primary' href='/addproduct'>AddProduct</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/addcategory'>Add Category</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/profile'>User Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button color='danger' onClick={this.handleLogout}> Logout</Button>
                        </NavItem>
                    </Nav>
          
                </div>
            
                
            </div>
            </div>
           
            
        )
       
    }
}
