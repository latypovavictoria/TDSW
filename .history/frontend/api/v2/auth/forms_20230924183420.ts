import { z } from "zod";

import { endpoi }
import { usersSchemesSchema } from "@api/schemas";

// eslint-disable-next-line import/no-anonymous-default-export
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