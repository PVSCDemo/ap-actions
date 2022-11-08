const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	const inputs = {
		token: core.getInput("token")
	}

	try {
		const repo = github.context.payload.repository;
		const data = github.context.payload.client_payload;
		const octo = github.getOctokit(inputs.token);
		const q = "q="+encodeURIComponent("is:issue label:"+data.card.id);
		core.debug(`Search using ${q}`);
		const results = octo.rest.search.issuesAndPullRequests({q,});

		core.debug(`results: ${JSON.stringify(results)}`)

	} catch (error) {
		core.debug(`Error: ${JSON.stringify(error)}`);
		core.setFailed(error.message);
		if (error.message == 'Resource not accessible by integration') {
			core.error(`See this action's readme for details about this error`);
		}
	}
}
run();

