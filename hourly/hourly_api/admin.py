from django.contrib import admin

from . models import Apartment, CustomUser
from django.contrib.auth.admin import UserAdmin
admin.site.register(Apartment)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    # Определяем поля, которые будут отображаться в списке пользователей
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    ordering = ('email',)
    search_fields = ('email', 'first_name', 'last_name')

    # Определяем поля, которые будут отображаться в форме редактирования пользователя
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Личная информация', {'fields': ('first_name', 'last_name', 'patronymic')}),
        ('Права доступа', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Даты', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')}
         ),
    )

    # Указываем, какое поле использовать для аутентификации
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


# Регистрируем модель и класс администратора
admin.site.register(CustomUser, CustomUserAdmin)
