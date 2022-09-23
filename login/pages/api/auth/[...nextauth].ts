import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";

export default NextAuth( {
    providers: [
      GoogleProvider({
        clientId: "692427173181-hh2rcsj430blqoj8ja3aqrmqe0dfqhbe.apps.googleusercontent.com",
        clientSecret: "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",
      }),
      GitHubProvider({
        clientId: "57a844a926907acc090f",
        clientSecret: "e096c48de25a7ca6d4afdfb895f2097016de6642"
      })
    ],
    session: {
      strategy: 'jwt'
    },
    jwt: {
      secret: "secret token",
    },
    //Callback here
    callbacks: {
        async jwt({token, account}) {
          if (account ?.accessToken) {
            token.accessToken = account.accessToken
          }
          return token;
        },
        redirect: async ({url, baseUrl})=>{
          if (url === '/user') {
            return Promise.resolve('/')
          }
          return  Promise.resolve('/')
        }
    }
  });