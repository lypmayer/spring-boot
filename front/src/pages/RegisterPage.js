import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import CardPublicComponent from '../components/CardPublicComponent';
import { FrontPath } from '../util/Paths';

class RegisterPage extends React.PureComponent {
	state = {
		email: null,
		password: null,
		confirmPassword: null,
	};

	onChangeEmail = event => {
		this.setState({ email: event.target.value });
	};

	onChangePassword = event => {
		this.setState({ password: event.target.value });
	};

	onChangeConfirmPassword = event => {
		this.setState({ confirmPassword: event.target.value });
	};

	onClickSendEmail = () => {
		const { history } = this.props;
		history.push(FrontPath.REGISTER_SUCCESS);
	};

	render() {
		const { email, password, confirmPassword } = this.state;

		return (
			<CardPublicComponent>
				<h5 className="card-title text-center">Registro de usuário!</h5>
				<form className="form-signin">
					<div className="form-label-group">
						<input type="email" id="inputEmail" value={email} className="form-control" placeholder="Email" onChange={this.onChangeEmail} required />
						<label htmlFor="inputEmail">Endereço de email</label>
					</div>
					<div className="form-label-group">
						<input type="password" id="inputPassword" value={password} className="form-control" placeholder="Password" onChange={this.onChangePassword} required />
						<label htmlFor="inputPassword">Senha</label>
					</div>
					<div className="form-label-group">
						<input type="password" id="inputPasswordConfirm" value={confirmPassword} className="form-control" placeholder="Password" onChange={this.onChangeConfirmPassword} required />
						<label htmlFor="inputPasswordConfirm">Confirmação de senha</label>
					</div>
					<button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.onClickSendEmail}>
						Enviar
					</button>
					<Link activestyle="text-primary" to={FrontPath.LOGIN}>
						Cancelar
					</Link>
				</form>
			</CardPublicComponent>
		);
	}
}

RegisterPage.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(RegisterPage);
