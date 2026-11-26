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

**Gestion de la liste des joueurs.**

10. Sous la liste, « Modifier la liste des joueurs » (replié par défaut) permet d'ajouter un joueur (prénom seulement) ou d'en retirer un. Le retrait se fait en deux touchers : « Retirer », puis « Confirmer ».
    Chaque prénom a aussi un bouton « Absent » (« Absente » pour la section féminine). D'un seul toucher, le joueur sort de la convocation et ses réponses pour le match sont effacées. Le bouton devient alors « Disponible », qui le remet dans la liste et le convoque s'il reste de la place. Jamais de motif : seulement « absent ». Un joueur noté absent dans `donnees.js` peut ainsi être rendu disponible depuis la page.
11. Un joueur ajouté est convoqué d'office (dans la limite de 14) et porte le badge « nouveau » plutôt que « peu présent ».
12. Seules les modifications du coach (prénoms ajoutés, retirés, marqués absents ou de nouveau disponibles) sont gardées sur le téléphone, une clé par équipe. Elles s'appliquent par-dessus `donnees.js` : un joueur ajouté plus tard dans ce fichier apparaît aussi. Un joueur du fichier retiré par erreur, puis rajouté, retrouve son historique. Le bouton « Remettre la liste d'origine » efface ces modifications.

**Gardien et rotation.**

13. Un joueur peut être indiqué comme gardien dans `donnees.js` (`poste: "gardien"`). Il porte le badge « gardien ». Si aucun gardien n'est convoqué, ou s'il a répondu « Non », une alerte **orange** s'affiche, en plus de l'alerte de forfait.
14. Un joueur resté 3 matchs de suite sans convocation (`matchsSansConvocation` dans `donnees.js`) porte le badge « à faire jouer ». Il est placé en tête de liste et proposé en priorité. Le but est de lutter contre le décrochage : 22 % des licenciés ne reprennent pas leur licence. Pour ce joueur, le badge « peu présent » n'est pas affiché.

**Indicateur des forfaits alimenté par le coach.**

15. Le bouton « Déclarer un forfait » ouvre un petit panneau, avec l'équipe du match en cours et la date du jour déjà remplies. Il suffit de toucher « Confirmer le forfait ». Pas de fenêtre du navigateur, et une date future est refusée.
16. Le compteur de la saison, les amendes, la jauge et la projection en fin de saison se mettent à jour aussitôt. La projection se calcule à partir de la date de début de saison (`debutSaison` dans `donnees.js`).
17. Un mini-historique montre les 5 derniers forfaits déclarés (équipe et date). Un forfait saisi par erreur se retire en deux touchers : « Retirer », puis « Confirmer ».
18. La section féminine a son propre compteur, car la subvention la suit à part.
19. Les forfaits déclarés sont gardés sur le téléphone (`localStorage`). Le compteur de départ (`cetteSaison` dans `donnees.js`) reste un chiffre de démonstration.

**Accessibilité et finitions.**

20. Tous les textes font au moins 18 px. Le contraste respecte le niveau WCAG AA (au moins 4,5:1 pour le texte, au moins 3:1 pour les bordures des champs), et c'est vérifié automatiquement sur chaque texte affiché.
21. Tout se fait au clavier : un contour bleu bien visible montre où l'on est, la touche Échap ferme le panneau de forfait, et le focus n'est jamais perdu après un retrait. Chaque champ a un libellé, et les alertes sont lues par les lecteurs d'écran quand elles changent.
22. Si une équipe n'a aucun match prévu, la page le dit clairement, au lieu d'afficher une liste et un message vides.
23. La zone du message est réduite. Le bouton « Voir tout le message » l'affiche en entier, et « Réduire le message » la replie.

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

Les équipes, les joueurs, les matchs (`EQUIPES`) et le suivi des forfaits (`FORFAITS`) sont dans le fichier `donnees.js`, à côté de `index.html`. Pour ajouter une équipe ou un match, il suffit de modifier ce fichier avec un éditeur de texte : le mode d'emploi est écrit en tête du fichier. Pas besoin de toucher à `index.html`.

Le fichier est chargé par une balise `<script src>`, et non lu avec `fetch` : la page s'ouvre donc toujours par un double-clic. S'il manque une virgule ou un guillemet dans `donnees.js`, la page affiche un message d'erreur clair au lieu de rester blanche.

L'équipe U13 reprend les données du dossier ; les équipes U15 sont des démos fictives. Dans une version réelle, ces données viendraient de l'export de l'appli de présences et du calendrier de la ligue.

## Limites restantes

- Les réponses des parents sont gardées sur le téléphone du coach uniquement. Elles ne sont pas partagées avec un autre appareil ni avec la secrétaire.
- Le coach reporte lui-même les réponses reçues sur WhatsApp : l'outil ne lit pas les messages.
- La liste modifiée par un coach reste sur son téléphone : elle n'est pas partagée avec le club.
- Un joueur ajouté depuis la page n'a pas d'historique de présence (0 entraînement).
- Les équipes et les matchs se modifient à la main dans `donnees.js` : il faut un ordinateur, et une faute de frappe bloque la page (avec un message qui l'explique).
- Le compteur `matchsSansConvocation` et le poste de gardien se mettent à jour à la main dans `donnees.js` : la page ne compte pas encore les matchs joués.
- Les forfaits déclarés restent sur le téléphone qui les a saisis : il n'y a pas de total partagé entre coachs. Pour un compteur fiable, une seule personne (la secrétaire, par exemple) devrait les déclarer. Un vrai total partagé demanderait un serveur.
- Hors périmètre : envoi automatique dans WhatsApp (API payante et serveur nécessaire), connexion réelle à l'appli de présences et au calendrier de la ligue (il faudrait leurs API), accès protégé par mot de passe (un vrai contrôle d'accès demande un serveur).