from django.db import models


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
        return f"{self.title} - {self.price} {self.currency} - beds: {self.beds} - nights: {self.nights}"






