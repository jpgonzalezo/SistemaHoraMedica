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
        const { userid } = req.params 
        const reserves = await Reserve.findAll({
            attributes: ['id','userid','start','title','hour'],
            where:{userid}
        });
        res.json(reserves);
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}

export async function updateReserve(req,res){
    try{
        const { reserveID } = req.params
        const { start, title, hour } = req.body
        const reserves = await Reserve.findAll({
            attributes: ['id','userid','start','title','hour'],
            order: [
                ['id','DESC']
            ]
        })
        if(reserves.length > 0){
            reserves.forEach(async reserve =>{
                if(reserve.id == reserveID){
                    await reserve.update({
                        start: start,
                        title: title,
                        hour: hour
                    })
                }
            })
        }
        res.json({
            message: 'Reserve updated successfully'
        });
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}