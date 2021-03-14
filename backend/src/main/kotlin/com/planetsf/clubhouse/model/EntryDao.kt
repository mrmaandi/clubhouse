package com.planetsf.clubhouse.model

data class EntryDao (
    val id: Long,
    val challengeId: Long,
    val userId: Long,
    val entryTypeId: Long,
    val fileName: String
)