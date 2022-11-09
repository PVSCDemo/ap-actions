const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
	const token = process.env.GHB_TOKEN;
	core.debug(`Token: ${token}`);
	const repository_id = github.event.payload.repository.id;
	const data = github.context.payload.client_payload;
	const octo = github.getOctokit( token );
	const q =  data.card.id;
	core.debug(`Search using ${token} and ${q}`);
	const res = octo.rest.search
	const results = octo.rest.search.labels({ repository_id, q, });
	core.debug(`results: ${JSON.stringify(results)}`)
	return 0;

})().catch(ex => {
	core.setFailed(ex.message);
	core.debug(`Failure: close-ap-issue: ${ex}`);
});
