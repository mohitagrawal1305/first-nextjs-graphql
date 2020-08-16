import nextCookie from "next-cookies";
import { isEmpty } from 'lodash';
import Router from "next/router";

export const auth = ( { ctx, isPrivateRoute } ) => {
    const { token } = nextCookie(ctx);

    if( ctx.req && isPrivateRoute && ( isEmpty( token ) || 'null' === token ) ) {
        ctx.res.writeHead(302, { Location: "/login" });
        ctx.res.end();
        return;
    }
    if( isPrivateRoute && ( isEmpty( token ) || 'null' === token ) ) {
        Router.push("/login");
    }
    
    if( ctx.req && !isPrivateRoute && ( !isEmpty( token ) && 'null' !== token ) ) {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
        return;
    }

    if (!isPrivateRoute && ( !isEmpty( token ) && 'null' !== token ) ) {
        Router.push("/");
    }
    return token;
};