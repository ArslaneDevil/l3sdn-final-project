export default {
    
    getUsers: function(){
        const Role = {
            worker : 0,
            manager : 1,
            RH : 2,
            admin : 3
        }

        return [
            {
                id: 1,
                first_name: 'Romain',
                name: 'Dupont',
                role: Role.manager,
                supervisor: 2,
                username: 'Romain.dupont',
                password : '123'
            },
            {
                id: 2,
                first_name: 'Charlotte',
                name: 'Giroud',
                role: Role.RH,
                supervisor: null,
                username: 'Charlotte.Giroud',
                password : '123'
            },
            {
                id: 3,
                role: Role.admin,
                supervisor: 1,
                username: 'admin',
                password: '123'
            },
            {
                id: 4,
                role: Role.admin,
                supervisor: 1,
                username: 'test',
                password: '123'
            }
        ]
    }
    
}