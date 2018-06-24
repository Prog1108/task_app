
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic

from .forms import RegisterForm


def index(request):
    return render(request, 'accounts/index.html')


class SignUpView(generic.CreateView):
    form_class = RegisterForm
    success_url = reverse_lazy('accounts:login')
    template_name = 'accounts/signup.html'
