const core = require('@actions/core');
const github = require('@actions/github');

core.startGroup('Logging of Code');
(async () => {
	const inputs = {
		token: core.getInput("token")
	}

	const repo = github.context.payload.repository;
	const data = github.context.payload.client_payload;
	const octo = github.getOctokit(inputs.token);
	const q = encodeURIComponent("is:issue is:open label:" + data.card.id + " repo:" + repo.full_name);
	core.debug(`Search using ${q}`);
	const results = octo.rest.search.issuesAndPullRequests({ q, });

	core.debug(`results: ${JSON.stringify(results)}`)

})().catch(ex => {
	core.setFailed(error.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
core.endGroup();

