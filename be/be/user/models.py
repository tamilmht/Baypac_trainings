from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.




class CustomUserManager(BaseUserManager):
    def create_user(self,email,password,firstname,lastname):
        user = self.model(email = email,password=password,firstname = firstname,lastname = lastname)
        user.save()
        return user
    
class CustomUser(AbstractBaseUser):
    email = models.EmailField(primary_key='True')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    def __str__(self):
        return self.email

class OTP(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)