package com.planetsf.clubhouse.model

import com.fasterxml.jackson.annotation.JsonProperty

data class EventUploads(
    @JsonProperty("eventUploads") val eventUploads: List<EventUpload>
)
