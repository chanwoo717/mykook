import NextAuth from "next-auth";
import { option } from "@/app/utill/option.ts";


const handler = NextAuth(option)

export { handler as GET, handler as POST }