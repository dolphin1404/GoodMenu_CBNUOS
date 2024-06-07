from django.db import models

# Create your models here.
# myapp/models.py

# myapp/models.py

from django.db import models

# models.py

from django.db import models

class Store(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50)
    category_1 = models.CharField(max_length=50, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name
