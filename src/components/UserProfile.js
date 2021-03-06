import React, { Component } from 'react'
import Navigation from './Navigation'
import Axios from 'axios'
import { Form, FormGroup, Button, Label, CustomInput, Container } from 'reactstrap'
import FileUploadButton from './FileUploadButton'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    user: { ...this.state.user, image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/users/me', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        this.props.history.push('/addproduct');
    }

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    render() {
        if (this.state.user === null) {
            return <h3>Loading ...</h3>
        } else {
            return (
                <div>
                    <Navigation />
                    <Container className='mt-4'>
                        <Form align='center'>
                            <FormGroup>
                                <Label for='firstname'>First Name:</Label>
                                <input type='text'
                                    id="firstname"
                                    name='firstname'
                                    value={this.state.user.firstname}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='lastname'>Last Name:</Label>
                                <input type='text' id='lastname'
                                    name='lastname'
                                    value={this.state.user.lastname}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='address'>Address:</Label>
                                <input type='text' id='address'
                                    name='address'
                                    value={this.state.user.address}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='phoneno'>Phone Number:</Label>
                                <input type='text' id='phoneno'
                                    name='phoneno'
                                    value={this.state.user.phoneno}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='email'>E-mail:</Label>
                                <input type='text' id='email'
                                    name='email'
                                    value={this.state.user.email}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                            <Label for='image'>Image:</Label>
                                <img className='img-thumbnail'
                                    width='100' src={`http://localhost:3001/uploads/${this.state.user.image}`}
                                    alt="profile" />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <Button color='secondary' onClick={this.updateUser} block>Update User</Button>
                        </Form>
                    </Container>
                </div>
            )
        }
    }
}
