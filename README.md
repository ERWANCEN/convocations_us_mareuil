# US Mareuil · Générateur de convocations

Prototype réalisé dans le cadre d'un projet école (dossier fictif « US Mareuil »).

**Le besoin :** la secrétaire bénévole passe 12 h par semaine à rédiger les convocations à la main sur WhatsApp.
**La solution :** en 3 étapes, le coach choisit son match, vérifie la liste proposée et envoie le message sur WhatsApp.

## Fonctionnalités

1. Choisir une équipe et un match.
2. Proposer les joueurs les plus présents aux 8 derniers entraînements, sans les absents déclarés (14 au maximum).
3. Générer le message WhatsApp, avec une alerte si moins de 11 joueurs sont convoqués (anti-forfait).

**Nouvelle contrainte (subvention) : section féminine en janvier et moins de forfaits.**

4. Une nouvelle équipe U15 F (section féminine). Le texte est adapté (« joueuses ») et l'outil tient compte du peu d'historique : 4 séances, pas de badge « peu présent ».
5. Un indicateur des forfaits : forfaits de la saison par rapport à l'objectif (35 la saison dernière, objectif ≤ 17), amendes payées, projection en fin de saison et équipes à risque pour le prochain match.

**Suivi des confirmations.**

6. Sous chaque joueur convoqué, 3 gros boutons : « Oui », « Non », « En attente » (par défaut). Le coach les touche quand les parents répondent sur WhatsApp. Si on décoche un joueur, ses boutons restent visibles mais grisés.
7. L'alerte se base sur les réponses, avec par exemple « 8 confirmés, 3 en attente, minimum 11 » :
   - rouge si les convoqués moins les « Non » sont sous le minimum (risque de forfait) ;
   - orange s'il manque encore des réponses ;
   - verte quand assez de joueurs ont répondu « Oui ».
8. Le bouton « Générer la relance » prépare un message WhatsApp court qui ne cite que les joueurs « En attente ». Les « Non » ne sont jamais nommés.
9. Les réponses et la liste des convoqués sont gardées sur le téléphone (`localStorage`, une clé par match). Si le navigateur bloque ce stockage, la page fonctionne quand même, sans mémoire.

Le coach garde la main : il peut cocher ou décocher un joueur et modifier le message avant l'envoi.

## Choix techniques

- Une seule page HTML/JavaScript. Pas de serveur, pas d'installation, pas de base de données.
- Elle fonctionne sur téléphone, avec de gros boutons et un texte lisible pour des bénévoles âgés.
- **Pas d'IA ni de clé d'API.** La sélection repose sur des règles simples (tri par présence) et le message sur un modèle fixe. C'est gratuit, fiable (aucune invention) et explicable.
- Le bouton « Envoyer sur WhatsApp » ouvre WhatsApp avec le message prérempli (lien `wa.me`).
- Aucune donnée de santé dans le message : un joueur blessé est seulement noté « absent », sans le motif.

## Lancer le prototype

Ouvrir `index.html` dans un navigateur, ou activer GitHub Pages sur le dépôt (Settings → Pages → branche `main`) pour l'ouvrir sur téléphone.

## Données

Les données sont écrites en haut du script (`EQUIPES`). L'équipe U13 reprend les données du dossier ; l'équipe U15 est une démo fictive. Dans une version réelle, elles viendraient de l'export de l'appli de présences et du calendrier de la ligue.

## Limites restantes

- Les réponses des parents sont gardées sur le téléphone du coach uniquement. Elles ne sont pas partagées avec un autre appareil ni avec la secrétaire.
- Le coach reporte lui-même les réponses reçues sur WhatsApp : l'outil ne lit pas les messages.
- Les équipes et les matchs sont écrits dans le code (`index.html`).
- Pas encore de gestion du gardien ni de la rotation des joueurs peu convoqués.
- Le compteur de forfaits de la saison est une démonstration : le coach ne peut pas encore déclarer un forfait.
- Hors périmètre : envoi automatique dans WhatsApp (API payante et serveur nécessaire), connexion réelle à l'appli de présences et au calendrier de la ligue (il faudrait leurs API), accès protégé par mot de passe (un vrai contrôle d'accès demande un serveur).