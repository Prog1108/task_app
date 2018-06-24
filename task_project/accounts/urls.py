
from django.conf.urls import include, url
from django.contrib.auth import views as auth_views

from . import views
from .forms import LoginForm


app_name = 'accounts'


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^signup/$', views.SignUpView.as_view(), name='signup'),
    url(r'^login/$',
        auth_views.login,
        {'template_name': 'accounts/login.html', 'authentication_form': LoginForm},
        name='login'
    ),
    url(r'^logout/$',
        auth_views.logout,
        {'template_name': 'accounts/logout.html'},
        name='logout'
    ),
]
