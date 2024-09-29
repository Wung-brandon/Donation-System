
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.full_name
    
class AnonymousDonor(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    donation_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.email
    
class Cause(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    amount_raised = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    total_donors = models.IntegerField(default=0)
    donation_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="causes")
    
    def __str__(self) -> str:
        return f"{self.title} - {self.goal_amount}"
    
    @property 
    def is_goal_reached(self):
        return self.amount_raised >= self.goal_amount
    
    @property
    def progress_percentage(self):
        return (self.amount_raised / self.goal_amount) * 100 if self.goal_amount > 0 else 0
    
    def update_donation_stats(self):
        self.amount_raised = self.donations.aggregate(total=Sum('amount'))['total'] or 0
        self.total_donors = self.donations.values('donor').distinct().count() if self.donations.filter(donor__isnull=False).exists() else 0
        self.donation_count = self.donations.count()
        self.is_active = self.amount_raised < self.goal_amount
        self.save()

    def save(self, *args, **kwargs):
        if self.amount_raised >= self.goal_amount:
            self.is_active = False
        super().save(*args, **kwargs)

class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name="donations")
    anonymous_donor = models.ForeignKey('AnonymousDonor', on_delete=models.CASCADE, blank=True, null=True, related_name="donations")
    cause = models.ForeignKey(Cause, related_name="donations", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_date = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.cause.update_donation_stats()
    
    def __str__(self):
        if self.donor:
            return f"{self.donor.get_full_name()} - {self.amount} for {self.cause.title}"
        elif self.anonymous_donor:
            return f"{self.anonymous_donor.name} - {self.amount} for {self.cause.title}"
        return f"Donation {self.amount} for {self.cause.title}"
    
    
    # def save(self):
    #     if self.amount < 0:
    #         raise ValueError("Donation amount cannot be negative.")
        # if (self.cause.amount_raised > self.cause.goal_amount):
        #     raise ValueError("Donation amount Cannot exceed goal amount.")