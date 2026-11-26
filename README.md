US Mareuil · Générateur de convocations

Prototype réalisé dans le cadre d'un projet école (dossier fictif « US Mareuil »).

Le besoin : la secrétaire bénévole passe 12 h par semaine à rédiger les convocations à la main sur WhatsApp.
La solution : en 3 étapes, le coach choisit son match, vérifie la liste proposée et envoie le message sur WhatsApp.

Fonctionnalités
Choisir une équipe et un match.
Proposer les joueurs les plus présents aux 8 derniers entraînements, sans les absents déclarés (14 au maximum).
Générer le message WhatsApp, avec une alerte si moins de 11 joueurs sont convoqués (anti-forfait).

Le coach garde la main : il peut cocher ou décocher un joueur et modifier le message avant l'envoi.

Choix techniques
Une seule page HTML/JavaScript. Pas de serveur, pas d'installation, pas de base de données.
Elle fonctionne sur téléphone, avec de gros boutons et un texte lisible pour des bénévoles âgés.
Pas d'IA ni de clé d'API. La sélection repose sur des règles simples (tri par présence) et le message sur un modèle fixe. C'est gratuit, fiable (aucune invention) et explicable.
Le bouton « Envoyer sur WhatsApp » ouvre WhatsApp avec le message prérempli (lien wa.me).
Aucune donnée de santé dans le message : un joueur blessé est seulement noté « absent », sans le motif.
Lancer le prototype

Ouvrir index.html dans un navigateur, ou activer GitHub Pages sur le dépôt (Settings → Pages → branche main) pour l'ouvrir sur téléphone.

Données

Les données sont écrites en haut du script (EQUIPES). L'équipe U13 reprend les données du dossier ; l'équipe U15 est une démo fictive. Dans une version réelle, elles viendraient de l'export de l'appli de présences et du calendrier de la ligue.