/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class NavBarComponent extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark navbar-expand-sm">
				<a className="navbar-brand" href="#">
					<img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/logo_white.png" width="30" height="30" alt="logo" />
					BootstrapBay
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbar-list-4">
					<div id="navbarSupportedContent" className="collapse navbar-collapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<a href="#" className="nav-link">
									Home <span className="sr-only">(current)</span>
								</a>
							</li>
							<li className="nav-item">
								<a href="#" className="nav-link">
									Prescrição
								</a>
							</li>
						</ul>
					</div>
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" className="rounded-circle" />
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								<a className="dropdown-item" href="#">
									Dashboard
								</a>
								<a className="dropdown-item" href="#">
									Edit Profile
								</a>
								<a className="dropdown-item" href="#">
									Log Out
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default NavBarComponent;
