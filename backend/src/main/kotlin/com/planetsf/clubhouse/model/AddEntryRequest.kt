package com.planetsf.clubhouse.model


data class AddEntryRequest (
    val userName: String,
    val entryType: String,
    val fileName: String,
    val fileContent: String,
)