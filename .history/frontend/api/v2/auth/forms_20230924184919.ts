import { endpoint } from '@api/fetch';
import { z } from "zod";

im

export default (account_type: string) =>
	endpoint(
		"/v2/auth/forms",
		"POST",
		{ account_type },
		z.object({
			account_type: z.string(),
		}),
		usersSchemesSchema
	);