const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	const inputs = {
		token: core.getInput("token"),
		repository: core.getInput("repository"),
	  };
	try {
		const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
		// const octo = new Octokit({
		// 	auth: inputs.token,
		// 	baseUrl: inputs.repository
		// });
		// const results = octo.rest.search.issuesAndPullRequests("q=label:Defect "+inputs.data.card.id)

	} catch (error) {
		core.debug(core.inspect(error));
		core.setFailed(error.message);
		if (error.message == 'Resource not accessible by integration') {
			core.error(`See this action's readme for details about this error`);
		}
	}
}
run();

