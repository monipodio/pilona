# Generated by Django 2.2.5 on 2021-04-17 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Adicionales',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod', models.CharField(blank=True, max_length=7)),
                ('descrip', models.CharField(blank=True, max_length=50)),
                ('valor', models.IntegerField(blank=True)),
            ],
            options={
                'ordering': ['descrip'],
            },
        ),
        migrations.CreateModel(
            name='Diario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(default='', verbose_name='Fecha de Pedido')),
                ('corr', models.IntegerField(blank=True)),
                ('nombre', models.CharField(blank=True, max_length=60)),
                ('entrega', models.DateTimeField(default='', verbose_name='Fecha de Pedido')),
                ('monto', models.IntegerField(blank=True)),
                ('pago', models.IntegerField(blank=True)),
                ('efectivo', models.IntegerField(blank=True)),
                ('retira', models.IntegerField(blank=True)),
                ('notas', models.TextField(blank=True)),
            ],
            options={
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Envolturas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod', models.CharField(blank=True, max_length=7)),
                ('roll', models.IntegerField(blank=True, default=0)),
                ('envolt', models.CharField(blank=True, max_length=50)),
                ('valor', models.IntegerField(blank=True)),
            ],
            options={
                'ordering': ['envolt'],
            },
        ),
        migrations.CreateModel(
            name='Otrospermisos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rut', models.CharField(blank=True, max_length=10)),
            ],
            options={
                'permissions': (('administrador', 'administrador'),),
            },
        ),
        migrations.CreateModel(
            name='Param',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(blank=True, max_length=5)),
                ('codigo', models.CharField(blank=True, max_length=5)),
                ('descrip', models.CharField(blank=True, max_length=70)),
                ('valor1', models.IntegerField(blank=True)),
                ('valor2', models.IntegerField(blank=True)),
                ('valor3', models.IntegerField(blank=True)),
                ('fecha1', models.DateTimeField(default='')),
                ('fecha2', models.DateTimeField(default='')),
                ('hora1', models.CharField(blank=True, max_length=5)),
                ('hora2', models.CharField(blank=True, max_length=5)),
                ('corr', models.IntegerField(blank=True)),
                ('switch1', models.IntegerField(blank=True)),
                ('switch2', models.IntegerField(blank=True)),
            ],
            options={
                'ordering': ['descrip'],
            },
        ),
        migrations.CreateModel(
            name='Pedidos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=60)),
                ('celu', models.CharField(blank=True, max_length=14)),
                ('fecha', models.DateTimeField(default='', verbose_name='Fecha de Pedido')),
                ('direccion', models.CharField(blank=True, max_length=80)),
            ],
            options={
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Promos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod', models.CharField(blank=True, max_length=7)),
                ('piezas', models.IntegerField(blank=True)),
                ('descrip', models.CharField(blank=True, max_length=50)),
                ('valor', models.IntegerField(blank=True)),
                ('incluye', models.CharField(blank=True, max_length=60)),
            ],
            options={
                'ordering': ['descrip'],
            },
        ),
        migrations.CreateModel(
            name='Rellenos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod', models.CharField(blank=True, max_length=7)),
                ('roll', models.IntegerField(blank=True, default=0)),
                ('relle', models.CharField(blank=True, max_length=50)),
                ('valor', models.IntegerField(blank=True)),
            ],
            options={
                'ordering': ['relle'],
            },
        ),
    ]
