# Generated by Django 5.0.6 on 2024-06-11 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='item_image',
            field=models.CharField(default='.\\static\x0cood\nofood.png', max_length=500),
        ),
    ]
