import logout from './logout';
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { z, ZodError } from "zod";

type FetchResult<T> = {
	status: number;
	data?: T | undefined;
	message?: string | undefined;
};

export const respSchema = <T extends z.ZodTypeAny = z.ZodAny>(schema: T) =>
	z.object({
		status: z.number(),
		data: schema.optional(),
		message: z.string().optional(),
	});

export enum Status {
	INVALID_OUTPUT = -5,
	INVALID_INPUT = -4,
	NO_INPUT = -3,
	FETCH_ERROR = -2,
	UNKNOWN_ERROR = -1,
}

export async function api<T extends z.ZodTypeAny = z.ZodAny>(
	url: string,
	method: Method = "GET",
	body: Record<string, unknown> | undefined = undefined,
	validate: T,
	add_language = false
): Promise<FetchResult<z.infer<T>>> {
	let resp;

	if (add_language && body) body["language"] = "ru";

	try {
		resp = await axios({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
			url,
			method,
			data: body,
			withCredentials: true,
		});
	} catch (e) {
		return handleError(e as Error);
	}

	return validateResponse(resp.data, validate);
}

function validateResponse<T extends z.ZodTypeAny>(
	body: AxiosResponse<unknown>["data"],
	schema: T
): FetchResult<z.infer<T>> {
	const respSchema = z.object({
		status: z.number(),
		data: schema.optional(),
		message: z.string().optional(),
	});

	let resp;

	try {
		resp = respSchema.parse(body);
	} catch (e) {
		const err = e as ZodError;
		return {
			status: Status.INVALID_OUTPUT,
			message: `${err.errors[0].path}: ${err.errors[0].message}`,
		};
	}

	if (resp.status === 401) {
		logout();
	}

	// const resp = body as z.infer<typeof respSchema>;
	return resp;
}

function handleError(e: Error): FetchResult<undefined> {
	const err = e as AxiosError;
	if (!err.isAxiosError) {
		return {
			status: Status.UNKNOWN_ERROR,
			message: e.message,
		};
	}
	const res = err.response;
	if (!res) {
		return {
			status: Status.FETCH_ERROR,
			message: `${err.message}`,
		};
	}
	return {
		status: res.status,
		message: res.data.message || res.statusText,
	};
}

export function validateInput<T extends z.ZodTypeAny>(
	body: object,
	schema: T
): FetchResult<undefined> | undefined {
	try {
		schema.parse(body);
	} catch (e) {
		const err = e as ZodError;
		return {
			status: Status.INVALID_INPUT,
			message: `${err.errors[0].path}: ${err.errors[0].message}`,
		};
	}
}

export async function endpoint<
	Input extends z.ZodTypeAny,
	Output extends z.ZodTypeAny
>(
	path: string,
	method: Method = "GET",
	input: z.infer<Input> | undefined = undefined,
	input_type: Input | undefined = undefined,
	output_type: Output,
	add_language = false
): Promise<FetchResult<z.infer<Output>>> {
	if (input_type) {
		if (!input) {
			return {
				status: Status.NO_INPUT,
			};
		}
		const err = validateInput(input, input_type);
		if (err) {
			return err;
		}
	}
	const res = await api(path, method, input, output_type, add_language);
	if (res.message) console.log(res.message);
	return res;
}

export default api;
