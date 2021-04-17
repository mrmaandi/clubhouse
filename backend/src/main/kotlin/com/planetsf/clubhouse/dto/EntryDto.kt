package com.planetsf.clubhouse.dto

import com.planetsf.clubhouse.enum.EntryType

data class EntryDto (
    val id: Long,
    val challengeId: Long,
    val userId: Long,
    val entryType: EntryType,
    val fileName: String
)