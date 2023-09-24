import useSWR, { mutate } from "swr";
import forms from "@api/v2/auth/forms";

const useForms = (account_type: string) => {
	const res = useSWR(["/auth/forms", account_type], (_, a) =>
		forms(account_type)
	);

	return {
		...res,
		data: res.data?.data,
		status: res.data?.status,
		message: res.data?.message,
	};
};

export const mutateForms = (account_type: string) =>
	mutate(["/auth/forms", account_type]);

export default useForms;