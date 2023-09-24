
import Head from 'next/head'
import { NextPageWithLayout } from '../../types'

const Register: NextPageWithLayout = () => {

	const { t: tc } = useTranslation("common");

	return 
	<>
		<Head>
			<title>{tc("page_title", { page: "register" })}</title>
		</Head>
	</>
}


