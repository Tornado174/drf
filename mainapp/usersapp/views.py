from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from .models import User
from .serializers import UserModelSerializer, SingleUserModelSerializer


class UsersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class SingleUserView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = SingleUserModelSerializer
