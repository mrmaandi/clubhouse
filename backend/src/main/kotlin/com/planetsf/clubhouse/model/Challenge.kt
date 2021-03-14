package com.planetsf.clubhouse.model

import java.time.LocalDateTime

data class Challenge (
    val id: Long,
    val challengeNumber: Long,
    val name: String,
    val startTime: LocalDateTime,
    val endTime: LocalDateTime,
)