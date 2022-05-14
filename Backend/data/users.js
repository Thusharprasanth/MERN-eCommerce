import bcrypt from 'bcryptjs'

const users = [
    {
        name:'admin user',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'local user1',
        password:bcrypt.hashSync('123456',10),
        email:'local@gmail.com',
        isAdmin:false,
    },
    {
        name:'local user2',
        password:bcrypt.hashSync('123456',10),
        email:'local2@gmail.com',
        isAdmin:false,
    },
]

export default users