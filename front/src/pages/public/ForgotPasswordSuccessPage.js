import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import CardPublicComponent from '../../components/CardPublicComponent';
import FontAwesomeEnum from '../../util/enum/FontAwesomeEnum';
import { FrontPath } from '../../util/Paths';

class ForgotPasswordSuccessPage extends React.PureComponent {
	render() {
		return (
			<CardPublicComponent>
				<div className="form-label-group">
					<i className={classnames(FontAwesomeEnum.FA_CHECK_CIRCLE, 'text-success', 'fa-3x')} />
				</div>
				<div className="form-label-group">Email enviado com sucesso</div>
				<Link activestyle="text-primary" to={FrontPath.LOGIN}>
					Pagina de login
				</Link>
			</CardPublicComponent>
		);
	}
}

export default ForgotPasswordSuccessPage;
