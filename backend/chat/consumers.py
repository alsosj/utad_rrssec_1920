import json

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = await self.scope['user_task']
        self.scope['user'] = user
        self.room_name = 'general'
        self.room_group_name = 'chat_general'
        print(self.channel_name)


        if user.is_anonymous:
            await self.close()
        else:
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()


    async def receive(self, text_data=None, bytes_data=None):

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'message',
                'message': text_data,
                'username': self.scope['user'].username
            }
        )


    async def message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'username': event['username']
        }))


    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
