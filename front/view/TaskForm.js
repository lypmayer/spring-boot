import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: null, description: null, status: null, listStatus: []};

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.formData = new FormData();
        //this.props.match.params.id
    }

    componentDidMount() {
        var authOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            json: true
          };

        axios.get('http://localhost:8080/status', {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }})
        .then(res => {
          this.setState({listStatus: res.data});
        })
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
        this.formData["status"] = this.state.status;
    }

    handleSave(e){
        console.log(this.state);
        let form = this.formData;
        
        axios.post('http://localhost:8080/tasks', {form})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }

    render() {
        //console.log(this.props.match.params.id);
        console.log(this.state);
        return (
            <span>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Titulo</Label>
                        <Input type="text" name="title" placeholder="Titulo da tarefa"  onChange={this.handleChangeTitle} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Descrição</Label>
                        <Input type="textarea" name="description" placeholder="Descrição da tarefa" onChange={this.handleChangeDescription}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Status</Label>
                        <Input type="select" name="status" onChange={this.handleSelectStatus}>
                            <option selected disabled>Selecione um status</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                </Form>
                <div>
                    <a href="#/list"><Button color="danger">Voltar</Button></a>{' '}
                    <Button color="success"  onClick={this.handleSave}>Cadastrar</Button>
                </div>
        </span>
        );
    }
}

export default TaskForm;