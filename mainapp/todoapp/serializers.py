from rest_framework import serializers
from .models import Project, Todo


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['name', 'users', 'link']


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ['project', 'creator', 'update', 'text']

