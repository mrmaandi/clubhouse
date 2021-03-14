package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.model.AddChallengeRequest
import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.Challenge
import com.planetsf.clubhouse.model.Entry
import com.planetsf.clubhouse.service.ChallengesService
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("challenges")
class ChallengesController(private val challengesService: ChallengesService) {
    @GetMapping
    fun getChallenges(): List<Challenge> {
        return challengesService.getChallenges()
    }

    @PostMapping("/add-challenge")
    fun addChallenge(@RequestBody requestBody: AddChallengeRequest) {
        return challengesService.addChallenge(requestBody)
    }
}