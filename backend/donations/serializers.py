from .models import User, Donation, Cause, AnonymousDonor
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name')
        read_only_fields = ["id"]
        
class AnonymousDonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonymousDonor
        fields = ('id', 'email', 'name', 'donation_date')
        read_only_fields = ["id"]

class CauseSerializer(serializers.ModelSerializer):
    donation_progress = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()

    class Meta:
        model = Cause
        fields = (
            'id', 'title', 'owner', 'description', 'goal_amount', 
            'amount_raised', 'total_donors', 'donation_count', 
            'start_date', 'donation_progress', 'end_date'
        )
        read_only_fields = ['id', 'owner']

    def get_owner(self, obj):
        # Access the full_name of the owner from the User model
        return obj.owner.get_full_name()
    
        
    def get_donation_progress(self, obj):
        return (obj.amount_raised / obj.goal_amount) * 100 if obj.goal_amount else 0
        
class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ("id", "donor", "anonymous_donor", "cause", "amount", "donation_date")