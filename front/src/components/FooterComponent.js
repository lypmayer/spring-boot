import React, { Component } from 'react';

class FooterComponent extends Component {
	render() {
		return (
			<footer>
				<p className="text-muted mt-5">
					Snippet by{' '}
					<a href="https://bootstrapious.com/snippets" className="text-reset">
						<u>Bootstrapious</u>
					</a>
				</p>
			</footer>
		);
	}
}

export default FooterComponent;
