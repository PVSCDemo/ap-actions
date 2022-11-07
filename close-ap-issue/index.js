const { inspect } = require("util");
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	const inputs = {
		token: getInput("token"),
		repository: getInput("repository"),
		payload: getInput("payload"),
	  };
	  debug(`Inputs: ${inspect(inputs)}`);
	try {
		const octo = new Octokit({
			auth: inputs.token,
			baseUrl: inputs.repository
		});
		const results = octo.rest.search.issuesAndPullRequests("q=label:Defect "+payload.card.id)

	} catch (error) {
		debug(inspect(error));
		setFailed(error.message);
		if (error.message == 'Resource not accessible by integration') {
			_error(`See this action's readme for details about this error`);
		}
	}
}

