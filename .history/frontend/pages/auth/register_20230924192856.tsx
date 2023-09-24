
import Head from 'next/head'
import NextLink from "next/link";
import UIButton from '../../components/UI/Button';
import { NextPageWithLayout } from '../../types'
import { useTranslation } from 'next-i18next';
import { ReactElement, useMemo, useState } from "react";
import AuthLayout from "../../layouts/auth";
import EBox from '../../components/UI/EBox/EBox';
import useForms from '../../api/hooks/auth/forms';
import PhoneInput from '../../components/UI/PhoneInput';
import EInput from '../../components/UI/EInput';
import registration from '../../api/v2/auth/registration';
import Re

const account_types = [
	"administrator",
	"doctor",
	"patient",
] as const;

const firstFields = [
	"firstName",
	"lastName",
	"patronymic",
	"login",
	"password",
] as const;



const Register: NextPageWithLayout = () => {

	const { t } = useTranslation("authorization");
	const { t: tc } = useTranslation("common");

	const [type, setType] = useState<(typeof account_types)[number]>("patient");
	const [user, setUser] = useState<Record<string, string>>({});
	const [err, setErr] = useState<
		| {
			field?: string;
			message: string;
		}
		| undefined
	>();

	const { data: accountSchemes } = useForms(type);
	const [phone, setPhone] = useState("");
	const [validPhone, setValidPhone] = useState(true);

	const fields = useMemo(() => {
		if (!accountSchemes) return [];

		let unsorted = Object.keys(accountSchemes.scheme || {});
		const res = [];

		for (const field of firstFields) {
			if (unsorted.findIndex((v) => v === field) !== -1) {
				const index = unsorted.findIndex((v) => v === field);
				res.push(field);
				unsorted = unsorted.filter((v, i) => i !== index);
			}
		}

		return res.concat(unsorted);
	}, [accountSchemes]);

	const submit = async () => {
		setErr(undefined);

		if (!validPhone) {
			setErr({
				field: "phone",
				message: t("invalid_number"),
			});
			return;
		}

		const userData: registrationInputType = user;
		userData.phone = phone;
		userData.sex = 1;
		userData.tid = Math.floor(Math.random() * 10000).toString();

		if (user["height"]) userData["height"] = parseInt(user["height"]);
		if (user["weight"]) userData["weight"] = parseInt(user["weight"]);

		const resp = await registration(userData, type);

		if (isOkStatus(resp.status)) {
			router.push("/auth/signin");
		} else {
			if (resp.message) {
				let field;
				let message;

				switch (resp.status) {
					case Status.INVALID_INPUT:
						field = resp.message?.split(":")[0]?.trim();
						message = resp.message?.split(":")[1]?.trim();
						break;
					case Status.INVALID_OUTPUT:
						field = resp.message?.split(":")[0]?.trim();
						message = resp.message?.split(":")[1]?.trim();
						break;
					default:
						message = resp.message;
						break;
				}

				if (message) {
					for (const field of fields.concat(extra_fields)) {
						if (message.includes(field)) {
							message = message.replaceAll(field, t(`fields.${field}`));
						}
					}

					setErr({ field, message });
				}
			}
		}
	};

	return (
		<>
			<Head>
				<title>{tc("page_title", { page: "register" })}</title>
			</Head>
			<EBox
				className="flex max-w-[70vh] flex-col gap-2 p-4"
				header={
					<div className="flex flex-row items-center gap-2 p-2">
						<span>{t("register.title")}</span>
						<select
							defaultValue={type}
							onChange={(e) => {
								setType(e.target.value as (typeof account_types)[number]);
							}}
						>
							{account_types.map((acc_type) => (
								<option key={acc_type} value={acc_type}>
									{t(`accountTypes.${acc_type}`)}
								</option>
							))}
						</select>
					</div>
				}
			>
				<div className="mt-2 flex flex-row flex-wrap justify-evenly gap-3">
					{fields.length === 0 && <span>{t("register.noScheme")}</span>}
					{fields.map((item, i) => (
						<div className="flex flex-col items-center" key={i}>
							<span>{t(`fields.${item}`)}</span>
							{item === "phone" ? (
								<PhoneInput
									value={phone}
									onChange={(p) => setPhone(p)}
									onValid={(v) => setValidPhone(v)}
								/>
							) : (
								<EInput
									className="my-3 flex"
									onChange={(e) => {
										const temp = user;
										temp[item] = e.target.value;
										setUser(temp);
									}}
									maxLength={20}
									type={item === "password" ? "password" : "text"}
									inputClassName="p-1"
								/>
							)}
						</div>
					))}
				</div>
				<div className="flex w-full flex-row justify-between">
					<div className="flex flex-col items-center">
						<span>{t("fields.organization_hash")}</span>
						<EInput
							className="my-3 flex"
							onChange={(e) => {
								const temp = user;
								temp.organization_hash = e.target.value;
								setUser(temp);
							}}
							inputClassName="p-1"
							maxLength={20}
						/>
					</div>
					{err && (
						<div className="mx-2 flex flex-grow flex-col items-center gap-2">
							<span className="text-center text-xl font-semibold text-red-500">
								{t("register.error")}
							</span>
							<span className="text-center text-lg">
								{err.field && <>{t(`fields.${err.field}`)}:</>} {err.message}
							</span>
						</div>
					)}
				</div>
				<div className="mt-2 flex justify-between">
					<UIButton secondary className="p-1">
						<NextLink href="/auth/signin">{t("auth.title")}</NextLink>
					</UIButton>
					<UIButton onClick={() => submit()} className="p-1">
						{t("register.register")}
					</UIButton>
				</div>
			

			</EBox>
		</>
	)
}

Register.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default Register;

