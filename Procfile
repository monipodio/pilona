CREATE TABLE ai_apoderados   (
  id   integer(11) NOT NULL AUTO_INCREMENT, 
  rut   varchar(10)  NOT NULL,
  nombre   varchar(80)  NOT NULL,
  direccion   varchar(60)  NOT NULL,
  comuna   varchar(5)  NOT NULL,
  region   varchar(2)  NOT NULL,
  fono_apod   varchar(12)  NOT NULL,
  fono2_apod   varchar(12)  NOT NULL,
  parentezco   varchar(50)  NOT NULL,
  correo   varchar(40)  NOT NULL,
  notas   text  NOT NULL,
 PRIMARY KEY (id) 
);

CREATE TABLE ai_clientes (
  id   INTEGER(11)  NOT NULL AUTO_INCREMENT,
  rut   VARCHAR(10)  NULL,
  nombre   VARCHAR(30)  NULL,
   PRIMARY KEY (id)
);

CREATE TABLE ai_anticipos (
id INTEGER(10) NOT NULL AUTO_INCREMENT,
rut VARCHAR(10),
fecha datetime, 
mes VARCHAR(2),
ano VARCHAR(4),
valor INTEGER,
abon VARCHAR(1),
notas TEXT,
boleta INTEGER,
sw_abono VARCHAR(1),
cheque VARCHAR(5),
banco VARCHAR(2),
fecha_cheque datetime,
PRIMARY KEY (id)
);

CREATE TABLE   ai_cuidadores   (
  id   integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
  rut   varchar(10)  NOT NULL,
  nombre   varchar(80)  NOT NULL,
  fe_ini   datetime  NULL,
  direccion   varchar(60)  NOT NULL,
  comuna   varchar(5)  NOT NULL,
  region   varchar(2)  NOT NULL,
  fono_cuid   varchar(12)  NOT NULL,
  fono2_cuid   varchar(12)  NOT NULL,
  fe_nac   datetime  NULL,
  sexo   varchar(1)  NOT NULL,
  correo   varchar(40)  NOT NULL,
  notas   text  NOT NULL,
  tipo   varchar(1)  NOT NULL,
  media   varchar(100)  NOT NULL,
  clasi   varchar(1)  NOT NULL,
  estado   bool  NOT NULL,
  instr   varchar(1)  NOT NULL,
  elim_foto   varchar(1)  NOT NULL,
  extran   varchar(1)  NOT NULL,
  apago1   INTEGER  NULL,
  apago2   INTEGER  NULL,
  apago3   INTEGER  NULL,
  nacionalidad   VARCHAR(30)  NULL,
  ecivil   VARCHAR(1)  NULL,
  vence_contrato   datetime  NULL,
  afp   VARCHAR(30)  NULL,
  salud   VARCHAR(30)  NULL
)