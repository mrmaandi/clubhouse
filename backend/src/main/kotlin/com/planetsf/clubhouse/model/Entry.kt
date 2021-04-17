package com.planetsf.clubhouse.model

import com.planetsf.clubhouse.enum.EntryType

data class Entry (
    val id: Long,
    val challengeNumber: Long,
    val userId: Long,
    val entryType: EntryType,
    val fileName: String,
    val fileUrl: String,
)