class MessagesApi{
    async createAlertMessage({body, userId}) {
        try {
            const response = await fetch(`http://127.0.0.1:5050/messages/send_alert_message/${userId}`, {
                method: 'POST',
                body: body
            })
            return await response.json()

        } catch (e) {
            console.log(e)
        }
    }

    async getUserMessages(userId) {
        try {
            const response = await fetch(`http://127.0.0.1:5050/messages/user_messages/${userId}`, {
                method: 'GET',
            })
            return await response.json()

        } catch (e) {
            console.log(e)
        }
    }

    async deleteUserMessages(messageId) {
        try {
            const response = await fetch(`http://127.0.0.1:5050/messages/delete_message/${messageId}`, {
                method: 'DELETE',
            })
            return await response.json()

        } catch (e) {
            console.log(e)
        }
    }

    async getGlobalMessages() {
        try {
            const response = await fetch(`http://127.0.0.1:5050/messages/global_messages`, {
                method: 'GET',
            })
            const data = await response.json()
            console.log(data, "data")
            return data

        } catch (e) {
            console.log(e)
        }
    }



}

export default new MessagesApi();