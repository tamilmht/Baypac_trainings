# Generated by Django 5.0.6 on 2024-06-19 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_moviedata_typ'),
    ]

    operations = [
        migrations.AddField(
            model_name='moviedata',
            name='Image',
            field=models.ImageField(default='MovieImages/movie_placeholder.jpg', upload_to='MovieImages/'),
        ),
    ]
