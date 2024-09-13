from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.




class CustomUserManager(BaseUserManager):
    def create_user(self,email,password,first_name,last_name):
        user = self.model(email = email,first_name = first_name,last_name = last_name)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, first_name,last_name):
        
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, first_name,last_name)
    
class CustomUser(AbstractBaseUser):
    email = models.EmailField(primary_key='True')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # needed below 5 methods to view admin site with custom usermodel
    def has_perm(self, perm, obj=None):
        return True  # Override this method based on your permission logic

    def has_module_perms(self, app_label):
        return True  # Override this method based on your module permission logic

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email