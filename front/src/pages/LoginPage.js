/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

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

	onClickLogin = () => {};

	render() {
		return (
			<div className="body">
				<div className="container h-100">
					<div className="row h-100 justify-content-center align-items-center">
						<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
							<div className="card card-signin my-5">
								<div className="card-body">
									<h5 className="card-title text-center">Login</h5>
									<form className="form-signin">
										<div className="form-label-group">
											<input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.onChangeEmail} required />
											<label htmlFor="inputEmail">Email address</label>
										</div>

										<div className="form-label-group">
											<input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.onChangePassword} required />
											<label htmlFor="inputPassword">Password</label>
										</div>
										<button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.onClickLogin}>
											Login
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;
