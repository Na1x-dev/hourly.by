from django.db import models
from django.contrib.auth.hashers import make_password

class Apartment(models.Model): #card-content
    room_type = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    size = models.CharField(max_length=100)
    rating = models.CharField(max_length=10)
    price_per_day = models.CharField(max_length=50)
    image_url = models.TextField()


    def __str__(self):
        return f"{self.title} - {self.price_per_day} - {self.location} - {self.rating}"

class User(models.Model):
    first_name = models.CharField(max_length=30, verbose_name='Имя')
    last_name = models.CharField(max_length=30, verbose_name='Фамилия')
    patronymic = models.CharField(max_length=30, verbose_name='Отчество', blank=True)
    email = models.EmailField(unique=True, verbose_name='Электронная почта')
    password = models.CharField(max_length=128, verbose_name='Пароль')

    def save(self, *args, **kwargs):
        # Хешируем пароль перед сохранением
        if self.pk is None:  # Проверяем, что это новый объект
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.last_name} {self.first_name[0]}. {self.patronymic[0]}."

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'




