const express = require('express')
const app = (module.exports = express())
const mongoose = require('mongoose')

const axios = require('axios').default

const { User } = require('../models')

/*
 * POST /api/user
 * 
 * An endpoint for creating a new MyInvestmentPlatform user.
 * The simplified equivalent of what you'd use in a signup flow.
 */
app.post('/user', async (req, res) => {
  const {
    email,
    name,
    businessType,
    sponsor,
  } = req.body

  // Create or update the MyInvestmentPlatform User
  let newUser = await User.findOneAndUpdate(
    // Find the user by email
    {
      email,
    },
    // Add other user data to the User model
    {
      name,
      businessType,
      sponsor,
    },
    {
      new: true,
      upsert: true,
    },
  )

  // Returns JSON representation of the user
  res.send({
    user: newUser,
  })
})

/*
 * GET /api/portal-link/:userId
 *
 * A route retrieving the dynamic, magic link that
 * an investor can use to access their Check Investor Status portal.
 * 
 * This route hits the Check Investor Status /platform/register endpoint,
 * which creates or retrieves an investor associated with your platform.
 *  
 * In this case, we create or fetch the C.I.S. investor account 
 * associated with our MyInvestmentPlatform user.
 */
app.get('/portal-link/:userId', async (req, res) => {
  const { userId } = req.params

  // Get MyInvestmentPlatform user from your database
  const {
    name,
    email,
    businessType,
    sponsor,
  } = await await User.findOne({ _id: mongoose.Types.ObjectId(userId) })

  try {
    // Make a request to the Check Investor Status platform API
    let response = await axios.post(
      `https://check-investor-status.herokuapp.com/platform/investors/register`,
      // Post Body
      {
        // Map your internal user data to CI
        // parameters in the request body.
        email,
        legalName: name,
        investorType: businessType,
        // Optionally store the sponsor as metadata
        metadataTag: sponsor,
      },
      // Headers including authorization
      {
        headers: {
          'Content-Type': 'application/json',
          // Your secret key lives in your environment variables
          'X-API-ACCESS': process.env.CI_API_SECRET_KEY,
        },
      },
    )

    // Deconstruct the response
    let {
      investor,  // Investor model
      portalLink,  // What we care about
    } = response.data

    // Save the CI unique identifier on your user model
    // This is optional-but-strongly-recommended.
    // It lets you use other, more particualr endpoints in the
    // Check Investor Status API
    await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        checkInvestorStatusId: investor.investorId,
      },
      {},
    )

    // Return portalLink for this user to the front end
    return res.send({
      portalLink,
      investor,
    })
  } catch (err) {
    return res.status(500).send(err)
  }
})

/*
 * GET /api/get-ci-investor/:userId
 *
 * A route retrieving the the Check Investor Status investor for your user.
 * 
 * This route hits the Check Investor Status endpoint /platform/investors/lookup/:investorId,
 * which fetches an investor associated with your platform.
 */
app.get('/get-ci-investor/:userId', async (req, res) => {
  const { userId } = req.params

  // Get MyInvestmentPlatform user from your database
  const {
    checkInvestorStatusId,
  } = await await User.findOne({ _id: mongoose.Types.ObjectId(userId) })

  try {
    // Make a request to the Check Investor Status platform API
    let response = await axios.get(
      `https://check-investor-status.herokuapp.com/platform/investors/lookup/${checkInvestorStatusId}`,
      // Headers including authorization
      {
        headers: {
          'Content-Type': 'application/json',
          // Your secret key lives in your environment variables
          'X-API-ACCESS': process.env.CI_API_SECRET_KEY,
        },
      },
    )

    // Deconstruct the response
    let {
      investor,  // Investor model
      portalLink,  // What we care about
    } = response.data

    // Return portalLink for this user to the front end
    return res.send({
      portalLink,
      investor,
    })
  } catch (err) {
    return res.status(500).send(err)
  }
})
