"""django_drf_jwt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from api.views import login_page, logout_page, home_page, UserProfile

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^profile/', home_page),
    url(r'^login/', login_page),
    url(r'^logout/', logout_page),
    url(r'^me/',UserProfile.as_view()),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
]