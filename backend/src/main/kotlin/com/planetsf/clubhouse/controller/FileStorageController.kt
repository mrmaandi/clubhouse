package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.config.AwsS3Configuration
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("events")
class FileStorageController(private val configuration: AwsS3Configuration) {

    @GetMapping("/files")
    fun events() {
        val ol = configuration.amazonS3Client().listObjects("clubhouse-sample-flips")
        for (objectSummary in ol.objectSummaries) {
            println(objectSummary.key)
        }
    }
}