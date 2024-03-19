import { initTy4 } from '@/components/datatype/type';
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_DB;
const client = new MongoClient(uri)

export const test4 = async (type?: string, body?: initTy4) => {
    await client.connect();
    
    let db, collection, data4
    db = client.db('kook')
    collection = db.collection('like')

    
    
    switch (type) {
        case "post":
            await collection.insertOne(body);
            break;
            
            case "detail":
                data4 = await collection.find(body).toArray();
                break;
                
                case "delete":
                    data4 = await collection.deleteOne(body);
                    break;
                    
            case 'put':
                await collection.updateMany({seq:body?.seq}, {$set:body});

            break;
        }
        
        if (type != 'detail') data4 = await collection.find({}).toArray(); //데이터 모두 가져오기
        client.close();
        
        
        return data4;
    }