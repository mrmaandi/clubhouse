package com.planetsf.clubhouse.model

import com.planetsf.clubhouse.enum.EntryTypeEnum

data class EntryType (
    val id: Long,
    val type: EntryTypeEnum,
)