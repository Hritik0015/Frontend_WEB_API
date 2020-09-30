import React, { Component } from 'react'
import Navigation from './Navigation'
import { Button, Form, FormGroup, Label, Input, Container, FormText, CustomInput, ListGroup, ListGroupItem } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'


export default class AddCategory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoryId: '',
            categorys: [],
            category:'',
            image:'',
            selectedfile: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }    
            },
            isUpdate: false,
            isEdit:false
        }
    }
        

    componentDidMount() {
        axios.get('http://localhost:3001/users/categories', this.state.config)
        .then((response)=> {
            this.setState({
                categorys: response.data
            })
        })
    }
    handleChange =(e) => {
            this.setState({
               
                  [e.target.name]: e.target.value
                
            })
        }
        submitCategory = (e) => {
            e.preventDefault()
            if (this.state.category === '') {
                this.setState({
                    isUpdate: false
                })
                return
            }
            if (this.state.isUpdate) {
                axios.put(`http://localhost:3001/users/categories/${this.state.categoryId}`,
                    { category: this.state.category }, this.state.config)
                    .then((response) => {
                        const updatedCategory = this.state.categorys.map((category) => {
                            if (category._id === this.state.categoryId) {
                                category.category = this.state.category
                                category.image= this.state.image
                               
                            }
                            return category
                        })
                        this.setState({
                            categorys: updatedCategory,
                            category: '',
                            image:'',
                            selectedfile: null,
                            isUpdate: false
                        })
                    }).catch((err) => console.log(err.response))
    
            } else {
                axios.post(`http://localhost:3001/users/categories`,
                    { category: this.state.category }, this.state.config)
                    .then((response) => {
                        this.setState({
                            categorys: [...this.state.categorys, response.data],
                            category: ''
                        })
                    }).catch((err) => console.log(err.response));
            }
        }


        handleFileSelect = (e) => {

            this.setState({
                selectedFile: e.target.files[0]
            })
        }

        uploadFile = (e) => {
            e.preventDefault()
            const data = new FormData()
            data.append('myFile', this.state.selectedFile)
            axios.post('http://localhost:3001/upload', data)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        image: response.data.filename
    
                    })
                }).catch((err) => console.log(err.response))
        }

        addCategory = (e) => {
            e.preventDefault();
            axios.post('http://localhost:3001/users/categories',this.state,this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    categorys: [...this.state.categorys, response.data]
                })
            }
            )
            .catch((err) => 
            console.log(err.response))
        }
        editCategory = (categoryId) => {
            const choice = this.state.categorys.find((category => category._id === categoryId))
            this.setState({
                category: choice.category,
                image:choice.image,
                categoryId: categoryId,
                isUpdate: true,
                isEdit:true
            })
        }
        deleteCategory = (categoryId) => {
            axios.delete(`http://localhost:3001/users/categories/${categoryId}`, this.state.config)
                .then((response) => {
                    const filteredCategory = this.state.categorys.filter((category) => {
                        return category._id !== categoryId
                    })
                    this.setState({
                        categorys: filteredCategory
                    })
                }).catch((err) => console.log(err.response));
        }

    

        render() {
            const {isEdit,handleCategorytUpdate,addCategory}= this.props
        return (
            <React.Fragment>
                <Navigation />
            <Container>
                <h2 align="center">Add Genere</h2>
                <form onSubmit={this.submitCategory}>
                    <FormGroup>
                        <Label for='CategoryName'>Genere Name</Label>
                        <Input type='text' name='category' id='category'
                            value={this.state.category} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='CategoryImage'>Genere Image</Label>
                        <input type='file' name="image" width='150' id='image' onChange={this.handleFileSelect}
                                   />
                            <button class="btn btn-info" onClick={this.uploadFile}>Upload image</button> 
                    </FormGroup>
                   
                
                    {
                        (this.state.isEdit) ? <Button color='success' block 
                            onClick={this.handleCategoryUpdate}>UpdateCategory</Button> :
                            <Button color='secondary' block
                                onClick={this.addCategory}>AddCategory</Button>
                    }

                </form>


                <ListGroup>
                   
                        {
                            this.state.categorys.map((category)=> {
                                return (<ListGroupItem key={category._id} color='secondary' className='d-flex justify-content-between align-items-center'>
                                    <td>{category.category}</td>
                                
                                    <td> <img className='img-thumbnail'
                                    width='50' src={`http://localhost:3001/uploads/${this.state.image}`}
                                    alt="profile" /></td>
                                    <Button color='secondary' size='sm' onClick={() => this.editCategory(category._id)}>Edit</Button>
                                    <Button color='danger' size='sm' onClick={() => this.deleteCategory(category._id)}>Delete</Button>
                                </ListGroupItem>)
                            })
                        }
                    
                   
                </ListGroup>
            </Container>
            </React.Fragment>
        )
    }
}