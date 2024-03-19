import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';

export const option = {

    providers: [
        GoogleProvider({
            
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID as string,
            clientSecret: process.env.NAVER_CLIENT_SECRET as string,
        }),
    ],
    secret:  process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            return { ...token, ...user };
        },
        async session({ session, token }: any) {
            session.user = token;
            return session;
        },
    },
}