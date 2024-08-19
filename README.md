# Looking to automate Business NXT with triggers?

Check out [NXT Triggers](https://businessnxt.dev/?trk=github). It's the simplest way to replace SQL triggers for Business NXT.

# Business NXT Webhooks Demo

Presented by Ole Melhus at the Visma ISV Partner Day 28/05/2024.

You'll find contact information for Ole at https://on-it.no.

## Requirements

- Follow this guide on how to set up your AWS account: https://sst.dev/guide.html
- Computer with (at least) Node18 installed
- Install pnpm using `npm i -g pnpm`
- SST Ion runs on macOS, Linux and WSL. You'll need one of those. I used WSL during the development of this example.
- VS Code

## Getting started

Start by setting up your AWS account and installing SST Ion. Then you can clone this project and start making changes.

## Environment Variables

These are the required environment variables. Create a .env-file that will be used during testing.

```env
VISMA_SUBSCRIPTION_SECRET=""
VISMA_CLIENT_ID=""
VISMA_CLIENT_SECRET=""
```
