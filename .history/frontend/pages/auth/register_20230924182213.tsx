
import Head from 'next/head'
import { NextPageWithLayout } from '../../types'
import { useTranslation } from 'next-i18next';
import { ReactElement, useMemo, useState } from "react";
import AuthLayout from "../../layouts/auth";
import EBox from '../../components/UI/EBox/EBox';

const account_types = [
	"administrator",
	"doctor",
	"patient",
] as const;

const Register: NextPageWithLayout = () => {
	
	const { t } = useTranslation("authorization");
	const { t: tc } = useTranslation("common");
	const [type, setType] = useState<(typeof account_types)[number]>("patient");

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

			</EBox>
		</>
	)
}

Register.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default Register;

