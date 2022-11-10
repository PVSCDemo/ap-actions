const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

(async () => {
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
			await octo.rest.issues.update({
				owner: github.context.payload.repository.owner.name,
				repo: github.context.payload.repository.name,
				state : "closed",
				issue_number: item.id
			})
		})
	}

})().catch(ex => {
	core.setFailed(ex.message);
});
