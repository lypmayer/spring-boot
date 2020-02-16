import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import CardPublicComponent from '../components/CardPublicComponent';
import { FrontPath } from '../util/Paths';

class ForgotPasswordPage extends React.PureComponent {
	state = {
		email: null,
	};

	onChangeEmail = event => {
		this.setState({ email: event.target.value });
	};

	onClickSendEmail = () => {
		const { history } = this.props;
		history.push(FrontPath.FORGOT_PASSWORD_SUCCESS);
	};

	render() {
		return (
			<CardPublicComponent>
				<h5 className="card-title text-center">Esqueci minha senha!</h5>
				<form className="form-signin">
					<div className="form-label-group">
						<input type="email" id="inputEmail" className="form-control" placeholder="Email" onChange={this.onChangeEmail} required />
						<label htmlFor="inputEmail">Endereço de email</label>
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

ForgotPasswordPage.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(ForgotPasswordPage);
