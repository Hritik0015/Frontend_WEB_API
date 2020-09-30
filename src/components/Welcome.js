import React from 'react'
import {
    Container,  Card, CardImg, CardText, CardBody,
    CardTitle,  Button
} from 'reactstrap'
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';


export default () => (
   <React.Fragment>
       <Header />
   
    <Container>
    <br></br>
                    <br></br>
                    <br></br>
  <div>

    { /*Main jumbotron for a primary marketing message or call to action*/ }
    <div className="jumbotron">
      <h1 className="display-3">Movie Search Engine</h1>
      <p>This is a movie buying website. Here, you can see the movies and also search of your needs.</p>
      <p align="right"><Link className="btn btn-info btn-lg" to="/login" role="button">See movies list &raquo;</Link></p>
    </div>

    { /*Example row of columns*/ }
    <div className="row text-justify">
      <div className="col-md-4">
      <h3>New Arrival</h3>
      <Card>
      <CardImg top width="100%" src={require('../pics/IT_Movie.jpg')} alt="Card image cap" />
        
        <CardBody>
        <CardTitle>IT (2017)</CardTitle>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <Button color='success' href='/login'>More Info</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
        <h3>Coming Soon</h3>
        <Card>
        <CardImg top width="100%" src={require('../pics/peaky.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Peaky Blinders</CardTitle>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <Button color='secondary' href='/login'>More Info</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
        <h3>Restocked(Limited Edition)</h3>
        <Card>
        <CardImg top width="100%" height="230px"src={require('../pics/breakingbad.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Breaking Bad</CardTitle>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <Button color='secondary' href='/login'>More Info</Button>
        </CardBody>
      </Card>
      </div>
    </div>

    { /*Example row of columns*/ }
    <div className="row text-justify">
      <div className="col-md-4">
      <h3>You May also Like</h3>
      <Card>
      <CardImg top width="100%" src={require('../pics/tangled.jpg')} alt="Card image cap" />
        
        <CardBody>
        <CardTitle>Tangled</CardTitle>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <Button color='secondary' href='/login'>More Info</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
      <h3>You May also Like</h3>
        <Card>
        <CardImg top width="100%" src={require('../pics/tbbt.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>The Big Bang Theory</CardTitle>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <Button color='secondary' href='/login'>More Info</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
      <h3>You May also Like</h3>
        <Card>
        <CardImg top width="100%" height="230px"src={require('../pics/annabelle.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Annabelle</CardTitle>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <Button color='secondary' href='/login'>More Info</Button>
        </CardBody>
      </Card>
      </div>
    </div>
  
  </div>
  <Footer />
  </Container>

  
  </React.Fragment> 


);