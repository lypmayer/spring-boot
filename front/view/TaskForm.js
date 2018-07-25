import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    Link
  } from 'react-router-dom'

  import {withRouter} from "react-router-dom";

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(e){
        console.log(e);
        this.props.history.push('/list');
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Titulo</Label>
                    <Input type="text" name="title" placeholder="Titulo da tarefa" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Descrição</Label>
                    <Input type="textarea" name="description" placeholder="Descrição da tarefa"/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Status</Label>
                    <Input type="select" name="status">
                        <option selected disabled>Selecione um status</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <div>
                    <Link to="/list">
                        <Button color="danger">Voltar</Button>{' '}
                    </Link>
                    
                    <Button color="success"  onClick={this.handleSave}>Cadastrar</Button>
                </div>
            </Form>
        );
    }
}

export default TaskForm;