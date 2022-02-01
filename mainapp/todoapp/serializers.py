from rest_framework import serializers
from .models import Project, Todo


class ProjectSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    developer = serializers.StringRelatedField()
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'developer', 'users', 'link']


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ['id', 'project', 'creator', 'update', 'text']
