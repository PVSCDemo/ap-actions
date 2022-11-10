const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

(async () => {
	const token = process.env.GHB_TOKEN;
	core.debug(`Token: ${token}`);
	const repo = github.context.payload.repository.full_name;
	const data = github.context.payload.client_payload;
	const octo = new Octokit( { 
		auth: token
	});
	const q =  data.card.id;
	core.debug(`Search using ${q} on ${repoName}`);
	const results = octo.rest.search.labels({ repo, q });
	core.debug(`results: ${JSON.stringify(results)}`)

})().catch(ex => {
	core.setFailed(ex.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
