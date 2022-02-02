from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from .models import User
from .serializers import UserModelSerializerBase, UserModelSerializer, SingleUserModelSerializer


class UsersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializerBase

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializer
        return UserModelSerializerBase


class SingleUserView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = SingleUserModelSerializer
