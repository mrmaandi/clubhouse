package com.planetsf.clubhouse.dto

import java.time.LocalDateTime

data class ChallengeDto (
    val id: Long,
    val challengeNumber: Long,
    val name: String,
    val startTime: LocalDateTime,
    val endTime: LocalDateTime,
)