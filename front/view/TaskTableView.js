import React from 'react';
import { Table, Button, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import fw from '../src/common/fw';
import FeedbackPanel from './widgets/FeedbackPanel';

class TaskTableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], modal: false, taskId: null};
        this.getDetails = this.getDetails.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getDetails();
    }

    toggle(e) {
        if(!this.state.modal){
            this.setState({modal: true, taskId: e.target.id});
        }else{
            this.setState({modal: false, taskId: null});
        }
    }
    
    handleDelete(e){
        if(this.state.taskId){
            this.toggle();
            axios.delete(fw.getHostUrl() + '/tasks/' + this.state.taskId, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                this.getDetails();
            })
            .catch((error) => {
                this.setState({error: error})
            });
        }
    }

    getDetails() {
        axios.get(fw.getHostUrl() + '/tasks')
        .then(response => {
            this.setState({tasks: response.data})
        })
        .catch((error) => {
            this.setState({error: error})
        });
    }

    render() {
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
        
        return (
            <span>
                <FeedbackPanel error={this.state.error}/>        
                {this.renderModal()}
                {content}
            </span>
            );
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
                        <a href={'#/edit/' + task.id}><Button color="warning">Editar</Button></a>{' '}
                        <Button color="danger" onClick={this.toggle} id={task.id}>Excluir</Button>
                    </td>
                </tr>
            );
        }

        return (
            <div>
                <h1>Lista de tarefas</h1>
                <p>
                    <a href="#/register"><Button color="success">Cadastrar Tarefa</Button></a>
                </p>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
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

    renderModal() {
        return (
        <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Excluir tarefa</ModalHeader>
            <ModalBody>
                Deseja realmente excluir a tarefa?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={this.toggle}>Não</Button>{' '}
                <Button color="success" onClick={this.handleDelete}>Sim</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default TaskTableView;