import axios from "axios";
import { create } from "zustand";

const request = axios.create({
    baseURL: process.env.VERCEL_URL,
    timeout: 4000   
})

interface Ty {
    data: any[];
    dataCrl: (type: string, id: string, overData: any) => void;
    category:(cateName: string, index: number) => void;
    cateName:string;
    cateIdx:number;

}

export const useStore = create<Ty>((set) => {

    return {
        data: [],
        data2: [],
        cateName:'밥',
        cateIdx:0,
        dataCrl: async function (type, id, overData) {
            let res: any;
            switch (type) {
                case 'all': res = await request.get('/api/all_recipe/')
                    break;

                case '카테고리': res = await request.get(`/api/all_recipe/${id}`)
                    break;

                case '검색': res = await request.get(`/api/all_recipe/${id}`)
                    break;

                case '나의레시피': res = await request.get(`/api/all_recipe/${id}`)
                    break;

                case 'insert': res = await request.post('/api/all_recipe/', overData)
                    break;

                case 'delete': res = await request.delete(`/api/all_recipe/${id}`)
                    break;

                case 'put': res = await axios.put(`/api/all_recipe/${id}`, overData)
                    break;
            }
            set({ data: res.data });


        },

        category:function(cateName,index){

            set((state:any)=>{
                return state.dataCrl("카테고리",cateName)
            })

            set((state)=>{
                return {cateName, cateIdx:index}
            })
            
        }


    }
})