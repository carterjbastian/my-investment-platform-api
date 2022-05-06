# Check Investor Status Sample Integration (Back-End)

This codebase implements the back end for the Check Investor Status platform integration demo.

To implement a live demo of the C.I. platform integration, we create the web server for a fictional investment platform – MyInvestmentPlatform.

**Note: This MyInvestmentPlatform is a generic investment platform. Any time you read "MyInvestmentPlatform", you can substitute in the name of your platform.**

Our fictional platform lets users create accounts, store their information, and make investments (potentially with many different sponsors).

However, in order to make these investments, MyInvestmentPlatform users need to verify their accreditation status. For this, MyInvestmentPlatform has integrated with Check Investor Status.

This web server (partially implementing MyInvestmentPlatform) is a fully-functional example of the Check Investor Status platform integration and API.

This repo is the web server for a live demo – see this live at [platformintegrationdemo.com](https://www.platformintegrationdemo.com/).

## Tech Stack

This server uses Node/Express for routing and implementing endpoints. It interacts with a Mongodb database to create and fetch users. It interacts with the Check Investor Status API via HTTP requests (using axios).

## Integration Workflow

MyInvestmentPlatform's user-facing web app hits this web server, which persists user data to a database and acts as a middleman for interactions with the Check Investor Status api.

To integrate, we simply hit various C.I.S. endpoints using a secret X-ACCESS-API token specific to MyInvestmentPlatform.

**Note that this secret token is stored in envrionemnt variables, not in code.**

We can then send information from the C.I.S. API over to our front end to render things like user's accreditation statuses or portalLink buttons.

You can see this entire process explained in detail in the [C.I. Platform API Documentation](https://www.platformintegrationdemo.com/docs/#integration-example).

## Where to look for examples

### `models/user.js`

This is a sample User model for the MyInvestmentPlatform. Your platform's account model will likely be much larger and more robust.

### `api/user.js`

This file implements 3 endpoints.

**`POST /api/user`** - Creates a new MyInvestmentPlatform User (would be hit by a signup page in practice).

**`GET /api/portal-link/:userId`** - Gets the unique, dynamically-generated `portalLink` for this user (by hitting `POST /platforms/register` on the Check Investor Status API).

**`GET /api/get-ci-investor/:userId`** – Fetches the Check Investor Status investor-model representation of your MyInvestmentPlatform user (by hitting `GET /platform/investors/lookup/:investorId` on the Check Investor Status API).

With just those last two endpoints, we've integrated Check Investor Status into our platform! Our users can click the link we provide to get accredited or check their status. We can fetch their accreditation information, render it back to them, or allow them to proceed once they're been successfully accredited.

## Further Resources

There's lots more we can do with the Check Investor Status API. The following are good resources for more information:

- [PlatformIntegrationDemo.com](https://www.platformintegrationdemo.com) is what this looks like (live)!
- The Check Investor Status [Integration & API Documentation](https://www.platformintegrationdemo.com/docs/) explains the details of the investor model, the endpoints this web server hits, and the portalLinks used.
- [MyInvestmentPlatform Front-End Repo](https://github.com/carterjbastian/my-investment-platform) implements the demo web app that this platform communicates with.
- Carter built this, is actively maintaining it, and is providing technical support to our platform clients. Reach out to [carter@checkinvestorstatus.com](mailto:carter@checkinvestorstatus.com) with any questions.
