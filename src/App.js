import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';
import NotFound from './components/NotFound';


class App extends Component {

  constructor() {
    super();
    this.state = {
      pictures: [], // Array to store the results when using the search feature
      javascript: [], // Array to store the results when clicking the JavaScript button in the Nav 
      foxes: [],
      cats: [],
      loading: true,
      searchKey: '' // Value of what has been searched for
    }
  }

  // Request data for the the tree topics
  componentDidMount(){
    this.performSearch('cats');
    this.performSearch('foxes');
    this.performSearch('javascript');
  }

  /**
   * Fetch data from the Flickr API using Axios and set the App component state based on the search term 
   * @param {string} query  - the search term
   */
  performSearch = (query) => {
    this.setState({loading: true, searchKey: query});
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      if (['javascript', 'foxes', 'cats'].includes(query) ){
        this.setState({
          [query]: response.data.photos.photo,
          loading: false
        })
      } else{
      this.setState({
        pictures: response.data.photos.photo,
        loading: false
      })
    }
    })
    .catch(error => {
      console.log('There was an error with fetching and parsing the data.', error);
    })
  }


  render () {
    return (
      <BrowserRouter>
        <div className="container">
            <SearchForm onSearch={this.performSearch} />
            <Nav />
            <Switch>
              <Route exact path={'/'} render={() => <PhotoContainer loading={this.state.loading} data={this.state.cats} question={'Cats'}/>} />
              <Route exact path="/search/cats" render={() => <PhotoContainer loading={this.state.loading} data={this.state.cats} question={'Cats'} />} /> 
              <Route exact path="/search/foxes" render={() => <PhotoContainer loading={this.state.loading} data={this.state.foxes} question={'Foxes'} />} />
              <Route exact path="/search/javascript" render={() => <PhotoContainer loading={this.state.loading} data={this.state.javascript} question={'JavaScript'} />} />
              <Route exact path="/search/:query" render={() => <PhotoContainer loading={this.state.loading} data={this.state.pictures} question={this.state.searchKey} />} />
              <Route component={NotFound} />
            </Switch>  
        </div>
      </BrowserRouter>
    ); 
  }
}

export default App;
