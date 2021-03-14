package com.planetsf.clubhouse.controller

import com.amazonaws.services.s3.model.ObjectListing
import com.amazonaws.services.s3.model.ObjectMetadata
import com.planetsf.clubhouse.config.AwsS3Configuration
import com.planetsf.clubhouse.model.CalendarEvent
import com.planetsf.clubhouse.model.CalendarEventJson
import com.planetsf.clubhouse.model.EventUpload
import com.planetsf.clubhouse.service.CalendarService
import com.planetsf.clubhouse.service.FileStorageService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("files")
class FileStorageController(
    private val configuration: AwsS3Configuration,
    private val calendarService: CalendarService
) {
    @Value("\${request.security-token}")
    lateinit var token: String

    @Value("\${aws.s3.base-url}")
    lateinit var baseUrl: String

    @GetMapping("/list")
    fun getFiles(): List<CalendarEvent> {
        val s3Client = configuration.amazonS3Client()
        val calendarEvents: List<CalendarEvent> = calendarService.getPreviousEvents()
        val events = mutableListOf<CalendarEvent>()

        for (calendarEvent in calendarEvents) {
            val objects: ObjectListing = s3Client.listObjects("clubhouse-sample-flips", "${calendarEvent.name}/")
            val description = mutableListOf<CalendarEventJson.EventSubmission>()

            for (objectSummary in objects.objectSummaries) {
                val metadata: ObjectMetadata = s3Client.getObjectMetadata("clubhouse-sample-flips", objectSummary.key)

                val user = metadata.getUserMetaDataOf("userid")

                if (user != null) {
                    description.add(
                        CalendarEventJson.EventSubmission(
                            user = user,
                            type = getType(metadata.contentType),
                            fileUrl = baseUrl + objectSummary.key,
                            fileName = objectSummary.key
                        )
                    )

                }
            }

            events.add(
                CalendarEvent(
                    id = calendarEvent.id,
                    name = "Sample Flip Challenge #" + calendarEvent.name,
                    start = calendarEvent.start,
                    end = calendarEvent.end,
                    description = description
                )
            )
        }
        return events
    }

    private fun getType(contentType: String): String {
        return if (contentType in arrayOf("image/png", "image/jpeg")) {
            "art"
        } else "music"
    }

    @PostMapping("/upload/{folder}")
    fun uploadFiles(
        @PathVariable("folder") destinationFolder: String,
        @RequestParam("securityToken") securityToken: String,
        @RequestBody requestBody: List<EventUpload>
    ): ResponseEntity<Any> {
/*        if (securityToken != token) {
            return ResponseEntity.badRequest().body("You are not authorized to do this request.");
        }*/
        // return ResponseEntity.ok(fileStorageService.uploadFilesToS3(destinationFolder, requestBody))
        return ResponseEntity.badRequest().body("You are not authorized to do this request.");
    }
}