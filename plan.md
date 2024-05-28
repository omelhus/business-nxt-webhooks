# Business NXT Webhooks Demo

## Basics

1. Sett opp service user in oauth.developers.visma.com

   - en serie med åpenbare valg
   - Vi venter med webhook-url til vi får en fra SST.

2. Installer Connect Application fra NXT Ninja
   - service user isv_webhooks_demo
   - connect application access
   - webhooks targets
   - Setup isv_webhooks_demo med product (114) og order (127)

## The Sample Project

1. Typescript project vi kjører med AWS lambda

### SST config

2. Vi bruker SST.dev for å sette opp ressurser i AWS.
3. Vi setter opp en API Gateway som vil ta imot webhooks fra Business NXT. Det blir et endepunkt for alt.
   - Vi velger å ta imot alt som sendes som POST til rot, og det vil håndteres av funksjonen "handler" i filen "webhook".
4. Vi går til fila som prosesserer webhooks, webhook.ts
5. Her ser vi funksjonen handler som tar parameter req. Det vil være den innkommende forespørselen fra Business NXT.
6. Vi starter med å sjekke signaturen på payload som kommer.
   - Her henter vi ut signaturen fra headerne og matcher den mot signaturen vi genererer selv basert på secret vi får fra Visma Connect.
   - Jeg har lagt opp til at vi kan ha flere secrets i dette prosjektet, om man ønsker å sette opp flere webhook-konfigurasjoner fra Visma Connect mot samme prosjekt.
7. Når signaturen er verifisert kan vi gå videre og se på payload som kommer fra Business NXT.

8. zod

   - for å kontrollere at payload er som Visma har lovet, kontrollerer vi den med zod.
   - Payload består av

   ```json
   {
     "tableIdentifier": "Product",
     "customerNo": 0,
     "companyNo": 0,
     "primaryKeys": [
       {
         "ProductNo": "1001"
       }
     ],
     "event": "UPDATE",
     "timestamp": "2024-05-27T18:12:55.7720784Z"
   }
   ```

9. Vi håndterer endringer på ordre. [handleOrderUpdate]

   - Starter med å hente ut primærnøklene fra payload. Her flater jeg dem i praksis bare ut til et objekt.
   - Lager en ny graphql-klient som peker mot graphlql-service og får et token fra visma connect.
   - Vi bruker klienten til å hente dataene vi er ute etter fra Business NXT apiet
   - Vi henter kun det vi er ute etter, og ikke alt annet. Det betyr at vi kan gi oss så snart vi vet at endringen ikke angår oss.
   - I dette eksemplet kan det være flere records vi har endret i samme forespørsel, så da bruker vi batch for å oppdatere alle samtidig.
   - I mutasjonen oppdaterer vi enkeltlinjer på ordren, og kun dersom description er ulik det den er fra før. Dette har vi selvsagt allerede kontrollert, men vi kontrollerer det her også for eksemplets skyld.

10. Nå kan vi kjøre eksemplet vårt for å få ut en url vi kan legge inn i Visma Connect

    - pn codegen (om vi har endringer på spørringer)
    - sst dev
      - oppretter og oppdaterer ressurser i aws
      - gir oss url vi tar med til visma connect
      - gå tilbake til oauth.developers.visma.com

11. Snurr test i Business NXT

    - sst console https://console.sst.dev

--
cleanup:
slette alt med webhooks_demo fra business nxt
slett først fra webhook targets, så fra connect application access, så fra users
