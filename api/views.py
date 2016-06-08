from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import Context
from django.template.loader import get_template
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer

def landing_page(request):
	return redirect('/login')

def login_page(request):
	login_template = get_template('api/login.html')
	html = login_template.render()
	return HttpResponse(html)

# @login_required
def home_page(request):
	home_template = get_template('api/index.html')
	html = home_template.render()
	return HttpResponse(html)

def logout_page(request):
	logout_template = get_template('api/logout.html')
	html = logout_template.render()
	return HttpResponse(html)

class UserProfile(APIView):
    
    def get(self,request):
		user = User.objects.get(id=request.user.id)
		serializer = UserSerializer(user, many=False)
		return Response(serializer.data)