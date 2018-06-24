from rest_framework import serializers

from task_app.models import TaskItem


class TaskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = ('task_id', 'text', 'author')
