from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from post.models import Post
from post.serializers import PostSerializer, UserSerializer, UserRegistrationSerializer


class UserViewSet(ModelViewSet):
	queryset = User.objects.all()
	permission_classes = (AllowAny,)

	def get_serializer_class(self, *args, **kwargs):
		return UserRegistrationSerializer

	def retrieve(self, request, *args, **kwargs):
		serializer = UserSerializer(request.user)
		return Response(serializer.data)

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostViewSet(ModelViewSet):
	#queryset = Post.objects.all()
	permission_classes = (AllowAny,)

	def get_queryset(self):
		mode = self.request.query_params.get('filterByUser', None)
		if mode:
			return Post.objects.filter(author=self.request.user)
		else:
			return Post.objects.all()

	def get_serializer_class(self, *args, **kwargs):
		return PostSerializer

	def create(self, request, *args, **kwargs):
		p = Post.objects.create(
			title=request.data['title'],
			content=request.data['content'],
			author=request.user
		)
		serialized_data = self.get_serializer(p).data
		return Response(serialized_data)

	def destroy(self, request, *args, **kwargs):
		url = request.build_absolute_uri()
		if url.endswith('/'):
			url = url[:-1]
		url = url.split('/')[-1]
		try:
			p = Post.objects.get(id=url)
			if request.user == p.author:
				p.delete()
				return Response(status=status.HTTP_200_OK)
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		except Post.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
