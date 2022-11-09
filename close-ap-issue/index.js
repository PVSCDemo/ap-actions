const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

(async () => {
	const token = process.env.GHB_TOKEN;
	core.debug(`Token: ${token}`);
	const repository_id = github.context.payload.repository.id;
	const data = github.context.payload.client_payload;
	const octokit = new Octokit( { 
		auth: token
	});
	const q =  data.card.id;
	core.debug(`Search using ${q} on ${repository_id}`);
	const results = await octokit.request('GET /issues', {})
	core.debug(`results: ${JSON.stringify(results)}`)

})().catch(ex => {
	core.setFailed(ex.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
