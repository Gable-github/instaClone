const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const profile = require('../models/profile')
const Profile = require('../models/profile')

router.get('/', async (req, res) => {
    let profiles
    try {
        profiles = await Profile.find({})
        res.render('profiles/index', {
            profiles: profiles
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('profiles/new', {profile: new Profile()})
})

router.get('/:id', async (req, res) => {
    let profile
    try {
        profile = await Profile.findById(req.params.id)
        res.render(`profiles/show`, {
            profile: profile
        })
    } catch {
        if (!profile) {
            res.render('/', {
                errorMessage: "We couldn't find that user :("
            })
        }
    }
})

router.post('/', async (req, res) => {
    const profile = new Profile({
        name: req.body.name,
        bio: req.body.bio
    })
    
    userName = await Profile.find({ name: req.body.name })
    if (userName.length === 0) {
        try {
            const newProfile = await profile.save()
            // res.render(`profiles/${newProfile.id}`)
            res.redirect('profiles')
        } catch {
            res.render('profiles/new', {
                profile: profile,
                errorMessage: "Error creating profile"
            })
        } 
    } else {
        res.render('profiles/new', {
            profile: profile,
            errorMessage: "Username has been taken!"
        })
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let profile = await Profile.findById(req.params.id)
        res.render('profiles/edit', { profile: profile })
    } catch {
        res.redirect('/')
    }
})

router.put('/:id', async (req, res) => {
    let profile
    try {
        profile = await Profile.findById(req.params.id)
        profile.name = req.body.name
        profile.bio = req.body.bio
        await profile.save()
        res.redirect(`/profiles/${profile.id}`)
    } catch {
        if (!profile) {
            res.redirect('/')
        } else {
            res.render(`profiles/edit`, {
                profile: profile,
                errorMessage: "Something went wrong updating this user 🤔"
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let profile
    try {
        profile = await Profile.findById(req.params.id)
        await profile.remove()
        res.redirect('/profiles')
    } catch {
        res.redirect('/')
    }
})

module.exports = router