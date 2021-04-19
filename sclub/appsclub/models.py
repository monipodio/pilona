from django.utils import timezone
from django.db import models
from .models import *
from django.contrib import admin 
from django.contrib.auth.models import AbstractUser
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import Permission
from datetime import datetime

class Param(models.Model):
	tipo = models.CharField(max_length=5,blank=True)
	codigo = models.CharField(max_length=5,blank=True)
	descrip = models.CharField(max_length=70,blank=True)
	valor1 =  models.IntegerField(blank=True)
	valor2 =  models.IntegerField(blank=True)
	valor3 =  models.IntegerField(blank=True)
	fecha1 = models.DateTimeField(default="",null=False)
	fecha2 = models.DateTimeField(default="",null=False)
	hora1 = models.CharField(max_length=5,blank=True)
	hora2 = models.CharField(max_length=5,blank=True)
	corr = models.IntegerField(blank=True)
	switch1 = models.IntegerField(blank=True)
	switch2 = models.IntegerField(blank=True)

	def __str__(self):
		return self.descrip

	class Meta:
		ordering = ['descrip']

class Pedidos(models.Model):
    nombre = models.CharField(max_length=60,blank=True)
    celu   = models.CharField(max_length=14,blank=True)
    fecha  = models.DateTimeField(default="",verbose_name="Fecha de Pedido",null=False)
    direccion = models.CharField(max_length=80,blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ['nombre']


class Diario(models.Model):
	fecha =models.DateTimeField(default="",verbose_name="Fecha de Pedido",null=False)
	corr = models.IntegerField(blank=True)
	nombre = models.CharField(max_length=60,blank=True)
	entrega = models.DateTimeField(default="",verbose_name="Fecha de Pedido",null=False)
	monto = models.IntegerField(blank=True)
	pago = models.IntegerField(blank=True)
	efectivo = models.IntegerField(blank=True)
	retira = models.IntegerField(blank=True)
	notas = models.TextField(blank=True)

	def __str__(self):
		return self.nombre

	class Meta:
		ordering = ['nombre']


class Promos(models.Model):
	cod = models.CharField(max_length=7,blank=True)
	piezas = models.IntegerField(blank=True)
	descrip = models.CharField(max_length=50,blank=True)
	valor = models.IntegerField(blank=True)
	incluye = models.CharField(max_length=60,blank=True)

	def __str__(self):
		return self.descrip

	class Meta:
		ordering = ['descrip']

class Envolturas(models.Model):
	cod = models.CharField(max_length=7,blank=True)
	roll = models.IntegerField(blank=True,default=0)
	envolt = models.CharField(max_length=50,blank=True)
	valor = models.IntegerField(blank=True)

	def __str__(self):
		return self.envolt

	class Meta:
		ordering = ['envolt']

class Rellenos(models.Model):
	cod = models.CharField(max_length=7,blank=True)
	roll = models.IntegerField(blank=True,default=0)
	relle = models.CharField(max_length=50,blank=True)
	valor = models.IntegerField(blank=True)

	def __str__(self):
		return self.roll

	class Meta:
		ordering = ['relle']

class Adicionales(models.Model):
	cod = models.CharField(max_length=7,blank=True)
	descrip = models.CharField(max_length=50,blank=True)
	valor = models.IntegerField(blank=True)

	def __str__(self):
		return self.descrip

	class Meta:
		ordering = ['descrip']

class Otrospermisos(models.Model):
    rut = models.CharField(max_length=10,blank=True)
    class Meta:
        permissions = (
        	('administrador','administrador'),
            )
