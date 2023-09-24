import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
export type Json = Literal | { [key: string]: Json } | Json[];
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
	z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export function hasOrganizationId(arg: any, ctx: z.RefinementCtx) {
	if (!arg.organization_id && !arg.organization_hash) {
		ctx.addIssue({
			path: ["organization_hash"],
			code: z.ZodIssueCode.custom,
			message: "organization_id or organization_hash is required",
		});
	}
}

export const schedulesSchema = z.object({
	id: z.number(),
	organization_id: z.number(),
	json_data: jsonSchema,
});
export type schedulesType = z.infer<typeof schedulesSchema>;

export const organizationsSchema = z.object({
	id: z.number(),
	name: z.string(),
	width: z.number(),
	longitude: z.number(),
	description: z.string(),
	town: z.string(),
	Hash: z.string(),
	schedules: z.array(schedulesSchema).nullable().optional(),
});
export type organizationsType = z.infer<typeof organizationsSchema>;

export const usersSchemesSchema = z.object({
	id: z.number(),
	account_type: z.string(),
	scheme: jsonSchema,
});
export type usersSchemesType = z.infer<typeof usersSchemesSchema>;

export const usersTokensSchema = z.object({
	id: z.number().nullable().optional(),
	token: z.string(),
	refresh_token: z.string(),
	data_time: z.string(),
	account_type: z.string(),
	user_id: z.number(),
	is_permanent: z.boolean(),
});
export type usersTokensType = z.infer<typeof usersTokensSchema>;

export const inspectionsSchema = z.object({
	id: z.number(),
	inspection_type: z.string(),
	json_data: jsonSchema,
	result: jsonSchema,
	ai_result: z.string(),
	access: z.boolean().nullable().optional(),
	comments: z.string().nullable().optional(),
	complaints: z.string().nullable().optional(),
	datetime_created: z.string(),
	datetime_created_formated: z.string(),
	access_features: z.string().nullable().optional(),
	access_output: z.string().nullable().optional(),
	dynamic_link: z.string().nullable().optional(),
	patient_id: z.number(),
	scheme_id: z.string().nullable().optional(),
	organization_id: z.number().nullable().optional(),
	video_count: z.number().nullable().optional(),
});
export type inspectionsType = z.infer<typeof inspectionsSchema>;

export const filesSchema = z.object({
	id: z.number(),
	file: z.string().nullable().optional(),
	file_hash: z.string().nullable().optional(),
	file_type: z.string().nullable().optional(),
});
export type filesType = z.infer<typeof filesSchema>;

export const inspectionsSchemesSchema = z.object({
	id: z.number(),
	inspection_type: z.string(),
	json_data_format: jsonSchema,
	visualisation_type: z.string(),
	inspections: z.array(inspectionsSchema).nullable().optional().default([]),
});
export type inspectionsSchemesType = z.infer<typeof inspectionsSchemesSchema>;

export const risksSchema = z.object({
	id: z.number(),
	patient_id: z.number(),
	inspection_id: z.number(),
	risk: z.string(),
	datetime_created: z.string(),
});
export type risksType = z.infer<typeof risksSchema>;

export const recommendationsSchema = z.object({
	id: z.number(),
	patient_id: z.number(),
	inspection_id: z.number(),
	recommendation: z.string(),
	datetime_created: z.string(),
});
export type recommendationsType = z.infer<typeof recommendationsSchema>;

export const inspectionStatSchema = z.object({
	inspections_count: z.number(),
	danger_inspections_count: z.number(),
	warn_inspections_count: z.number(),
	ok_inspections_count: z.number(),
});
export type inspectionStatType = z.infer<typeof inspectionStatSchema>;

export const userSchema = z.object({
	json_data: jsonSchema.nullable().optional(),

	id: z.number(),
	tid: z.string(),
	login: z.string(),
	password: z.string(),
	phone: z.string().nullable().optional(),
	sex: z.number().nullable().optional(),
	birthday: z.string().nullable().optional(),
	edsignature: z.string().nullable().optional(),
	insure_number: z.string().nullable().optional(),
	hash_link: z.string().nullable().optional(),
	account_type: z.string().nullable().optional(),
	inspections: z.array(inspectionsSchema).nullable().optional(),
	risks: z.array(risksSchema).nullable().optional(),
	recommendations: z.array(recommendationsSchema).nullable().optional(),
	email: z.string().nullable().optional(),
	all_parents_id: z.string().nullable().optional(),
	all_organizations_id: z.string().nullable().optional(),
	avatar: z.string().nullable().optional(),
});
export type userType = z.infer<typeof userSchema>;

export const patientSchema = userSchema
	.partial({
		tid: true,
		login: true,
		password: true,
	})
	.merge(
		z.object({
			json_data: z
				.object({
					firstName: z.string().nullable().optional(),
					lastName: z.string().nullable().optional(),
					patronymic: z.string().nullable().optional(),
					weight: z.number().nullable().optional(),
					height: z.number().nullable().optional(),
				})
				.nullable()
				.optional(),
		})
	);
export type patientType = z.infer<typeof patientSchema>;
