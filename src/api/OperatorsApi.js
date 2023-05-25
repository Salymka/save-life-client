class OperatorsApi{
    async loginOperator(body) {
        try {
            const response = await fetch(`http://127.0.0.1:5050/operators/login_operator`, {
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

export default new OperatorsApi();