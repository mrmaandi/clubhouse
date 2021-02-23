package com.planetsf.clubhouse.calendar.scheduled

import com.google.api.client.util.DateTime
import com.planetsf.clubhouse.calendar.model.CalendarEvent
import com.planetsf.clubhouse.calendar.model.CurrentEventHolder
import com.planetsf.clubhouse.calendar.service.CalendarService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component


@Component
class CalendarSync(private val calendarService: CalendarService) {

    private val log: Logger = LoggerFactory.getLogger(CalendarSync::class.java)

    @Scheduled(fixedRate = 5000)
    fun syncCalendarEvents() {
        val nextEvents: List<CalendarEvent> = calendarService.getNextCalendarEvent()
        val activeEvent: CalendarEvent? = CurrentEventHolder.currentEvent

        if (nextEvents.isEmpty()) {
            /*needs to be worked on*/
            /*endActiveEvent(nextEvent)*/
        } else {
            val nextEvent: CalendarEvent = nextEvents[0]

            if (isEventActive(nextEvent)) {
                onEventEnded(nextEvent)

                if (activeEvent == null || (activeEvent.id != nextEvent.id)) {
                    onEventStarted(nextEvent)
                }
            } else {
                onEventEnded(nextEvent)
            }
        }
    }

    private fun isEventActive(nextEvent: CalendarEvent): Boolean {
        val currentTime = DateTime(System.currentTimeMillis()).value

        return nextEvent.start < currentTime && currentTime < nextEvent.end
    }

    private fun onEventStarted(nextEvent: CalendarEvent) {
        CurrentEventHolder.currentEvent = nextEvent
        log.info("Current event started: {}", nextEvent.name)
    }

    private fun onEventEnded(nextEvent: CalendarEvent?) {
        val activeEvent: CalendarEvent? = CurrentEventHolder.currentEvent

        if (activeEvent != null) {
            if (nextEvent != null && activeEvent.id != nextEvent.id) {
                CurrentEventHolder.currentEvent = null
                log.info("Event ended: {}", activeEvent.name)
            }
        }
    }
}