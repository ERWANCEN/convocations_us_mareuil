# CLAUDE.md · US Mareuil, générateur de convocations

## Contexte

Projet école (dossier fictif). L'US Mareuil est un club de foot amateur : 450 licenciés (70 % de mineurs), 28 équipes, 2 terrains et 60 bénévoles de 65 ans en moyenne.
Le problème : la secrétaire passe 12 h par semaine à faire les convocations à la main sur WhatsApp, et le club subit 35 forfaits par an (50 € d'amende chacun).
Nouvelle contrainte : la subvention de 3 000 € exige une section féminine dès janvier et moins de forfaits (objectif : 17 maximum, soit −50 %).

Le prototype tient en deux fichiers : `index.html` (la page et toute la logique) et `donnees.js` (équipes, joueurs, matchs, forfaits de départ). En 3 étapes, le coach choisit son match, vérifie la liste proposée (les plus présents, sans les absents, les « à faire jouer » en priorité), puis envoie le message sur WhatsApp. Il note ensuite les réponses des parents (Oui / Non / En attente) et peut générer une relance. Un indicateur suit les forfaits par rapport à l'objectif de la subvention.

## Règles à respecter (non négociables)

- **Rester simple.** HTML, CSS et JavaScript « vanilla ». Pas de framework, pas de build, pas de serveur, pas de dépendance npm. La page doit s'ouvrir par un double-clic et fonctionner sur GitHub Pages. Les données sont chargées par `<script src="donnees.js">`, jamais par `fetch` (qui ne marche pas en `file://`).
- **Penser téléphone d'abord, pour des seniors.** Texte de 18 px minimum (badges compris), boutons de 48 px de haut minimum, 3 étapes au maximum pour le coach. Chaque nouvelle fonction doit ajouter le moins de clics possible.
- **Accessibilité.** Contraste WCAG AA (au moins 4,5:1 pour le texte, au moins 3:1 pour les bordures des champs). Tout doit marcher au clavier, avec un contour de focus visible. Chaque champ a un libellé.
- **Pas de fenêtre du navigateur.** Jamais d'`alert()`, de `confirm()` ni de `prompt()`. Une action à confirmer se fait en 2 touchers (« Retirer » puis « Confirmer »).
- **WhatsApp reste le canal.** Pas de nouvelle appli à installer pour les parents.
- **Pas d'IA ni de clé d'API dans le code.** Ne jamais committer de clé (voir `.gitignore`).
- **Protéger les données de mineurs.** Aucun motif d'absence (santé, famille) dans les messages, seulement « absent·e ». Uniquement des prénoms fictifs dans le dépôt public. La relance ne nomme jamais les joueurs qui ont répondu « Non ».
- **Interface en français**, avec des textes courts et clairs, sans jargon. Accorder au féminin pour la section féminine (« joueuses », « gardienne »…).
- **Stockage.** Chaque accès à `localStorage` est entouré de `try/catch` : la page doit fonctionner même s'il n'est pas disponible. Les données relues sont filtrées avant usage.
- **Sécurité.** Le coach peut taper des prénoms : tout texte inséré avec `innerHTML` passe par `esc()`.

## Tests de non-régression (à repasser après chaque changement)

- **U13 du dossier** : 11 joueurs convoqués. Si on décoche Malik, l'alerte rouge « 10 joueur(s) sur 11 minimum » s'affiche.
- **Confirmations (P1)** : si 3 joueurs U13 répondent « Non », l'alerte rouge s'affiche et la relance ne liste que les joueurs « En attente ».
- **Données (P2)** : une équipe ajoutée seulement dans `donnees.js` apparaît et fonctionne, sans toucher à `index.html`.
- **Gardien (P3)** : en U13, Adam est gardien ; si on le décoche, l'alerte orange s'affiche (en plus de la rouge).
- **Forfaits (P4)** : déclarer un forfait met à jour le compteur, l'historique et, pour la section féminine, son compteur à part.
- **Équipe sans match (P5)** : la page affiche un message clair, sans erreur JavaScript.

## Backlog : terminé (novembre 2026)

| Tâche | PR | Contenu |
|---|---|---|
| P1 · Suivre les confirmations | #4 | Boutons Oui / Non / En attente (grisés si le joueur est décoché), alerte rouge / orange / verte selon les réponses, bouton « Générer la relance » |
| Hors backlog · Gestion de la liste | #4 | Ajouter ou retirer un joueur depuis la page (2 touchers), « Remettre la liste d'origine » |
| Hors backlog · Absent / disponible | `feature/absent-disponible` | Bouton « Absent » / « Disponible » par prénom dans le volet « Modifier la liste » (1 toucher, sans motif) |
| P2 · Sortir les données du code | #5 | `donnees.js` avec son mode d'emploi en tête, message d'erreur clair si le fichier manque ou est mal écrit |
| P3 · Gardien et rotation | #6 | `poste: "gardien"` (alerte orange), `matchsSansConvocation` (badge « à faire jouer » et priorité dès 3) |
| P4 · Forfaits déclarés par le coach | #7 | « Déclarer un forfait », mini-historique, compteur de la section féminine, projection calculée depuis `debutSaison` |
| P5 · Accessibilité et finitions | #8 | Contraste AA, textes de 18 px minimum, clavier, message pour une équipe sans match, « Voir tout le message » |

### Pistes ouvertes (non priorisées : à valider avec l'utilisateur avant de coder)
- Faire tenir compte des réponses « Non » dans les « équipes à risque » de l'indicateur.
- Réduire le nombre d'arrêts au clavier (106 aujourd'hui) avec une navigation aux flèches dans chaque groupe Oui / Non / En attente.
- Mettre à jour `matchsSansConvocation` automatiquement. Aujourd'hui, il se modifie à la main dans `donnees.js`.

### Hors périmètre (documenté dans le README, ne pas coder)
- Envoi automatique dans WhatsApp : l'API WhatsApp Business est payante et demande un serveur.
- Connexion réelle à l'appli de présences et au calendrier de la ligue : il faudrait leurs API.
- Accès protégé par mot de passe : un vrai contrôle d'accès demande un serveur. Un mot de passe en JavaScript ne protège rien.
- Données partagées entre téléphones (réponses, liste modifiée, forfaits) : il faudrait un serveur. Tout reste sur le téléphone qui a saisi.

## Repères techniques

- **`index.html`** : les réglages en tête du script (`NB_ENTRAINEMENTS`, `MAXIMUM_CONVOQUES`, `SEUIL_PEU_PRESENT`, `SEUIL_A_FAIRE_JOUER`), puis la logique, sous forme de règles simples, sans IA.
- **`donnees.js`** : `FORFAITS` et `EQUIPES`. Champs facultatifs d'un joueur : `absent`, `poste`, `matchsSansConvocation`. Champs facultatifs d'une équipe : `feminin`, `nouvelle`, `nbSeances`. L'`id` de chaque match doit être unique dans tout le club.
- **Clés `localStorage`** :
  - `usm-suivi-<id du match>` : convoqués et réponses des parents ;
  - `usm-modifs-<nom de l'équipe>` : ajouts, retraits, absents et disponibles notés par le coach (`ajoutes`, `retires`, `absents`, `disponibles`), appliqués par-dessus `donnees.js` ;
  - `usm-forfaits` : forfaits déclarés.

## Méthode de travail

1. Lire `index.html`, `donnees.js` et `README.md` avant de modifier quoi que ce soit.
2. Une tâche = une branche `feature/…` créée à partir du `main` à jour, et un commit. Ne jamais commiter sur une branche déjà fusionnée.
3. S'arrêter après chaque tâche pour résumer ce qui a changé.
4. Vérifier les critères d'acceptation et tous les tests de non-régression ci-dessus. Faire une capture en 390 px de large dans un navigateur headless. Attention : la fenêtre de Chrome headless ne descend pas sous 500 px de large, il faut donc émuler les 390 px avec le protocole DevTools.
5. Mettre à jour le README : fonctionnalités, puis limites restantes.
6. Proposer un message de commit court, en français, au format « Ajout de… » ou « Correction de… ».
7. Ne commiter et pousser qu'avec l'accord explicite de l'utilisateur, à chaque fois. L'outil `gh` n'est pas installé : c'est l'utilisateur qui ouvre et fusionne la PR sur GitHub. Lui donner le lien de comparaison (`…/compare/main...<branche>`) et un titre et une description prêts à coller.
