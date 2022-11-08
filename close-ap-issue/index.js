const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
	const token = process.env.GH_TOKEN;
	core.debug(`Token: ${token}`);
	const repo = github.context.payload.repository;
	const data = github.context.payload.client_payload;
	const octo = github.getOctokit({ token });
	const q =  "is:issue label:bug";
	core.debug(`Search using ${token} and ${q}`);
	const results = octo.rest.search.issuesAndPullRequests({ q, });
	core.debug(`results: ${JSON.stringify(results)}`)
	return 0;

})().catch(ex => {
	core.setFailed(ex.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
