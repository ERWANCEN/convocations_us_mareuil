// ==================================================================
// DONNÉES DU CLUB · US Mareuil
// ==================================================================
// Ce fichier contient les équipes, les joueurs, les matchs et le suivi
// des forfaits. On le modifie avec un simple éditeur de texte (Bloc-notes,
// TextEdit en « texte brut »...), sans toucher à index.html.
// Après chaque modification : enregistrer, puis recharger la page.
//
// ---- AJOUTER UN MATCH ---------------------------------------------
// Dans « matchs » de l'équipe, copier une ligne { ... } et la modifier.
// Séparer deux matchs par une virgule. Exemple :
//
//     matchs: [
//       { id: "u13-bondy", libelle: "Samedi 10h · à Bondy", jour: "samedi", heure: "10h", lieu: "Bondy", rdv: "9h au stade" },
//       { id: "u13-pantin", libelle: "Samedi 24 · à Pantin", jour: "samedi 24", heure: "11h", lieu: "Pantin", rdv: "10h au stade" }
//     ]
//
//   - id      : un nom court, différent pour chaque match du club
//               (il sert à retrouver les réponses des parents).
//   - libelle : ce que le coach voit dans la liste des matchs.
//   - jour, heure, lieu, rdv : repris tels quels dans le message WhatsApp.
//
// ---- AJOUTER UNE ÉQUIPE -------------------------------------------
// Copier tout un bloc d'équipe, du nom entre guillemets jusqu'à
// l'accolade fermante « }, », le coller avant la dernière ligne « }; »,
// puis le modifier. Modèle :
//
//     "U11": {
//       coach: "Prénom du coach", minimum: 8,
//       joueurs: [
//         { nom: "Prénom", presences: 6, poste: "gardien" },
//         { nom: "Prénom", presences: 5, matchsSansConvocation: 3 },
//         { nom: "Prénom", presences: 3, absent: true }
//       ],
//       matchs: [
//         { id: "u11-noisy", libelle: "Samedi 14h · à Noisy", jour: "samedi", heure: "14h", lieu: "Noisy", rdv: "13h15 au stade" }
//       ]
//     },
//
//   - minimum   : nombre de joueurs en dessous duquel il y a forfait.
//   - presences : nombre d'entraînements suivis sur les 8 derniers.
//   - poste: "gardien" (facultatif) : si aucun gardien n'est convoqué,
//                    la page affiche une alerte orange.
//   - matchsSansConvocation (facultatif) : nombre de matchs de suite sans
//                    convocation. À partir de 3, le joueur a le badge
//                    « à faire jouer » et il est proposé en priorité.
//                    Remettre à 0 quand il a joué.
//   - absent: true : joueur indisponible. Ne jamais écrire le motif
//                    (santé, famille) : seulement « absent ».
//   - Pour une équipe de filles, ajouter « feminin: true » à côté du coach.
//   - Chaque équipe doit avoir au moins un match.
//
// ---- RÈGLES ------------------------------------------------------
//   - Prénoms seulement, jamais de nom de famille. Le dépôt est public :
//     n'y mettre que des prénoms fictifs.
//   - Garder les guillemets "...", les virgules entre les éléments et les
//     accolades { } [ ]. S'il en manque une, la page affiche un message
//     d'erreur : revenir à la dernière modification pour la corriger.
// ==================================================================

// Suivi des forfaits demandé par la subvention.
// 35 forfaits la saison dernière -> objectif : -50 %. Chiffres de la saison en cours = démo.
const FORFAITS = {
  saisonDerniere: 35,
  objectif: 17,
  semainesSaison: 40,
  semainesEcoulees: 12,          // de septembre à fin novembre
  cetteSaison: 9,                // forfaits déjà subis cette saison (démo)
  amende: 50
};

// À remplacer plus tard par l'export de l'appli de présences et le calendrier de la ligue.
const EQUIPES = {
  "U13": {
    coach: "Samir", minimum: 11,
    joueurs: [
      { nom: "Adam",   presences: 8, poste: "gardien" },
      { nom: "Bilal",  presences: 6 },
      { nom: "Chris",  presences: 7 },
      { nom: "Dylan",  presences: 2, absent: true },
      { nom: "Enzo",   presences: 5 },
      { nom: "Farid",  presences: 8 },
      { nom: "Gabin",  presences: 3 },
      { nom: "Hugo",   presences: 7 },
      { nom: "Ilyes",  presences: 6 },
      { nom: "Jules",  presences: 4, absent: true },
      { nom: "Kylian", presences: 8 },
      { nom: "Liam",   presences: 5 },
      { nom: "Malik",  presences: 1, matchsSansConvocation: 3 }
    ],
    matchs: [
      { id: "u13-bondy", libelle: "Samedi 10h · à Bondy", jour: "samedi", heure: "10h", lieu: "Bondy", rdv: "9h au stade" }
    ]
  },
  "U15 (démo fictive)": {
    coach: "Le coach", minimum: 11,
    joueurs: [
      { nom: "Noah", presences: 7 }, { nom: "Rayan", presences: 6 },
      { nom: "Sacha", presences: 2, absent: true }, { nom: "Tom", presences: 5 },
      { nom: "Yanis", presences: 8 }, { nom: "Wassim", presences: 4 },
      { nom: "Lucas", presences: 6 }, { nom: "Mehdi", presences: 3 },
      { nom: "Nathan", presences: 7 }, { nom: "Omar", presences: 5 }
    ],
    matchs: [
      { id: "u15-demo", libelle: "Dimanche 14h · à domicile", jour: "dimanche", heure: "14h", lieu: "Mareuil (domicile)", rdv: "13h au stade" }
    ]
  },
  // Nouvelle section féminine exigée par la subvention (démarrage en janvier)
  "U15 F · section féminine (démo fictive)": {
    coach: "La coach", minimum: 11, feminin: true, nouvelle: true,
    joueurs: [
      { nom: "Inès", presences: 4 }, { nom: "Léa", presences: 4 },
      { nom: "Sarah", presences: 3 }, { nom: "Maëlys", presences: 4 },
      { nom: "Nour", presences: 2 }, { nom: "Chloé", presences: 3 },
      { nom: "Yasmine", presences: 4 }, { nom: "Emma", presences: 1, absent: true },
      { nom: "Lina", presences: 2 }, { nom: "Jade", presences: 3 },
      { nom: "Aya", presences: 4 }, { nom: "Rose", presences: 1 }
    ],
    nbSeances: 4,                 // nouvelle équipe : seulement 4 séances découverte
    matchs: [
      { id: "u15f-plateau", libelle: "Samedi 17 janvier 14h · plateau à domicile", jour: "samedi 17 janvier", heure: "14h", lieu: "Mareuil (domicile)", rdv: "13h15 au stade" }
    ]
  }
};
