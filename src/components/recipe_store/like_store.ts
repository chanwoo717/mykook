import axios from "axios";
import { create } from "zustand";

const request1 = axios.create({
    baseURL:  process.env.VERCEL_URL
})
interface Ty5 {
    data5: any[];

    dataCrl5: (type5: string, id5: any, overdata5: any) => void;
}

export const useStore5 = create<Ty5>((set) => {

    return {
        data5: [],
        status1: false,
        dataCrl5: async function (type5, id5, overData5) {
            let res: any;
            switch (type5) {
                case 'all': res = await request1.get('/api/like')
                    break;
                case "one": res = await request1.get(`/api/like/${id5}`);
                    break;

                case "insert": res = await request1.post("/api/like", overData5);
                    break;

                case "delete": res = await request1.delete(`/api/like/${id5[0]}`);
                    break;

                case "put": res = await axios.put(`/api/like/${id5}`, overData5);
                    break;
            }
            set({ data5: res.data });


        }
    }
})