package com.planetsf.clubhouse.dto

import com.planetsf.clubhouse.enum.EntryType

data class EntryTypeDto (
    val id: Long,
    val type: EntryType,
)