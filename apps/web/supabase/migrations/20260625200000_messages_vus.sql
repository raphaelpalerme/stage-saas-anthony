/*
 * Pickify — Repère "messages vus" pour le badge de l'onglet Messages.
 * `messages_vus_le` = la dernière fois que le joueur a ouvert ses messages.
 * Les DM reçus APRÈS cette date comptent comme "non lus" (badge rouge).
 */
alter table public.profils
  add column if not exists messages_vus_le timestamp with time zone not null default now();
