package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.model.AddChallengeRequest
import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.Challenge
import com.planetsf.clubhouse.repository.ChallengesRepository
import com.planetsf.clubhouse.repository.UsersRepository
import org.springframework.stereotype.Service


@Service
class ChallengesService(val challengesRepository: ChallengesRepository) {
    fun getChallenges(): List<Challenge> {
        return challengesRepository.getChallenges()
    }

    fun addChallenge(addChallengeRequest: AddChallengeRequest) {
        challengesRepository.addChallenge(addChallengeRequest)
    }
}