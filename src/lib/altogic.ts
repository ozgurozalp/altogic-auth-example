import { createClient } from 'altogic';

const altogic = createClient(
	process.env.REACT_APP_ALTOGIC_ENV_URL,
	process.env.REACT_APP_ALTOGIC_CLIENT_KEY
);

export default altogic;
