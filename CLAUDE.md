# CLAUDE.md · US Mareuil, générateur de convocations

## Contexte

Projet école (dossier fictif). L'US Mareuil est un club de foot amateur : 450 licenciés (70 % de mineurs), 28 équipes, 2 terrains et 60 bénévoles de 65 ans en moyenne.
Le problème : la secrétaire passe 12 h par semaine à faire les convocations à la main sur WhatsApp, et le club subit 35 forfaits par an (50 € d'amende chacun).
Nouvelle contrainte : la subvention de 3 000 € exige une section féminine dès janvier et moins de forfaits (objectif : 17 maximum, soit −50 %).

Le prototype est une page unique, `index.html`. Le coach choisit son match, l'outil propose les joueurs les plus présents (sans les absents), puis génère le message WhatsApp avec une alerte s'il manque des joueurs. Un indicateur suit les forfaits.

## Règles à respecter (non négociables)

- **Rester simple.** HTML, CSS et JavaScript « vanilla ». Pas de framework, pas de build, pas de serveur, pas de dépendance npm. La page doit s'ouvrir par un double-clic et fonctionner sur GitHub Pages.
- **Penser téléphone d'abord, pour des seniors.** Texte de 18 px minimum, boutons de 48 px de haut minimum, 3 étapes au maximum pour le coach. Chaque nouvelle fonction doit ajouter le moins de clics possible.
- **WhatsApp reste le canal.** Pas de nouvelle appli à installer pour les parents.
- **Pas d'IA ni de clé d'API dans le code.** Ne jamais committer de clé (voir `.gitignore`).
- **Protéger les données de mineurs.** Aucun motif d'absence (santé, famille) dans les messages, seulement « absent·e ». Uniquement des prénoms fictifs dans le dépôt public.
- **Interface en français**, avec des textes courts et clairs, sans jargon.
- **Pas de régression.** Le cas U13 du dossier doit toujours donner 11 joueurs convoqués. Si on décoche Malik, l'alerte rouge « 10 sur 11 » doit s'afficher.
- **Stockage.** Si on utilise `localStorage`, l'entourer de `try/catch` : la page doit fonctionner même s'il n'est pas disponible.

## Backlog (par priorité, une tâche = un commit)

### P1 · Suivre les confirmations (limite n°1)
- Pour chaque joueur convoqué, ajouter 3 gros boutons : « Oui », « Non », « En attente » (par défaut). Le coach les coche quand les parents répondent sur WhatsApp.
- L'alerte de forfait se base sur les **confirmés**, plus seulement sur les convoqués. Exemple : « 8 confirmés, 3 en attente, minimum 11 ».
- Ajouter un bouton « Générer la relance ». Il produit un message WhatsApp court qui ne cite que les joueurs « En attente ».
- Enregistrer les statuts dans `localStorage` (clé par match).
- **Critère d'acceptation :** si 3 joueurs U13 répondent « Non », l'alerte rouge s'affiche et la relance ne liste que les joueurs « En attente ».

### P2 · Sortir les données du code (limite n°2)
- Déplacer `EQUIPES` et `FORFAITS` dans un fichier `donnees.js`, chargé par `<script src>`. Ne pas utiliser `fetch` sur un JSON, qui ne marche pas en double-clic (`file://`).
- Ajouter en tête du fichier un commentaire qui explique simplement comment ajouter une équipe ou un match.
- **Critère d'acceptation :** on ajoute une équipe dans `donnees.js` sans toucher à `index.html`.

### P3 · Gardien et rotation (limite n°3)
- Ajouter un champ facultatif `poste: "gardien"`. Si aucun gardien n'est convoqué, afficher une alerte orange (pas rouge).
- Ajouter un champ `matchsSansConvocation`. À partir de 3, afficher un badge « à faire jouer » et proposer le joueur en priorité. Le but est de lutter contre le décrochage (22 % des licenciés ne reprennent pas leur licence).
- **Critère d'acceptation :** dans U13, si Adam est gardien et qu'on le décoche, l'alerte orange s'affiche.

### P4 · Indicateur des forfaits alimenté par le coach
- Ajouter un bouton « Déclarer un forfait » (avec une confirmation simple, sans `alert()` ni `confirm()` du navigateur). Il incrémente le compteur de la saison, enregistré dans `localStorage`.
- Afficher un mini-historique : équipe et date des derniers forfaits.
- Distinguer la section féminine dans l'indicateur, car la subvention la suit à part.

### P5 · Accessibilité et finitions
- Vérifier le contraste (WCAG AA), les `label` et la navigation au clavier.
- Afficher un message clair s'il n'y a aucun match pour une équipe.
- Réduire la hauteur de la zone de texte du message, avec un bouton « Voir tout le message ».

### Hors périmètre (à documenter dans le README, ne pas coder)
- Envoi automatique dans WhatsApp : l'API WhatsApp Business est payante et demande un serveur.
- Connexion réelle à l'appli de présences et au calendrier de la ligue : il faudrait leurs API.
- Accès protégé par mot de passe : un vrai contrôle d'accès demande un serveur. Un mot de passe en JavaScript ne protège rien.

## Méthode de travail

1. Lire `index.html` et `README.md` avant de modifier quoi que ce soit.
2. Traiter les tâches dans l'ordre (P1 d'abord) et s'arrêter après chaque tâche pour résumer ce qui a changé.
3. Après chaque tâche, vérifier les critères d'acceptation et le test de non-régression U13 (s'il y a un navigateur headless, faire une capture en 390 px de large).
4. Mettre à jour le README : fonctionnalités, puis limites restantes.
5. Proposer un message de commit court, en français, au format « Ajout de… » ou « Correction de… ».