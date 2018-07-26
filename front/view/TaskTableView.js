import React from 'react';
import { Table, Button, Jumbotron } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

class TaskTableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.getDetails = this.getDetails.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit(e){
        console.log(e);
    }
    
    handleDelete(e){
        axios.delete('http://localhost:8080/tasks/' + e.target.id, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            this.getDetails();
        })
        .catch((error) => {
            // Error
            if (error.response) {
                let code = error.response.data.code || 0;
                if (code == 1) {
                    this.state.validation = error.response.data.validation;
                    this.forceUpdate();
                }
                console.log("aaaaaa", error.response);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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

    componentDidMount() {
        this.getDetails();
    }

    getDetails() {
        const URL_TO_FETCH = 'http://localhost:8080/tasks/';
        fetch(URL_TO_FETCH, {
            method: 'get' // opcional 
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ tasks: data });
        })
        .catch(function (object) {
            console.log(object.type, object.message)
        });
    }

    render() {
        /*
         <Link to="/register">
                        
                    </Link>
        */
        let content = (
            <Jumbotron className="text-center">
                <h1 className="display-3">Nenhuma tarefa cadastrada!</h1>
                <p className="lead">
                    <a href="#/register"><Button color="primary">Cadastrar Tarefa</Button></a>
                </p>
            </Jumbotron>
        );

        if(this.state.tasks.length > 0){
            content = this.renderTable();
        }
        
        return (content);
    }

    renderTable() {
        let listRow = [];
        let i = 0;
        for (i = 0; i < this.state.tasks.length; i++) {
            let task = this.state.tasks[i];
            listRow.push(
                <tr key={i}>
                    <th scope="row">{task.id}</th>
                    <td>{task.title}</td>
                    <td>{task.statusTask.name}</td>
                    <td>
                        <Button color="warning" onClick={this.handleEdit} id={task.id}>Editar</Button>{' '}
                        <Button color="danger" onClick={this.handleDelete} id={task.id}>Excluir</Button>
                    </td>
                </tr>
            );
        }

        return (
            <div>
                <h1>Lista de tarefas</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRow}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TaskTableView;