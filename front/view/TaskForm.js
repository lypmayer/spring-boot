import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, FormText, Jumbotron } from 'reactstrap';
import axios from 'axios';
import classNames from 'classnames';

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: null, description: null, status: null, listStatus: [], validation: { messages: [], validationMessages: [] } };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.formData = new FormData();
    }

    componentDidMount() {
        axios.get('http://localhost:8080/status')
            .then(res => {
                this.state.listStatus = res.data;
                this.forceUpdate();
            });
    }

    handleChangeTitle(e) {
        this.state.title = e.target.value;
        this.forceUpdate();
        this.formData["title"] = this.state.title;
    }

    handleChangeDescription(e) {
        this.state.description = e.target.value;
        this.forceUpdate();
        this.formData["description"] = this.state.description;
    }

    handleSelectStatus(e) {
        this.state.status = e.target.value;
        this.forceUpdate();

        let formDataStatus = new FormData();
        formDataStatus['id'] = this.state.status;

        this.formData["statusTask"] = formDataStatus;
    }

    handleSave(e) {
        axios.post('http://localhost:8080/tasks', JSON.stringify(this.formData), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);

                let code = error.response.data.code || 0;
                if (code == 1) {
                    this.state.validation = error.response.data.validation;
                    this.forceUpdate();
                }else if(code == 2){
                    alert(error.response.data.message);
                }else{
                    alert(error.message);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("aa", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }

    fillOptions() {
        let options = [];
        options.push(<option key={0} selected disabled>{'Selecione um status'}</option>);
        this.state.listStatus.forEach(status => {
            options.push(<option key={status.id} value={status.id}>{status.name}</option>);
        });

        return options;
    }

    getActiveClassState(id) {
        if (id in this.state.validation.validationMessages) {
            return classNames('form-control', 'invalid', 'is-invalid');
        } else {
            return classNames('form-control');
        }
    }

    render() {
        let view = null;    
        if (this.state.listStatus.length > 0) {
            let messages = this.state.validation.messages;

            let painelValidation = null;
            if (messages.length > 0) {
                let listSpan = [];
                messages.forEach(message => {
                    listSpan.push(<div key={message}>{message}</div>);
                });


                painelValidation = (
                    <Alert color="danger">
                        {listSpan}
                    </Alert>
                );
            }

            view = (
                <span>
                    {painelValidation}
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Titulo</Label>
                            <Input type="text" name="title" placeholder="Titulo da tarefa" className={this.getActiveClassState("title")} onChange={this.handleChangeTitle} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Descrição</Label>
                            <Input type="textarea" name="description" placeholder="Descrição da tarefa" className={this.getActiveClassState("description")} onChange={this.handleChangeDescription} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Status</Label>
                            <Input type="select" name="status" className={this.getActiveClassState("status")} onChange={this.handleSelectStatus}>
                                {this.fillOptions()}
                            </Input>
                        </FormGroup>
                    </Form>
                    <div>
                        <a href="#/list"><Button color="danger">Voltar</Button></a>{' '}
                        <Button color="success" onClick={this.handleSave}>Cadastrar</Button>
                    </div>
                </span>);
        }else{
            view = (
                <Jumbotron className="text-center">
                    <h1 className="display-3">Não é possivel criar tarefa, nenhum status registrado!</h1>
                    <p className="lead">
                        <a href="#/list"><Button color="primary">Voltar para lista</Button></a>
                    </p>
                </Jumbotron>
            );    
        }

        return (
            view
        );
    }
}

export default TaskForm;