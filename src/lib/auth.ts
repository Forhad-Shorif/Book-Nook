import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Book-Nook");

export const auth = betterAuth({

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

  database: mongodbAdapter(db, {
    client,
  }),
});