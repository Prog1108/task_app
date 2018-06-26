from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets

from django.views import generic
from task_app.models import TaskItem
from task_app.serializers import TaskItemSerializer


class TaskListView(LoginRequiredMixin, generic.TemplateView):
    template_name = 'task_app/index.html'


class TaskItemViewSet(viewsets.ModelViewSet):
    queryset = TaskItem.objects.all()
    serializer_class = TaskItemSerializer

    def get_queryset(self):
        taskitems = TaskItem.objects.filter(author=self.request.user)
        return taskitems.order_by('-created_at')

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

