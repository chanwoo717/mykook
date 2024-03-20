import axios from "axios";
import { create } from "zustand";

const request3 = axios.create({
    baseURL:  process.env.VERCEL_URL,
    timeout: 3500
})

interface Ty3 {
    data3: any;
    resultData: (type: string) => void;
}


export const useStore3 = create<Ty3>((set) => {

    return {
        data3: [],
        resultData: async function (search:string) {
            set({ data3 : search });
        }
    }
})