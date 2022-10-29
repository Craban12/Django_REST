from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet, GenericViewSet, ReadOnlyModelViewSet
from rest_framework.renderers import JSONRenderer, AdminRenderer


from .models import User
from .serializers import UserModelSerializer, UserModelstandard


class UserViewSet(ReadOnlyModelViewSet):
    renderer_classes = (JSONRenderer, AdminRenderer)
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelstandard
        return UserModelSerializer
