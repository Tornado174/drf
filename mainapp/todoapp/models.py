from django.db import models
from usersapp.models import User
from uuid import uuid4


class OnlyActiveManager(models.Manager):
    def get_queryset(self):
        return super(OnlyActiveManager, self).get_queryset().filter(is_active=True)


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=256, unique=True)
    link = models.URLField(max_length=512)
    developer = models.ForeignKey(User, on_delete=models.PROTECT, to_field='username')
    users = models.ManyToManyField(User, related_name='users', blank=True)
    is_active = models.BooleanField(default=True)
    objects = models.Manager()
    active = OnlyActiveManager()

    def __str__(self):
        return self.name


class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    project = models.ForeignKey(Project, models.PROTECT, to_field='name')
    text = models.TextField()
    create = models.DateTimeField(auto_now=False, auto_now_add=True)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(User, on_delete=models.PROTECT, to_field='username')
    is_active = models.BooleanField(default=True)
    objects = models.Manager()
    active = OnlyActiveManager()
