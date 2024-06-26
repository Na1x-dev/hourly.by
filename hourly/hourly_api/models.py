from django.db import models


class Apartment(models.Model):
    title = models.CharField(max_length=255)
    price = models.FloatField()
    currency = models.CharField(max_length=1)
    total_price = models.FloatField()
    currency_total_price = models.CharField(max_length=1)
    nights = models.IntegerField()
    availability_start = models.DateField()
    availability_end = models.DateField()
    rating = models.FloatField()
    size = models.IntegerField
    size_unit = models.CharField(max_length=5)
    capacity = models.IntegerField()
    beds = models.IntegerField()
    distance_to_sea = models.IntegerField()
    distance_to_sea_unit = models.CharField(max_length=5)
    address = models.CharField(max_length=255)
    link = models.TextField()
    room_image = models.TextField()

    def __str__(self):
        return f"{self.title} - {self.price} {self.currency} - beds: {self.beds} - nights: {self.nights}"






