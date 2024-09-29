from django.urls import path
from .views import (
    UserProfileView, 
    AnonymousDonorCreateView, 
    CauseListCreateView, 
    CauseDetailView,
    DonationCreateView,
)


urlpatterns = [
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('anonymous-donor/create/', AnonymousDonorCreateView.as_view(), name='anonymous-donor-create'),
    path('causes/', CauseListCreateView.as_view(), name='cause-list-create'),
    path('causes/<int:pk>/', CauseDetailView.as_view(), name='cause-detail'),
    path('donations/create/', DonationCreateView.as_view(), name='donation-create'),
]
