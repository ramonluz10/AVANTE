import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

const providers = googleClientId && googleClientSecret
  ? [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret
      })
    ]
  : [];

const handler = NextAuth({
  providers,
  pages: {
    signIn: '/auth'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
});

export { handler as GET, handler as POST };
