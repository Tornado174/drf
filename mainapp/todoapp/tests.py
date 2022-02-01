from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from mixer.backend.django import mixer
from .models import Project, Todo


class TestProjectViewSet(TestCase):
    def test_get_getail(self):
        client = APIClient()
        project = mixer.blend(Project)
        response = client.get(f'/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSetNew(APITestCase):

    def test_get_list(self):
        response = self.client.get('/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
