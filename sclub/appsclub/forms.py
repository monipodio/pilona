from django import forms
from datetime import datetime
#from gmiproj.gmiapp.models import Cuidadores

from misitio.ai.models import Pedidos, Diario
from django import forms

from django.forms import ModelForm, ClearableFileInput
from .models import UploadFile

class PedidosForm(forms.ModelForm):
	class Meta:
		model = Pedidos

		fields = "__all__"

		def __str__(self):
			return self.celu


class DiarioForm(forms.ModelForm):
	class Meta:
		model = Diario

		fields = "__all__"

		def __str__(self):
			return self.corr
