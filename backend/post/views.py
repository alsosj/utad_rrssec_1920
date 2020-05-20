import json

from django.shortcuts import render
from django.http import HttpResponse
import twitter


# Create your views here.
#from secret import CONSUMER_KEY, CONSUMER_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET


def use_twitter(request):
    {
        'action': 'post || search',
        'payload': {
            'query': 'Hola!'
        }
    }
    data = json.loads(request.body)

    api = twitter.Api(
        consumer_key='CONSUMER_KEY',
        consumer_secret='CONSUMER_SECRET_KEY',
        access_token_key='ACCESS_TOKEN',
        access_token_secret='ACCESS_TOKEN_SECRET'
    )

    action = data.get('action', None)
    payload = data.get('payload', {})

    if action == 'search':
        query = payload.get('query', None)
        if query:
            results = api.GetSearch(term=query, return_json=True)
            return HttpResponse(status=200, content=json.dumps(results))
    elif action == 'post':
        # print(api.PostUpdate(data['text']))
        pass
    else:
        return HttpResponse(status=400, content=json.dumps({'action': 'Parámetro obligatorio'}))

    return HttpResponse('OK')
