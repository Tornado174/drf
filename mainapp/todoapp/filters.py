from django_filters import rest_framework as filters
from .models import Project, Todo


class ProjectFilters(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilters(filters.FilterSet):

    class Meta:
        model = Todo
        fields = ['project']
