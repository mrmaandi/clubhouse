package com.planetsf.clubhouse.model

data class AddChallengeRequest (
    val challengeNumber: Long,
    val name: String,
    val startTime: String,
    val endTime: String,
)