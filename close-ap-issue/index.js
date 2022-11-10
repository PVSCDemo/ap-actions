const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");
const exc = null;

(async () => {
	core.debug(`Payload: ${JSON.stringify(github.context.payload)}`)
	const token = process.env.GHB_TOKEN;
	const repository_id = github.context.payload.repository.id;
	const data = github.context.payload.client_payload;
	const octo = new Octokit( { 
		auth: token
	});
	const q =  "is:issue is:open label:"+data.card.id;
	core.debug(`Search using ${q} on ${repository_id}`);
	const results = await octo.rest.search.issuesAndPullRequests({ repository_id, q });
	core.debug(`results: ${JSON.stringify(results)}`)
	if ((results.status == 200) && (results.data.total_count > 0)){
		results.data.items.map(async (item) => {
			const owner = github.context.payload.repository.owner.login;
			const repo = github.context.payload.repository.name;
			const state = "closed";
			const issue_number = item.number;
			core.debug(`Closing issue with ${owner}, ${repo} ${state} ${issue_number}`)
			await octo.rest.issues.update({
				owner,
				repo,
				state,
				issue_number,
			})
		})
	}

})().catch(ex => {
	exc = ex;
	core.setFailed(ex.message);
});
if (exc) core.debug(`Failed with error: ${JSON.stringify(ex)}`);
