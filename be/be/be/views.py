import random
from django.contrib.auth import authenticate,login
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail

@api_view(['POST'])
def user_login(request):
    username = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserRegistrationView(APIView):
    def post(self,request):
        print(request.data)
        return Response({'message':'Api call working'})
    

class SendOTP(APIView):
    def post(self,request):
        user = CustomUser.objects.filter(email = request.data).first()
        if user:
            return JsonResponse({'message': 'Email Already Exists'})
        otp = str(random.randint(100000,999999))
        send_mail('OTP For Registration', f'You OTP Code from DevTester : {otp}',
                 'noreply.devtester@gmail.com',[request.data],fail_silently=False
        )
        return JsonResponse({'OTP':otp})