from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = await self.scope['user_task']
        self.scope['user'] = user

        if user.is_anonymous:
            await self.close()
        else:
            await self.accept()


    async def receive(self, text_data=None, bytes_data=None):
        await self.send(text_data)


    async def disconnect(self, code):
        pass
