import { inspect } from "util";
import { getInput, debug, setFailed, error as _error } from '@actions/core';
import { Octokit } from "@octokit/rest";

async function run() {
	const inputs = {
		token: getInput("token"),
		repository: getInput("repository"),
		apPayload: getInput("ap_payload"),
	  };
	  debug(`Inputs: ${inspect(inputs)}`);
	try {
		const octo = new Octokit({
			auth: inputs.token,
			baseUrl: inputs.repository
		});
		const results = octo.rest.search.issuesAndPullRequests("q=label:Defect "+apPayload.card.id)

	} catch (error) {
		debug(inspect(error));
		setFailed(error.message);
		if (error.message == 'Resource not accessible by integration') {
			_error(`See this action's readme for details about this error`);
		}
	}
}