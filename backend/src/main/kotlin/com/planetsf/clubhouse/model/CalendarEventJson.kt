package com.planetsf.clubhouse.model


class CalendarEventJson {

    data class EventSubmission(
        val user: String,
        val type: String,
        val fileUrl: String,
        val fileName: String,
    )
}