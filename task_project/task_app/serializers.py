from rest_framework import serializers

from task_app.models import TaskItem, TaskItemDone


class TaskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = ('task_id', 'text')


class TaskItemDoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItemDone
        fields = ('task_id', 'text')
