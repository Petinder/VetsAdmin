import React from 'react';
import AnunForm from "../forms/AnunForm";

class AnunPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <h1>Anuncios!</h1>
            <AnunForm submit={this.submit} />
           </div> 
        );
    }
}

export default AnunPage;