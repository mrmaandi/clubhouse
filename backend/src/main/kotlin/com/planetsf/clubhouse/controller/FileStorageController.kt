package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.config.AwsS3Configuration
import com.planetsf.clubhouse.model.EventUploads
import com.planetsf.clubhouse.service.FileStorageService
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("files")
class FileStorageController(private val configuration: AwsS3Configuration, private val fileStorageService: FileStorageService) {

    @GetMapping("/list")
    fun getFiles() {
        val s3Client = configuration.amazonS3Client().listObjects("clubhouse-sample-flips")
        for (objectSummary in s3Client.objectSummaries) {
            println(objectSummary.key)
        }
    }

    @PostMapping("/upload/{folder}")
    fun uploadFiles(@PathVariable("folder") destinationFolder: String, @RequestBody requestBody: EventUploads) {
        fileStorageService.uploadFilesToS3(destinationFolder, requestBody)
    }
}