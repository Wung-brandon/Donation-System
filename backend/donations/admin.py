from django.contrib import admin
from .models import User, AnonymousDonor, Cause, Donation

# Register your models here.

admin.site.register(User)
admin.site.register(AnonymousDonor)
admin.site.register(Cause)
admin.site.register(Donation)