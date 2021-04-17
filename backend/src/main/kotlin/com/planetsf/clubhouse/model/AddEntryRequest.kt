package com.planetsf.clubhouse.model

import com.planetsf.clubhouse.enum.EntryType


data class AddEntryRequest (
    val userName: String,
    val entryType: EntryType,
    val fileName: String,
    val fileContent: String,
)