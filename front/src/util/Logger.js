import * as Sentry from '@sentry/browser';
import SystemUtil from './SystemUtil';

class Logger {
	static init = () => {
		if (!SystemUtil.isLocalHost()) {
			Sentry.init({
				dsn: 'https://4fc227cf73db44bcb6ab6d30564b3706@sentry.io/2579642',
				attachStacktrace: true,
				integrations: integrations => {
					return integrations.filter(integration => integration.name !== 'Breadcrumbs');
				},
				release: SystemUtil.getVersion(),
				environment: SystemUtil.getNameEnvironment(),
			});
		}
	};

	static serviceError = (error, message) => {
		if (!SystemUtil.isLocalHost()) {
			Sentry.captureEvent({
				message,
				extra: error,
			});
		}
	};
}

export default Logger;
