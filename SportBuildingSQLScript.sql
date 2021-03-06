USE [master]
GO
/****** Object:  Database [SportBuilding]    Script Date: 28/03/2020 15:47:24 ******/
CREATE DATABASE [SportBuilding]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SportBuilding', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\SportBuilding.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SportBuilding_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\SportBuilding_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SportBuilding] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SportBuilding].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SportBuilding] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SportBuilding] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SportBuilding] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SportBuilding] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SportBuilding] SET ARITHABORT OFF 
GO
ALTER DATABASE [SportBuilding] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SportBuilding] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SportBuilding] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SportBuilding] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SportBuilding] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SportBuilding] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SportBuilding] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SportBuilding] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SportBuilding] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SportBuilding] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SportBuilding] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SportBuilding] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SportBuilding] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SportBuilding] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SportBuilding] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SportBuilding] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [SportBuilding] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SportBuilding] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SportBuilding] SET  MULTI_USER 
GO
ALTER DATABASE [SportBuilding] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SportBuilding] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SportBuilding] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SportBuilding] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SportBuilding] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SportBuilding] SET QUERY_STORE = OFF
GO
USE [SportBuilding]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_RetornaEspecialidadePorProf]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_RetornaEspecialidadePorProf] (@IDProfissional Int) RETURNS VARCHAR(255) 

AS 

BEGIN 
declare @resultado varchar(200);
	declare @virgula varchar(2);

	set @virgula = '';
	set @resultado = '';

select @resultado = @resultado + @virgula + e.Descricao, @virgula = ';'
		from ProfissionalEspecialidades PE inner join Especialidades E
											on pe.IDEspecialidade = e.ID
		where pe.IDProfissional = @IDProfissional	
		
		RETURN @resultado END


											
GO
/****** Object:  UserDefinedFunction [dbo].[fn_RetornaMediaNotaPorProfissional]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_RetornaMediaNotaPorProfissional] (@IDProfissional int) RETURNS Numeric(38,2)
AS 
		  
BEGIN 
declare @resultado Numeric(38,2);
	
set @resultado = (SELECT CONVERT(NUMERIC(10,2), (SUM(np.Nota) /								
							CONVERT(NUMERIC(10,2),(SELECT COUNT(ID) 
							 from NotasProfissionais where IDProfissional = @IDProfissional)))) AS MediaFinal
		FROM NotasProfissionais np
		where IDProfissional = @IDProfissional)
			

RETURN @resultado END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_RetornaQTDEAulaPorProfissional]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[fn_RetornaQTDEAulaPorProfissional] (@IDProfissional int) RETURNS int
AS 
		  
BEGIN 
declare @resultado int;
	
set @resultado = (SELECT COUNT(ID) 
		FROM PedidoAula 
		where IDProfissional = @IDProfissional)
			

RETURN @resultado END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_RetornaRolesPorUsuario]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_RetornaRolesPorUsuario] (@IDUsuario Int) RETURNS VARCHAR(255) 

AS 

BEGIN 
declare @resultado varchar(200);
	declare @virgula varchar(2);

	set @virgula = '';
	set @resultado = '';

		SELECT @resultado = @resultado + @virgula + rol.Name, @virgula = ';' 
				 FROM Profissionais p 
					INNER JOIN AspNetUsers usr ON
						usr.UserName = p.UserName
					INNER JOIN AspNetUserRoles ruser ON
						ruser.UserId = usr.Id
					INNER JOIN AspNetRoles rol ON
						rol.Id = ruser.RoleId
				 WHERE p.ID = @IDUsuario 
 RETURN @resultado END



											
GO
/****** Object:  Table [dbo].[Bairro]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bairro](
	[ID] [int] NOT NULL,
	[Descricao] [varchar](100) NULL,
 CONSTRAINT [PK_Bairro] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profissionais]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profissionais](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](250) NOT NULL,
	[Idade] [int] NOT NULL,
	[Endereco] [nvarchar](max) NOT NULL,
	[NumeroRegistro] [nvarchar](20) NULL,
	[Email] [varchar](100) NOT NULL,
	[UserName] [varchar](25) NOT NULL,
	[Status] [int] NOT NULL,
	[Sexo] [char](1) NOT NULL,
	[IDPais] [int] NOT NULL,
	[IDCidade] [int] NOT NULL,
	[IDBairro] [int] NOT NULL,
	[IDUF] [int] NOT NULL,
	[Comentario] [varchar](max) NULL,
 CONSTRAINT [PK_Profissionais] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Condominios]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Condominios](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CNPJ] [varchar](25) NOT NULL,
	[NomeCondominio] [varchar](255) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[IDPais] [int] NULL,
	[IDCidade] [int] NULL,
	[IDUF] [int] NULL,
	[IDBairro] [nchar](10) NULL,
	[Endereco] [varchar](255) NULL,
	[Celular] [varchar](20) NULL,
	[NomeResponsavel] [varchar](150) NULL,
 CONSTRAINT [PK_Condominios] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VW_ProfissionaisDadosCruzados]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW  [dbo].[VW_ProfissionaisDadosCruzados]
as

select  p.ID,
		Nome,
		Idade,
		b.descricao as Bairro,
		Endereco,
		NumeroRegistro,	
		Email,	
		UserName,
		Sexo,
		Comentario,
		Status	,
		[dbo].[fn_RetornaEspecialidadePorProf](p.ID) as Especialidades,
		[dbo].[fn_RetornaRolesPorUsuario](p.ID) as Roles,
		'' as IDCondominio,
		'' as    NomeCondominio,
	   '' as Celular,
	   '' as  NomeResponsavel,
	   '' as CNPJ
from [dbo].[Profissionais] P inner join dbo.Bairro B
							on p.IDBairro = b.ID
union all
select '' as ID,
       NomeCondominio as Nome,
	   '' as Idade,
	   '' as Bairro,
	   Endereco,
	   ''  as NumeroRegistro,
	   Email,
	   Email as UserName,
	   '' as Sexo,
	   ''  as  Comentario,
	   '' as Status,
	   '' Especialidades,
	   'Condomino' as Roles,
	   ID as IDCondominio,
	   NomeCondominio,
	   Celular,
	   NomeResponsavel,
	   CNPJ
from dbo.Condominios






						
									

									
													


GO
/****** Object:  View [dbo].[VW_NotasProfissionais]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[VW_NotasProfissionais]
as
select ID, [dbo].[fn_RetornaMediaNotaPorProfissional](ID)as MediaNota
from Profissionais
GO
/****** Object:  Table [dbo].[Especialidades]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidades](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Descricao] [nvarchar](250) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Especialidades] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProfissionalEspecialidades]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProfissionalEspecialidades](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDProfissional] [int] NOT NULL,
	[IDEspecialidade] [int] NOT NULL,
	[ProfissionalID] [int] NULL,
	[EspecialidadeID] [int] NULL,
 CONSTRAINT [PK_ProfissionalEspecialidades] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VW_ListaProfissionais]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[VW_ListaProfissionais]
as
select p.ID as IDProfissional,
      p.Nome as NomeProfissional,
	  p.Idade,
	  p.Sexo,
	  p.UserName,
	  b.ID as IDBairro,
	  b.Descricao as Bairro,
	  e.ID as IDEspecialidade,
	  e.Descricao as Especialidades,
	 [dbo].[fn_RetornaMediaNotaPorProfissional](p.Id) as MediaNotas,
[dbo].[fn_RetornaQTDEAulaPorProfissional](p.ID) as QtdAulas


from Profissionais p  inner join ProfissionalEspecialidades pe
							 on p.ID = pe.IDProfissional
							   inner join Bairro b 
							  on p.IDBairro = b.ID
							    inner join Especialidades e 
							 on pe.IDEspecialidade = e.ID
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cidade]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cidade](
	[ID] [int] NOT NULL,
	[Descricao] [varchar](100) NULL,
 CONSTRAINT [PK_Cidade] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotasProfissionais]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotasProfissionais](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDProfissional] [int] NULL,
	[IDCondominio] [int] NULL,
	[Nota] [int] NULL,
 CONSTRAINT [PK_NotasProfissionais] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pais]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pais](
	[ID] [int] NOT NULL,
	[Descricao] [varchar](100) NULL,
 CONSTRAINT [PK_Pais] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PedidoAula]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PedidoAula](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDProfissional] [int] NULL,
	[IDCondominio] [int] NULL,
	[Data] [datetime] NULL,
 CONSTRAINT [PK_PedidoAula] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UF]    Script Date: 28/03/2020 15:47:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UF](
	[ID] [int] NOT NULL,
	[Descricao] [varchar](100) NULL,
 CONSTRAINT [PK_UF] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 28/03/2020 15:47:24 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_UserId]    Script Date: 28/03/2020 15:47:24 ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_UserId]    Script Date: 28/03/2020 15:47:24 ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_RoleId]    Script Date: 28/03/2020 15:47:24 ******/
CREATE NONCLUSTERED INDEX [IX_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_UserId]    Script Date: 28/03/2020 15:47:24 ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserRoles]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 28/03/2020 15:47:24 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_ProfissionalEspecialidades_EspecialidadeID]    Script Date: 28/03/2020 15:47:24 ******/
CREATE NONCLUSTERED INDEX [IX_ProfissionalEspecialidades_EspecialidadeID] ON [dbo].[ProfissionalEspecialidades]
(
	[EspecialidadeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_ProfissionalEspecialidades_ProfissionalID]    Script Date: 28/03/2020 15:47:24 ******/
CREATE NONCLUSTERED INDEX [IX_ProfissionalEspecialidades_ProfissionalID] ON [dbo].[ProfissionalEspecialidades]
(
	[ProfissionalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ('') FOR [Email]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ('') FOR [UserName]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ('M') FOR [Sexo]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ((1)) FOR [IDPais]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ((1)) FOR [IDCidade]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ((1)) FOR [IDBairro]
GO
ALTER TABLE [dbo].[Profissionais] ADD  DEFAULT ((1)) FOR [IDUF]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[ProfissionalEspecialidades]  WITH CHECK ADD  CONSTRAINT [FK_ProfissionalEspecialidades_Especialidades_EspecialidadeID] FOREIGN KEY([EspecialidadeID])
REFERENCES [dbo].[Especialidades] ([ID])
GO
ALTER TABLE [dbo].[ProfissionalEspecialidades] CHECK CONSTRAINT [FK_ProfissionalEspecialidades_Especialidades_EspecialidadeID]
GO
ALTER TABLE [dbo].[ProfissionalEspecialidades]  WITH CHECK ADD  CONSTRAINT [FK_ProfissionalEspecialidades_Profissionais_ProfissionalID] FOREIGN KEY([ProfissionalID])
REFERENCES [dbo].[Profissionais] ([ID])
GO
ALTER TABLE [dbo].[ProfissionalEspecialidades] CHECK CONSTRAINT [FK_ProfissionalEspecialidades_Profissionais_ProfissionalID]
GO
USE [master]
GO
ALTER DATABASE [SportBuilding] SET  READ_WRITE 
GO
