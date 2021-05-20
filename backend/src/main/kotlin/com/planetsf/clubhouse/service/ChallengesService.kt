package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.model.AddChallengeRequest
import com.planetsf.clubhouse.dto.ChallengeDto
import com.planetsf.clubhouse.repository.ChallengesRepository
import org.springframework.stereotype.Service


@Service
class ChallengesService(val challengesRepository: ChallengesRepository) {
    fun getChallenges(): List<ChallengeDto> {
        return challengesRepository.getChallenges()
    }

    fun addChallenge(addChallengeRequest: AddChallengeRequest) {
        challengesRepository.addChallenge(addChallengeRequest)
    }
}