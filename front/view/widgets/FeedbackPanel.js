import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, FormText, Jumbotron } from 'reactstrap';
import axios from 'axios';
import classNames from 'classnames';

class FeedbackPanel extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        let content = null;    

        let error = this.props.error;
        if(error){
            let listDiv = [];
            if(error.response){
                let code = error.response.data.code || 0;
                if (code == 1) {
                    let validation = error.response.data.validation;
                    if (validation.messages.length > 0) {
                        listDiv.push(<h1 key={0}>{'Validação'}</h1>);
                        validation.messages.forEach(message => {listDiv.push(<div key={message}>{message}</div>);});
                    }
                }else if(code == 2){
                    listDiv.push(<div key={0}>{'Erro de serviço: ' + error.response.data.message}</div>);
                }else{
                    listDiv.push(<div key={0}>{'Erro de serviço: ' + error.message}</div>);
                }
            }else if (error.request) {
                listDiv.push(<div key={0}>{'Ocorreu um erro: ' + error.request}</div>);
            }else{
                 listDiv.push(<div key={0}>{'Ocorreu um erro: ' + error.message}</div>);
            }

            content = (
                <Alert color="danger">
                    {listDiv}
                </Alert>
            );
        }

        return (
            content
        );
    }
}

export default FeedbackPanel;