import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Todo, Project
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_todoes(self, info):
        return Todo.objects.all()


schema = graphene.Schema(query=Query)
