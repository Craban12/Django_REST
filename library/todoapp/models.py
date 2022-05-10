from django.db import models
from uuid import uuid4
from users.models import User


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    name_project = models.CharField(max_length=64)
    Contributors = models.ManyToManyField(User)
    repository = models.URLField(max_length=254, null=True)


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField()

