"""mi_rrss URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

from post.api import PostViewSet, UserViewSet
from post.views import use_twitter

router = routers.DefaultRouter()
router.register(r'post', PostViewSet, basename='Post')
router.register(r'user', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url('^api/', include(router.urls)),
    path('auth/', obtain_jwt_token),  # Sesión
    path('twitter/', use_twitter),
    url(r'', TemplateView.as_view(template_name='index.html')),
]
