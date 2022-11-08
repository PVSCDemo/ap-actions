const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	const inputs = {
		token: core.getInput("token"),
		repository: core.getInput("repository"),
		payload: core.getInput("payload"),
	  };
	  core.debug(`Inputs: ${core.inspect(inputs)}`);
	try {
		const octo = new Octokit({
			auth: inputs.token,
			baseUrl: inputs.repository
		});
		const results = octo.rest.search.issuesAndPullRequests("q=label:Defect "+payload.card.id)

	} catch (error) {
		core.debug(core.inspect(error));
		core.setFailed(error.message);
		if (error.message == 'Resource not accessible by integration') {
			core.error(`See this action's readme for details about this error`);
		}
	}
}

