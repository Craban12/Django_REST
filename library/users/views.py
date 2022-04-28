from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializes import UserModelSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
