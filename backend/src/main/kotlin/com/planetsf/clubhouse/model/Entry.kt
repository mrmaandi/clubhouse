package com.planetsf.clubhouse.model

import com.planetsf.clubhouse.enum.EntryTypeEnum

data class Entry (
    val id: Long,
    val challengeNumber: Long,
    val userId: Long,
    val entryType: EntryTypeEnum,
    val fileName: String,
    val fileUrl: String,
)