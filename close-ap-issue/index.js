const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
	const token = github;
	core.debug(`Github: ${JSON.stringify(token)}`);
	const repo = github.context.payload.repository;
	const data = github.context.payload.client_payload;
	const octo = github.getOctokit({
		opts: {
			auth: 'none'
		}
	});
	const q =  "is:issue label:bug";
	core.debug(`Search using ${q}`);
	const results = octo.rest.search.issuesAndPullRequests({ q, });
	core.debug(`results: ${JSON.stringify(results)}`)
	return 0;

})().catch(ex => {
	core.setFailed(ex.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
