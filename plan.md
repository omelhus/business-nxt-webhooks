# Business NXT Webhooks Demo

## Basics

1. Sett opp service user in oauth.developers.visma.com
   - Vi venter med webhook-url til vi får en fra SST.
2. Installer Connect Application fra NXT Ninja
3. Setup isv_webhooks_demo med product (114) og order (127)

## The Sample Project

1. Typescript project vi kjører med AWS lambda

### SST config

1. SST er et rammeverk for å administrere
2. Vi bruker SST.dev for å sette opp ressurser i AWS.
3. Vi setter opp en API Gateway som vil ta imot webhooks fra Business NXT. Det blir et endepunkt for alt.
   - Vi velger å ta imot alt som sendes som POST til rot, og det vil håndteres av funksjonen "handler" i filen "webhook".
4. Vi går til fila som prosesserer webhooks, webhook.ts
5. Her ser vi funksjonen handler som tar parameter req. Det vil være den innkommende forespørselen fra Business NXT.
6. Vi starter med å sjekke signaturen på payload som kommer.
   - Her henter vi ut signaturen fra headerne og matcher den mot signaturen vi genererer selv basert på secret vi får fra Visma Connect.
   - Jeg har lagt opp til at vi kan ha flere secrets i dette prosjektet, om man ønsker å sette opp flere webhook-konfigurasjoner fra Visma Connect mot samme prosjekt.
7. Når signaturen er verifisert kan vi gå videre og se på payload som kommer fra Business NXT.
