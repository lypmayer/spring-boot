import React from 'react';
import { Table, Button, Jumbotron } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

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
        console.log(e);
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails() {
        console.log("222");
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

        /*
        .then(function (response) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(function (json) {
                    return json;
                });
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        })*/
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
                        <Button color="warning" onClick={this.handleEdit}>Editar</Button>{' '}
                        <Button color="danger" onClick={this.handleDelete}>Excluir</Button>
                    </td>
                </tr>
            );
        }

        return (
            <div>
                <h1>Lista de tasks</h1>
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