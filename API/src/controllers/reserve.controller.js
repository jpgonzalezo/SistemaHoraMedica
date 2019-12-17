import Reserve from '../models/Reserve';

export async function createReserve(req,res){
    try{
        const { start, title, userid, hour } = req.body;
        const newReserve = await Reserve.create({
            start,
            title,
            userid,
            hour
        },{
            fields:['start','title','userid','hour']
        });
        res.json({message: 'New reserve created'});
    }
    catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }

}

export async function getReserves(req,res){
    try{
        const reserves = await Reserve.findAll({
            attributes: ['id','userid','start','title','hour'],
            order: [
                ['id','DESC']
            ]
        })
        res.json({reserves})
    }
    catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }

}

export async function deleteReserve(req,res){
    try{
        const { reserveID } = req.params 
        const reserve = await Reserve.destroy({where:{id : reserveID}});
        res.json({
            message: 'Reserve deleted successfully'
        });
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}

export async function getReservesUser(req,res){
    try{
        //const { userID } = req.params 
        //const reserves = await Reserve.findAll({where:{userid : userID}});
        res.json([]);
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}