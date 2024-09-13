from django.urls import path
from . import views
#NameSpace is important
app_name = 'food'
urlpatterns = [

    path('',views.indexClassView.as_view(),name = 'index'),
    # path('<int:item_id>',views.detail,name = 'detail'),
    path('<int:pk>',views.detailClassView.as_view(),name = 'detail'),
    path('add',views.create_item_classView.as_view(),name='create_item'),
    path('update/<int:id>/',views.update_item,name='update_item'),
    path('delete/<int:id>/',views.delete_item,name='delete_item'),
]