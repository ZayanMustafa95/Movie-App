import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // or your custom Appwrite endpoint
  .setProject("YOUR_PROJECT_ID"); // Replace with your actual project ID
