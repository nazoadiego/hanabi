import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      // replace refresh token with new one if new one is returned,
      // otherwise keep the old one
      refreshToken: refreshedToken.refresh_token
        ? refreshedToken.refresh_token
        : token.refreshToken,
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'Refresh token failed',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          // We want to handling expiry times in Milliseconds
          accessTokenExpiresAt: account.expires_at * 1000,
        }
      }

      // If you comeback and you access token hasn't expired
      // Return the previous token
      if (Date.now() < token.accessTokenExpiresAt) {
        console.log('Existing access token is still valid!')
        return token
      }

      // If you comeback and the access token has expired
      // Refresh the token
      console.log('Existing access token has expired!')
      return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})

// For more info about NextAuth and using a JWT callback
// check out the following links:
// https://next-auth.js.org/tutorials/refresh-token-rotation
