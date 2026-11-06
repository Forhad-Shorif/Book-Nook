import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"

// set Dns server for use client......................................

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Book-Nook");

export const auth = betterAuth({
 database: mongodbAdapter(db, {
    client,
  }),
  //...other options
  emailAndPassword: {
    enabled: true,
  },

  
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }
  },
});