# veille

Créer un fichier .env.local avec les infos de connexion à la BD

Lancer partie React : yarn encore dev --watch
Lancer Api Plaform : symfony serve

Accès swagger
http://127.0.0.1:8000/api/docs


Glossaire : 
**API Platform** utilise le format OpenAPI pour décrire les endpoints de notre API et Swagger UI pour afficher la documentation de l'API.

Il faut savoir qu'il y a deux types d'opérations: les opérations sur les collections (collectionOperations) et les opérations sur une entité/une ressource (itemOperations). On peut activer/désactiver chacune de ces opérations et cible jusqu'au verbe nécessaire

Sérialisation / Désérialisation
Nous allons donc utiliser les annotations normalizationContext et denormalizationContext pour définir ce qu'on appelle des groupes et ensuite nous définirons pour chaque attribut dans quel groupe il appartient.

    Les attributs qui se trouveront dans le groupe du normalizationContext seront accessible en mode lecture (GET)
    Les attributs qui se trouveront dans le groupe du denormalizationContext seront accessible en mode écriture (POST, PUT, PATCH)
    Les attributs qui auront les deux groupes seront accessible en mode lecture et écriture
    Les attributs qui n'auront aucun des groupes ne seront pas pris en compte




Pense-bête : 
Vider cache : php bin/console cache:pool:clear cache.global_clearer