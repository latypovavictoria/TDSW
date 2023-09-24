import { z } from "zod";
import { endpoint } from "@api/fetch";
import { hasOrganizationId, userSchema } from "@api/schemas";

export const registrationInputSchema = userSchema
	.partial({
		id: true,
		tid: true,
		login: true,
		password: true,
	})
	.merge(
		z.object({
			doctor_id: z.string().optional(),
			supervisor_id: z.string().optional(),
			organization_id: z.string().optional(),
			organization_hash: z.string().optional(),
			height: z.number().optional(),
			weight: z.number().optional(),
		})
	)
	.superRefine(hasOrganizationId);

export type registrationInputType = z.infer<typeof registrationInputSchema>;

export default (data: registrationInputType, account_type: string) =>
	endpoint(
		`/v2/auth/registration/${account_type}`,
		"POST",
		data,
		registrationInputSchema,
		z.object({
			hash_link: z.string(),
		}),
		false
	);
