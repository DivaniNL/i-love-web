## 17‐03‐2025 ‐ Workshop User Generated Content

We gaan met ons groepje overleggen wat we kunnen maken waarbij je gegevens in jullie Directus database aan moet passen of toe moet voegen. 

Hierna moeten we een snelle schets maken over wat je kan doen. 

Ik heb een idee om per DJ likes te verzamelen, en het DJ Overzicht te sorteren op Likes of alfabetisch (Standaard)

Hieronder mijn snelle schets:

![IMG_4835 2](https://github.com/user-attachments/assets/0e55412b-5d48-4e3b-946b-480370d9f5f9)

Meer mensen aan onze tafel willen graag likes maken en we denken dat het haalbaar is door een like attribuut toe te voegen aan de Directus structuur.


Hierna hebben we samen onze Directus database geanalyseerd, en voor zichzelf mogelijke problemen en knelpunten genoteerd die je verwacht voor jouw idee. 

De knelpunten die ik zie met mijn idee, is dat er nu niet de mogelijkheid is om likes te geven aan Users (Deejays).

Hieronder is een stuk JSON van de users:

        "users": [
          {
            "id": 34,
            "mh_users_id": {
              "sort": null,
              "id": 20,
              "status": "draft",
              "full_name": "Barry Paf",
              "date_updated": null,
              "date_created": "2024-10-07T09:04:53.041Z",
              "cover": "1d3c4caa-2b25-463a-b71c-940a319e5924",
              "user_created": "73ac9577-6d00-4fb2-ab53-5313fe572d09",
              "user_updated": null
            },
            "mh_show_id": {
              "radiostation": 3,
              "sort": null,
              "id": 33,
              "body": null,
              "name": "De Barry Paf Show",
              "status": "published",
              "date_updated": "2024-12-11T14:17:37.852Z",
              "date_created": "2024-10-07T09:04:53.039Z",
              "headermobile": "0c6844da-e7c6-4f71-8704-c9394dd37e07",
              "headerdesktop": "6169ea03-4081-4869-b3da-222d51f40478",
              "user_created": "73ac9577-6d00-4fb2-ab53-5313fe572d09",
              "user_updated": "73ac9577-6d00-4fb2-ab53-5313fe572d09",
              "thumbnail": "f3b76db1-53cf-4d77-b0eb-eb5d25d9af31",
              "users": [34]
            }
          }
        ]
Ik heb dit probleem bij een docent aangekaart (Krijn). Krijn gaat een Messages table toevoegen aan onze databasegroep om ervoor te zorgen dat iedereen zijn eigen POSTS-requests kan maken doormiddel van een POST. Iedereen kan met een zelfgemaakte Syntax voor de For: waarde bedenken, en deze gebruiken voor de request.

Ik zou bijvoorbeeld iets kunnen doen als:

        
    {
      "id": 10,
      "created": "2025-02-24T10:40:28.884Z",
      "from": "Radio Veronica",
      "text": "5",
      "for": "Dylan / Likes for UserID / 2"
    },
        
Hierna bedacht ik nog een knelpunt. hoe kan ik het verschil ontdekken tussen iemand die de DJ al heeft geliked, en wie nog niet.
Ik heb hierover gebrainstormt en het volgende hiervoor bedacht:

In dat geval moet er een soort login komen, waar er dus ook herkend kan worden welk persoon de like heeft gegeven.
Dan zou elke like apart in de database moeten staa, we gaan immers ook POSTEN en niet UPDATEN. Dan had boenstaande manier ook niet gewerkt.

Een voorbeeld van twee likes zou dan zijn:

    {
      "id": 10,
      "created": "2025-02-24T10:40:28.884Z",
      "from": "UserLoggedin / DivaniNL",
      "text": "Like",
      "for": "Like for UserID / 2"
    },
    {
      "id": 11,
      "created": "2025-02-24T10:40:28.884Z",
      "from": "UserLoggedin / Ju5tu5",
      "text": "Like",
      "for": "Like for UserID / 2"
    },
