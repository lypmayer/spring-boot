import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { FrontPath } from '../../util/Paths';

class HomePage extends React.PureComponent {
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
			<React.Fragment>
				<HeaderComponent />
				<section className="py-5">
					<div className="container py-5">
						<ol className="pl-3">
							<li className="mb-3">
								Add your logo image inside<code>a.navbar-brand</code>
							</li>
							<li className="mb-3">You can set the logo width and height by attributes.</li>
							<li className="mb-3">
								Add one of <code>.align-top .align-middle .align-bottom</code> classes to vertically adapt adjacent text with the image.
							</li>
						</ol>
					</div>
				</section>
				<FooterComponent />
			</React.Fragment>
		);
	}
}

HomePage.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(HomePage);
