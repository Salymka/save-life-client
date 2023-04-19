class UsersApi{
    async loginUser(body) {
        try {
            const response = await fetch('http://127.0.0.1:5050/users/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: body
            })
            return await response.json()

        } catch (e) {
            console.log(e)
        }
    }

    async createUser(body) {
        try {
            const response = await fetch('http://127.0.0.1:5050/users/create_user', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: body
            })
            return await response.json()

        } catch (e) {
            console.log(e)
        }
    }


}

export default new UsersApi();