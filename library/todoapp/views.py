from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, AdminRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from rest_framework.viewsets import ViewSet


class ProjectPaginator(LimitOffsetPagination):
    default_limit = 10


class TodoPaginator(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    renderer_classes = (JSONRenderer, AdminRenderer,)
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPaginator
    filterset_fields = ['name_project']


class TodoViewSet(ModelViewSet):
    renderer_classes = (JSONRenderer, AdminRenderer,)
    queryset = Todo.objects.all()
    pagination_class = TodoPaginator
    serializer_class = TodoModelSerializer
    filterset_fields = ['created_at']
    permission_classes = {IsAuthenticated}
