package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.model.Challenge
import com.planetsf.clubhouse.repository.ChallengesRepository
import org.springframework.stereotype.Service


@Service
class ChallengesService(val challengesRepository: ChallengesRepository) {
    fun getChallenges(): List<Challenge> {
        return challengesRepository.getEvents()
    }
}