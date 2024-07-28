from django.contrib import admin

from . models import Apartment, CustomUser
from django.contrib.auth.admin import UserAdmin
admin.site.register(Apartment)


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active')
    ordering = ('email',)
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('patronymic',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('patronymic',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)