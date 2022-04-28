from rest_framework.viewsets import ModelViewSet
from .models import Author
from .serializes import AuthorModelSerializer


class AuthorViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

