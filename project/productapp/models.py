from django.db import models
class products(models.Model):
    Title=models.CharField(max_length=255)
    Price=models.FloatField()
    Description=models.TextField()
    Category=models.CharField(max_length=255)
    Image=models.URLField()
    Sold=models.BooleanField()
    IsSale=models.BooleanField()
    DateOfSale=models.DateField(null=True)

    def __str__(self):
        return self.name

