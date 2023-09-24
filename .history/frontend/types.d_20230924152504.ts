import type { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
	getLayout?: (_: ReactElement) => ReactNode;
};