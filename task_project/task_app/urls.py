from django.urls import path

from task_app import views


app_name = 'task_app'

urlpatterns = [
    path('tasklist/', views.TaskListView.as_view(), name='index'),
]
