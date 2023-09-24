import { checkCookie, setCookie } from "cookies-next";
import Router from "next/router";

const logout = async () => {
	if (checkCookies("token")) setCookies("token", "", { maxAge: 0 });
	if (checkCookies("refresh_token")) setCookies("refresh_token", "", { maxAge: 0 });
	localStorage.removeItem("user");
	await Router.push("/auth/signin");
	Router.reload();
};

export default logout;
