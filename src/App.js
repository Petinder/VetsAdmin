import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from 'semantic-ui-react'
import './App.css';
import FileUpload from './FileUpload';
import { Route } from "react-router-dom";
import IngrA from "./components/pages/IngreA";


class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      picturesAnun: [],
      picturesVet: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleUploadAnuncios = this.handleUploadAnuncios.bind(this);
    this.handleUploadVet = this.handleUploadVet.bind(this);
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('picturesA').on('child_added', snapshot => {
      this.setState({
        picturesAnun: this.state.picturesAnun.concat(snapshot.val()),
        picturesVet: this.state.picturesVet.concat(snapshot.val())
      });
    });
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUploadAnuncios (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`fotosA/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.error(error.message);
    }, () => {
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      }
      const dbRef = firebase.database().ref('picturesA');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }


  handleUploadVet (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`fotosV/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.error(error.message);
    }, () => {
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      }
      const dbRef = firebase.database().ref('picturesV');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  renderLoginButton () {
    if (!this.state.user) {
      return (
        <button onClick={this.handleAuth} className="App-btn">
          Iniciar sesión con Google
        </button>
      );
    } else  {
      return (
        <div className="App-intro">
          <p className="App-intro">¡Hola, { this.state.user.displayName }!</p>

          <button onClick={this.handleLogout} className="App-btn">
            Salir
          </button>
          <h1>Anuncios</h1>
          <FileUpload onUpload={ this.handleUploadAnuncios}/>
          {/* {
            this.state.picturesAnun.map(picturesAnun => (
              <div className="App-card">
                <figure className="App-card-image">
                  <h2>Anucios Ingresados</h2>
                  <img width="320" src={picturesAnun.image} />
                  <figCaption className="App-card-footer">
                    <img className="App-card-avatar" src={picturesAnun.photoURL} alt={picturesAnun.displayName} />
                    <span className="App-card-name">{picturesAnun.displayName}</span>
                  </figCaption>
                </figure>
              </div>
            )).reverse()
          } */}
          <h1>Vets</h1>
          <FileUpload onUpload={ this.handleUploadVet}/>
          {/* {
            this.state.picturesVet.map(picturesVet => (
              <div className="App-card">
                <figure className="App-card-image">
                  <h2>Vets Ingresados</h2>
                  <img width="320" src={picturesVet.image} />
                  <figCaption className="App-card-footer">
                    <img className="App-card-avatar" src={picturesVet.photoURL} alt={picturesVet.displayName} />
                    <span className="App-card-name">{picturesVet.displayName}</span>
                  </figCaption>
                </figure>
              </div>
            )).reverse()
          } */}
  
        </div>

      );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Petynder Vets Admin</h2>
        </div>
        { this.renderLoginButton() }
      </div>
    );
  }
}

export default App;
