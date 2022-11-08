const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
	const inputs = {
		token: core.getInput("token")
	}
	core.startGroup('Logging of Code');
	try {

		const repo = github.context.payload.repository;
		const data = github.context.payload.client_payload;
		const octo = github.getOctokit(inputs.token);
		const q = "q="+encodeURIComponent("is:issue is:open label:"+data.card.id+" repo:"+repo.full_name);
		core.debug(`Search using ${q}`);
		const results = octo.rest.search.issuesAndPullRequests({q,});

		core.debug(`results: ${JSON.stringify(results)}`)

		core.s

	} catch (error) {
		core.debug(`Error: ${JSON.stringify(error)}`);
		core.setFailed(error.message);
		if (error.message == 'Resource not accessible by integration') {
			core.error(`See this action's readme for details about this error`);
		}
	}
	core.endGroup();

} )().catch( ex => {
	core.debug( `Failure: close-ap-issue: ${ex}` );
} );

