from django.db import models

GENDER_CHOICES = (('M', 'Male'), ('F', 'Female'))


class Survivor(models.Model):
    """
        Database model that'll represent all the survivors.
    """
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=3)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)
    reports = models.IntegerField(default=0)
    infected = models.BooleanField(default=False)

    def __str__(self):
        return self.name
