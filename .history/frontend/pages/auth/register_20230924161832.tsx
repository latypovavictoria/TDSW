
import Head from 'next/head'
import { NextPageWithLayout } from '../../types'
import { useTranslation } from 'next-i18next';
import { ReactElement, useMemo, useState } from "react";
import AuthLayout from "../../layouts/auth";
import EBox from "../../components/UI/EBox";

const Register: NextPageWithLayout = () => {

	const { t: tc } = useTranslation("common");

	return (
		<>
			<Head>
				<title>{tc("page_title", { page: "register" })}</title>
			</Head>
		</>
	)
}

Register.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default Register;

