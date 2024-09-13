import random
from rest_framework.views import APIView
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import CustomUser
from rest_framework import status
from rest_framework.response import Response
from .serializers import CustomUserSerializer,ValidateUserSerilializer
from django.contrib.auth import login,authenticate
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

class SendOTP(APIView):
    def post(self,request):
        serializer = ValidateUserSerilializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = CustomUser.objects.filter(email = email).first()
            if user:
                return JsonResponse({'error': 'Email Already Exists'},status=status.HTTP_400_BAD_REQUEST)
            otp = str(random.randint(100000,999999))
            send_mail('OTP For Registration', f'You OTP Code from DevTester : {otp}',
                 settings.EMAIL_HOST_USER,[email],fail_silently=False)
            return JsonResponse({'OTP':otp},status=status.HTTP_200_OK)


class UserRegister(APIView):
    def post(self,request):
        email,password,first_name,last_name = request.data['email'],request.data['password'],request.data['firstname'],request.data['lastname']
        user = CustomUser.objects.create_user(email,password,first_name,last_name,)        
        if user:
            serializer = CustomUserSerializer(user)
            send_mail('Regitration Sucessful', 
                      f'You Registration Details as below : \nFirst Name : {first_name}\nLast Name : {last_name}\nEmail : {email}\nPassword : {password}',
                 settings.EMAIL_HOST_USER,[email],fail_silently=False)
            return JsonResponse(serializer.data)
        return JsonResponse({status.HTTP_400_BAD_REQUEST})
    
# class UserRegister(APIView):
#     def post(self, request):
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = CustomUser.objects.create_user(
#                 email=request.data['email'],
#                 firstname=request.data['firstname'],
#                 lastname=request.data['lastname'],
#                 password=request.data['password']
#             )
#             return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogin(APIView):
    def post(self,request):
        email,password = request.data.get('email'),request.data.get('password')
        user = authenticate(request,email = email,password = password)
        if user is not None:
            # login(request,user) Not needed for JWT Generation since each request comes with tokens
            refresh = RefreshToken.for_user(user)
            return Response({'refresh':str(refresh),'access':str(refresh.access_token),'user':CustomUserSerializer(user).data},status=status.HTTP_200_OK) 
        else:
            return JsonResponse({'message':'Login not Sucessfull'},status=status.HTTP_400_BAD_REQUEST)


