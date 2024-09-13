from django.urls import path
from .views import SendOTP,UserRegister,UserLogin

urlpatterns = [
    path('validate/',SendOTP.as_view(),name='email_validate'),
    path('register/',UserRegister.as_view(),name='register'),
    path('login/',UserLogin.as_view(),name='login')
]