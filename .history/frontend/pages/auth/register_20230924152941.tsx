
import Head from 'next/head'
import { NextPageWithLayout } from '../../types'
import { useTransition } from 'n';

const Register: NextPageWithLayout = () => {

	const { t: tc } = useTranslation("common");

	return 
	<>
		<Head>
			<title>{tc("page_title", { page: "register" })}</title>
		</Head>
	</>
}


