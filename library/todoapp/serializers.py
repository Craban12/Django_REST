from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, Todo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    Contributors = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
