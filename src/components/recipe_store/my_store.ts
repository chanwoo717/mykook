import axios from "axios";
import { create } from "zustand";

const request1 = axios.create({
    baseURL:  process.env.VERCEL_URL,
    timeout: 2500
})
interface Ty2 {
    data2: any[];
    status1: boolean;
    dataCrl2: (type2: string, bbb: string) => void;
}

export const useStore2 = create<Ty2>((set) => {

    return {
        data2: [],
        status1: false,
        dataCrl2: async function (type2: string, user?: string) {
            set({ status1: false });
            let res2: any;
            switch (type2) {
                case 'all': res2 = await request1.get('/api/my_recipe')
                    break;
            }
            set({ data2: res2.data, status1: true });


        }
    }
})