-- creation de la base

create database gestion_facturation;

use gestion_facturation;

-- creation des tables

CREATE TABLE societe(
    id int auto_increment primary key,
    raison_s varchar(100),
    contact text,
    tel varchar(14),
    patente varchar(30),
    ICE varchar(30),
    RC varchar(30)
);

CREATE TABLE client(
    id int auto_increment primary key,
    raison_s varchar(100),
    adresse text,
    ICE varchar(30),
    tel varchar(14),
    LE varchar(8)
);

CREATE TABLE devis(
    N_devis int auto_increment primary key,
    id_client int references client(id),
    id_societe int references societe(id),
    date_devis date
);

CREATE TABLE facture(
    N_facture int auto_increment primary key,
    id_client int references client(id),
    id_societe int references societe(id),
    date_facture date,
    date_echeance date
);

CREATE TABLE commande_devis(
    id_command_d int auto_increment primary key,
    id_devis int references devis(N_devis),
    reference varchar(50),
    titre varchar(50),
    prix float,
    quantite int
);

CREATE TABLE commande_facture(
    id_command_f int auto_increment primary key,
    id_facture int references facture(N_facture),
    reference varchar(50),
    titre varchar(50),
    prix float,
    quantite int
);

CREATE TABLE devis_facture(
    id_facture int references facture(N_facture),
    id_devis int references devis(N_devis),
    constraint prK primary key (id_facture,id_devis)
);
