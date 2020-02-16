import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CardPublicComponent extends Component {
	render() {
		const { children } = this.props;

		return (
			<div className="body">
				<div className="container h-100">
					<div className="row h-100 justify-content-center align-items-center">
						<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
							<div className="card card-signin my-5">
								<div className="card-body text-center">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CardPublicComponent.propTypes = {
	children: PropTypes.element.isRequired,
};

export default CardPublicComponent;
