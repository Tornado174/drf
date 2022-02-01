from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from .views import UsersView
from .models import User


class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/users/')
        view = UsersView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/users/', {'username': 'test_user', 'email': 'testuser@mail.com',
                                           'password': 'test_user'}, format='json')
        view = UsersView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/users/', {'username': 'test_user', 'email': 'testuser@mail.com',
                                           'password': 'test_user'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@mail.ru', 'admin')
        force_authenticate(request, admin)
        view = UsersView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
