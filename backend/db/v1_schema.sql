-- v1_schema.sql
-- Initialisation du schéma de la base de données
-- Création du schéma si nécessaire (par défaut 'public' est utilisé)
CREATE SCHEMA IF NOT EXISTS public;
-- Activation d'extensions utiles (exemple: pgcrypto pour le hachage si nécessaire au niveau DB)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";