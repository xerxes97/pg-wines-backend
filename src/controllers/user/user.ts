import db from '../../db'
import { v4 as uuidv4 } from 'uuid';
import { Op } from "sequelize";

const { User } = db;
const exclude = ['createdAt', 'updatedAt']

export const newUser = async (req: any, res: any, _: any) => {
    if (!req.body.displayName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Bad request' })        
    }
    let photoURL=null;
    if(req.body.photoURL)photoURL=req.body.photoURL
    const { email, displayName, password} = req.body
    try {
        const exist = await User.findOne({ where: { email: email } })
        if (exist !== null) { return res.status(500).send({ message: 'El email ya existe.' }) }
        const exist2 = await User.findOne({ where: { displayName: displayName } })
        if (exist2 !== null) { return res.status(500).json({ message: 'El nombre de usuario ya existe.' }) }
        const id = uuidv4()
        const user = { id, displayName, password, email, photoURL }
        
        await User.create(user)
        return res.send(user)
    } catch (error) {
        return res.status(500).json({ message: 'Error with DB' })
    }
}

export const updateUser = async (req: any, res: any, _: any) => {
    const { idUser} = req.body
    try {
        const user = await User.findByPk(idUser)
        req.body.displayName ? user.displayName = req.body.displayName : '';
        req.body.password ? user.password=req.body.password:'';
        req.body.photoURL?user.photoURL=req.body.photoURL:'';
        user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: 'Error with DB' })
    };
};


export const getAllUsers = async (req: any, res: any, next: any) => {
    let {displayName, admin} = req.query
    if(displayName === 'undefined') displayName = ''
    if(admin === 'undefined') admin = undefined
    try {
        const user = await User.findAll({
            where: admin !== undefined ?
            {
                displayName: { [Op.iLike]: `%${displayName}%` },
                admin
            } : {
                displayName: { [Op.iLike]: `%${displayName}%` }
            },
            attributes: {
                exclude: [...exclude,'password']
            },
            order: ['displayName']
        });
        return res.send(user)
    } catch (error) {
        next({ message: 'Bad Request' })
    }
}

export const deleteUser = async (req: any, res: any, next: any) => {
    if (!req.params.idUser) {
        return res.status(400).json({ message: 'ID of the user is needed', status: 400 })
    }
    const { idUser } = req.params;
    try {
        await User.destroy({
            where: {
                id: idUser
            }
        })
        return res.send('The user has been deleted.')
    } catch (error) {
        next(error);
    }
}



export const loginUser = async (req: any, res: any, next: any) => {
    const {email, displayName, password} = req.body
    if(displayName) {
        try {
            const isUser = await User.findOne({
                where: {
                email
                }
            })
            if (!isUser) {
                return res.send('Inexistent User')
            }
            else if(isUser.password!==password){
                return res.send('Invalid Password')
            }
            else return res.send(isUser)
        } catch (err) {
            next(err)
        }
    }
}