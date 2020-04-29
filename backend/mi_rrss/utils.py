from http import cookies

from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth.models import User, AnonymousUser
from django.db import close_old_connections
from rest_framework_jwt.authentication import BaseJSONWebTokenAuthentication, jwt_get_username_from_payload

from post.serializers import UserRegistrationSerializer


def custom_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserRegistrationSerializer(user, context=('request', request)).data
    }


@database_sync_to_async
def close_connections():
    close_old_connections()


@database_sync_to_async
def get_user_by_username(username):
    try:
        return User.objects.get(username=username)
    except:
        return AnonymousUser()


class JWTAuthFromScope(BaseJSONWebTokenAuthentication):
    def get_jwt_value(self, scope):
        cookie = next(x for x in scope['headers'] if x[0].decode('utf-8') == 'cookie')[1].decode('utf-8')
        return cookies.SimpleCookie(cookie)['JWT'].value

    def authenticate_credentials(self, payload):
        username = jwt_get_username_from_payload(payload)

        if not username:
            raise Exception('Payload no válido')

        try:
            user = get_user_by_username(username)
        except:
            raise Exception('Error obteniendo usuario')
        return user


class MyAuthMiddleWare:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        close_connections()
        user, jwt_value = JWTAuthFromScope().authenticate(scope)
        scope['user_task'] = user
        return self.inner(scope)


def my_auth_middleware_stack(inner):
    return MyAuthMiddleWare(AuthMiddlewareStack(inner))
