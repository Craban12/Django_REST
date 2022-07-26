from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'uid']


class UserModelstandard(ModelSerializer):
    class Meta:
        model = User
        exclude = ['is_superuser', 'is_staff']

