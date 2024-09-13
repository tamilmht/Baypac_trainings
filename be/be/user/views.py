from restframework.views import APIView
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import CustomUser

# Create your views here.
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