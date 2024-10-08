from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name','email']

class ValidateUserSerilializer(serializers.Serializer):
    email = serializers.EmailField()