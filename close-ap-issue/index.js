const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
	const inputs = {
		token: core.getInput("token")
	}
	const repo = github.context.payload.repository;
	const data = github.context.payload.client_payload;
	const octo = github.getOctokit(inputs.token);
	const q =  "is:issue label:bug";
	core.debug(`Search using ${q}`);
	const results = octo.rest.search.issuesAndPullRequests({ q, });
	core.debug(`results: ${JSON.stringify(results)}`)
	return 0;

})().catch(ex => {
	core.setFailed(error.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
