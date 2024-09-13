from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieSerializer
from .models import Moviedata

# Create your views here.

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Moviedata.objects.all()
    serializer_class = MovieSerializer

class ActionMovieViewSet(viewsets.ModelViewSet):
    queryset = Moviedata.objects.filter(Typ = 'action')
    serializer_class = MovieSerializer

class ComedyMovieViewSet(viewsets.ModelViewSet):
    queryset = Moviedata.objects.filter(Typ = 'comedy')
    serializer_class = MovieSerializer