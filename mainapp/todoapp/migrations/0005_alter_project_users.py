# Generated by Django 3.2.10 on 2022-02-10 22:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todoapp', '0004_auto_20220210_1708'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='users', to=settings.AUTH_USER_MODEL),
        ),
    ]
