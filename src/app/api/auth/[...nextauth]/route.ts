
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Hasło', type: 'password' }
      },
      async authorize(credentials, req) {
        
        if (
          credentials?.email === 'test@example.com' &&
          credentials?.password === 'secret123'
        ) {
          return {
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
