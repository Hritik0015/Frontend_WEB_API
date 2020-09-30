import React, { Component } from 'react'
import Navigation from './Navigation'
import { Button, Form, FormGroup, Label, Input, Container, FormText, CustomInput, ListGroup, ListGroupItem } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'


export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
           
            productId: '',
            products: [],
            productname:'',
            productdesc:'',
            rate:'',
            productimg:'',
            selectedfile: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }    
            },
            isUpdate: false,
            isEdit:false
        }
    }
        

    componentDidMount() {
        axios.get('http://localhost:3001/users/product', this.state.config)
        .then((response)=> {
            this.setState({
                products: response.data
            })
        })
    }

    handleChange =(e) => {
            this.setState({
               
                  [e.target.name]: e.target.value
                
            })
        }
        submitProduct = (e) => {
            e.preventDefault()
            if (this.state.productname === '') {
                this.setState({
                    isUpdate: false
                })
                return
            }
            if (this.state.isUpdate) {
               
                axios.put(`http://localhost:3001/users/product/${this.state.productId}`,
                    { product: this.state.productname }, this.state.config)
                    .then((response) => {
                        const updatedProduct = this.state.products.map((product) => {
                            if (product._id === this.state.productId) {
                                product.productname = this.state.productname
                                product.productdesc= this.state.productdesc
                                product.rate = this.state.rate
                                product.productimg = this.state.productimg
                            }
                            return product
                        })
                        this.setState({
                        
                            products: updatedProduct,
                            productname: '',
                            productdesc:'',
                            rate:'',
                            productimg:'',
                            selectedfile: null,
                            isUpdate: false
                        })
                    }).catch((err) => console.log(err.response))
    
            }
        }
            // else {
            //     axios.post(`http://localhost:3001/users/product`,
            //         { product: this.state.productname }, this.state.config)
            //         .then((response) => {
            //             this.setState({
            //                 products: [...this.state.products, response.data],
            //                 productname: ''
            //             })
            //         }).catch((err) => console.log(err.response));
            // }
    //     }
    //     handleProductUpdate = (productId) => {
        
    //         axios.put(`http://localhost:3001/users/product/${this.state.productId}`,
    //                     { product: this.state.productname }, this.state.config)
    //                     .then((response) => {
    //                         const updatedProduct = this.state.products.map((product) => {
    //                             if (product._id === this.state.productId) {
    //                                 product.productname = this.state.productname,
    //                                 product.productdesc= this.state.productdesc,
    //                                 product.rate = this.state.rate,
    //                                 product.productimg=this.state.productimg
    //                             }
                            
    //                             return product
    //                         })
    //                         this.setState({
    //                             products: updatedProduct,
    //                             productname: '',
    //                             productdesc:'',
    //                             rate:'',
    //                             productimg:'',
    //                             selectedfile: null,
    //                             isUpdate: false
    //                         })
    //                     }).catch((err) => console.log(err.response))  
    // }
 


        handleFileSelect = (e) => {
           
            this.setState({
                selectedFile: e.target.files[0]
            })
        }

        uploadFile = (e) => {
            e.preventDefault();
           
            const data = new FormData()
            data.append('myFile', this.state.selectedFile)
            axios.post('http://localhost:3001/upload', data)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        productimg: response.data.filename
    
                    })
                }).catch((err) => console.log(err.response))
        }

        addProduct = (e) => {
            e.preventDefault();
            axios.post('http://localhost:3001/users/product',this.state,this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    products: [...this.state.products, response.data]
                })
            }
            )
            .catch((err) => 
            console.log(err.response))
        }
        editProduct = (productId) => {
            const choice = this.state.products.find((product => product._id === productId))
            this.setState({
                productname: choice.productname,
                productdesc: choice.productdesc,
                rate:choice.rate,
                productimg:choice.productimg,
                productId: productId,
                isUpdate: true,
                isEdit:true
            })
        }
        deleteProduct = (productId) => {
            axios.delete(`http://localhost:3001/users/product/${productId}`, this.state.config)
                .then((response) => {
                    const filteredProduct = this.state.products.filter((product) => {
                        return product._id !== productId
                    })
                    this.setState({
                        products: filteredProduct
                    })
                }).catch((err) => console.log(err.response));
        }

    

        render() {
            const {isEdit,handleProductUpdate,addProduct,categorys}= this.props
        return (
            <React.Fragment>
                <Navigation />
            <Container>
                <h2 align="center">Add Movie</h2>
                <Form onSubmit={this.submitProduct}>
                    <FormGroup>
                        <Label for='ProductName'>Movie Name</Label>
                        <Input type='text' name='productname' id='productname'
                            value={this.state.productname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='ProductDescription'>Movie Description</Label>
                        <Input type='text' name='productdesc' id='productdesc'
                            value={this.state.productdesc} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='Rate'>Rate</Label>
                        <Input type='text' name='rate' id='rate'
                            value={this.state.rate} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='ProductImage'>Movie Poster</Label>
                        <input type='file' name="productimg" width='150' id='profilePic' onChange={this.handleFileSelect}
                                   />
                            <button class="btn btn-info" onClick={this.uploadFile}>Upload image</button> 
                    </FormGroup>
                    
                  
                   
                
                    {
                        (this.state.isEdit) ? <Button color='info' block
                            onClick={this.handleProductUpdate}>UpdateProduct</Button> :
                            <Button color='secondary' block
                                onClick={this.addProduct}>AddProduct</Button>
                    }

                </Form>


                <ListGroup>
                   
                        {
                            this.state.products.map((product)=> {
                                return (<ListGroupItem key={product._id} color='secondary' className='d-flex justify-content-between align-items-center'>
                                    <td>{product.productname}</td>
                                    <td>
                                        {product.productdesc}
                                    </td>
                                    <td>
                                        {product.rate}
                                    </td>
                                    <td> <img className='img-thumbnail'
                                    width='50' src={`http://localhost:3001/uploads/${this.state.productimg}`}
                                    alt="profile" /></td>
                                    <Button color='secondary' size='sm' onClick={() => this.editProduct(product._id)}>Edit</Button>
                                    <Button color='danger' size='sm' onClick={() => this.deleteProduct(product._id)}>Delete</Button>
                                </ListGroupItem>)
                            })
                        }
                    
                   
                </ListGroup>
            </Container>
            </React.Fragment>
        )
    }
}