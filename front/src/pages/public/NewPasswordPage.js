import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import CardPublicComponent from '../../components/CardPublicComponent';
import { FrontPath } from '../../util/Paths';

class ForgotPasswordPage extends React.PureComponent {
	state = {
		password: null,
		confirmPassword: null,
	};

	onChangePassword = event => {
		this.setState({ password: event.target.value });
	};

	onChangeConfirmPassword = event => {
		this.setState({ confirmPassword: event.target.value });
	};

	onClickSaveNewPassWord = () => {
		const { history } = this.props;
		history.push(FrontPath.NEW_PASSWORD_SUCCESS);
	};

	render() {
		const { password, confirmPassword } = this.state;
		return (
			<CardPublicComponent>
				<h5 className="card-title text-center">Nova senha!</h5>
				<form className="form-signin">
					<div className="form-label-group">
						<input type="email" id="inputEmail" className="form-control" placeholder="Email" disabled value="teste@teste.com.br" />
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
					<button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.onClickSaveNewPassWord}>
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

ForgotPasswordPage.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(ForgotPasswordPage);
