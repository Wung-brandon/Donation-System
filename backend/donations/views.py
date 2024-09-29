from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import AnonymousDonor, User, Donation, Cause
from .serializers import UserSerializer, DonationSerializer, CauseSerializer, AnonymousDonorSerializer

User = get_user_model()

class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class AnonymousDonorCreateView(ListCreateAPIView):
    queryset = AnonymousDonor.objects.all()
    serializer_class = AnonymousDonorSerializer

class CauseListCreateView(ListCreateAPIView):
    queryset = Cause.objects.filter(is_active=True)
    serializer_class = CauseSerializer

class CauseDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cause.objects.all()
    serializer_class = CauseSerializer
    

class DonationCreateView(ListCreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

   