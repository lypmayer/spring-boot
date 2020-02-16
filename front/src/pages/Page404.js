/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import CardPublicComponent from '../components/CardPublicComponent';
import FontAwesomeEnum from '../util/enum/FontAwesomeEnum';
import { FrontPath } from '../util/Paths';

class Page404 extends React.PureComponent {
	render() {
		return (
			<CardPublicComponent>
				<div className="form-label-group">
					<i className={classnames(FontAwesomeEnum.FA_EXCLAMATION_TRIANGLE, 'text-danger', 'fa-3x')} />
				</div>
				<h5 className="card-title text-center">Pagina não encontrada</h5>
				<Link activestyle="text-primary" to={FrontPath.LOGIN}>
					Pagina de login
				</Link>
			</CardPublicComponent>
		);
	}
}

export default Page404;
