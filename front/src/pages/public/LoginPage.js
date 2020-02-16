import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CardPublicComponent from '../../components/CardPublicComponent';
import { FrontPath } from '../../util/Paths';

class LoginPage extends React.PureComponent {
	state = {
		email: null,
		password: null,
	};

	onChangeEmail = event => {
		this.setState({ email: event.target.value });
	};

	onChangePassword = event => {
		this.setState({ password: event.target.value });
	};

	onClickLogin = () => {
		const { history } = this.props;
		history.push(FrontPath.HOME);
	};

	onClickRegister = () => {
		const { history } = this.props;
		history.push(FrontPath.REGISTER);
	};

	render() {
		return (
			<CardPublicComponent>
				<h5 className="card-title text-center">Login</h5>
				<form className="form-signin">
					<div className="form-label-group">
						<input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.onChangeEmail} required />
						<label htmlFor="inputEmail">Endereço de email</label>
					</div>

					<div className="form-label-group">
						<input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.onChangePassword} required />
						<label htmlFor="inputPassword">Senha</label>
					</div>
					<button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.onClickLogin}>
						Login
					</button>
					<button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.onClickRegister}>
						Registre-se
					</button>
					<Link activestyle="text-primary" to={FrontPath.FORGOT_PASSWORD}>
						Esqueci minha senha
					</Link>
				</form>
			</CardPublicComponent>
		);
	}
}

LoginPage.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
