import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, FormText, Jumbotron } from 'reactstrap';
import classNames from 'classnames';
import axios from 'axios';
import fw from '../src/common/fw';
import FeedbackPanel from './widgets/FeedbackPanel';
import {hashHistory} from 'react-router';

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {taskId: this.props.params.id, title: null, description: null, status: null, task: null, listStatus: [], validation: { messages: [], validationMessages: [] } };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleSaveUpdate = this.handleSaveUpdate.bind(this);
    }

    componentDidMount() {
        axios.get(fw.getHostUrl() + '/status')
        .then(response => {
            this.state.listStatus = response.data;
            this.forceUpdate();

            if(this.state.taskId){
                axios.get(fw.getHostUrl() + '/tasks/' + this.state.taskId)
                .then(response => {
                    this.state.task = response.data;
                    this.state.title = this.state.task.title;
                    this.state.description = this.state.task.description;
                    this.state.status = this.state.task.statusTask.id;
                    this.forceUpdate();
                })
                .catch((error) => {
                    this.setState({error: error});
                });
            }
        })
        .catch((error) => {
            this.setState({error: error});
        });    
    }

    handleChangeTitle(e) {
        this.state.title = e.target.value;
        this.forceUpdate();
    }

    handleChangeDescription(e) {
        this.state.description = e.target.value;
        this.forceUpdate();
    }

    handleSelectStatus(e) {
        this.state.status = e.target.value;
        this.forceUpdate();
    }

    handleSaveUpdate(e) {
        let formDataStatus = new FormData();
        formDataStatus['id'] = this.state.status;

        let formData = new FormData();
        formData["title"] = this.state.title;
        formData["description"] = this.state.description;
        formData["statusTask"] = formDataStatus;

        if(this.state.task){
            formData["id"] = this.state.task.id;

            axios.put(fw.getHostUrl() + '/tasks', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                hashHistory.push('#/list');
            })
            .catch((error) => {
                this.setState({error: error})
            });
        }else{
            axios.post(fw.getHostUrl() + '/tasks', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                hashHistory.push('#/list');
            })
            .catch((error) => {
                this.setState({error: error})
            });
        }
        
    }

    fillOptions() {
        let options = [];
        options.push(<option key={0} selected disabled value={0}>{'Selecione um status'}</option>);
        this.state.listStatus.forEach(status => {
            options.push(<option key={status.id} value={status.id}>{status.name}</option>);
        });

        return options;
    }

    getActiveClassState(id) {
        return fw.getActiveClassState(this.state.error, id);
    }

    render() {
        let view = null;    
        if (this.state.listStatus.length > 0) {
            view = (
                <span>
                    <FeedbackPanel error={this.state.error}/>
                    <Form>
                        <FormGroup>
                            <Label>Título</Label>
                            <Input type="text" name="title" placeholder="Titulo da tarefa" className={this.getActiveClassState("title")} onChange={this.handleChangeTitle} value={this.state.title || ""} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Descrição</Label>
                            <Input type="textarea" name="description" placeholder="Descrição da tarefa" className={this.getActiveClassState("description")} onChange={this.handleChangeDescription} value={this.state.description || ""} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Input type="select" name="status" className={this.getActiveClassState("status")} onChange={this.handleSelectStatus} value={this.state.status || 0}>
                                {this.fillOptions()}
                            </Input>
                        </FormGroup>
                    </Form>
                    <div>
                        <a href="#/list"><Button color="danger">Voltar</Button></a>{' '}
                        <Button color="success" onClick={this.handleSaveUpdate}>{this.state.task ? 'Editar' : 'Cadastrar'}</Button>
                    </div>
                </span>);
        }else{
            view = (
                <Jumbotron className="text-center">
                    <h1 className="display-3">Não é possivel criar uma tarefa, nenhum status registrado!</h1>
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