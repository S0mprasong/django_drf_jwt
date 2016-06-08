from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer

class UserProfile(APIView):
    
    def get(self,request):
		user = User.objects.get(id=request.user.id)
		serializer = UserSerializer(user, many=False)
		return Response(serializer.data)