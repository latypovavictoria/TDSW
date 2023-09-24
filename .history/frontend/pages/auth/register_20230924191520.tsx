
import Head from 'next/head'
import { NextPageWithLayout } from '../../types'
import { useTranslation } from 'next-i18next';
import { ReactElement, useMemo, useState } from "react";
import AuthLayout from "../../layouts/auth";
import EBox from '../../components/UI/EBox/EBox';
import useForms from '../../api/hooks/auth/forms';
import PhoneInput from '../../components/UI/PhoneInput';
import EInput from '../../components/UI/EInput';

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
	
	const { data: accountSchemes } = useForms(type);

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

