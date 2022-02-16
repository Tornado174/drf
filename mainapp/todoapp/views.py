from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectSerializer, ProjectSerializerBase, TodoSerializer
from .filters import ProjectFilters, TodoFilters
from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectLimitOffsetPaginationViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Project.active.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilters

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectSerializer
        return ProjectSerializerBase

    def destroy(self, request, *args, **kwargs):
        project = self.get_object()
        project.is_active = False
        project.save()
        return Response(status=status.HTTP_200_OK)


class TodoLimitOffsetPaginationViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Todo.active.all()
    serializer_class = TodoSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_class = TodoFilters

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_200_OK)
