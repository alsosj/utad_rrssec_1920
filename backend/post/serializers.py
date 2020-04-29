from django.contrib.auth.models import User
from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from post.models import Post


class UserRegistrationSerializer(HyperlinkedModelSerializer):
	token = serializers.SerializerMethodField()

	def create(self, validated_data):
		plain_password = validated_data.pop('password')
		instance = self.Meta.model(**validated_data)
		instance.set_password(plain_password)
		instance.save()
		return instance

	def get_token(self, obj):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		payload = jwt_payload_handler(obj)
		token = jwt_encode_handler(payload)
		return token

	class Meta:
		model = User
		fields = ['token', 'username', 'password']


class UserSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ['username']


class PostSerializer(HyperlinkedModelSerializer):
	date = serializers.DateTimeField('%d-%m-%Y %H:%M:%S')
	author = UserSerializer()

	class Meta:
		model = Post
		fields = ['title', 'content', 'date', 'author', 'id']
