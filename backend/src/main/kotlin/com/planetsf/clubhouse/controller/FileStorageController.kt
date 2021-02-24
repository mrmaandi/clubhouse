package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.config.AwsS3Configuration
import com.planetsf.clubhouse.model.EventUpload
import com.planetsf.clubhouse.service.FileStorageService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("files")
class FileStorageController(private val configuration: AwsS3Configuration, private val fileStorageService: FileStorageService) {
    @Value("\${request.security-token}") lateinit var token: String

    @GetMapping("/list")
    fun getFiles() {
        val s3Client = configuration.amazonS3Client().listObjects("clubhouse-sample-flips")
        for (objectSummary in s3Client.objectSummaries) {
            println(objectSummary.key)
        }
    }

    @PostMapping("/upload/{folder}")
    fun uploadFiles(@PathVariable("folder") destinationFolder: String,
                    @RequestParam("securityToken") securityToken: String,
                    @RequestBody requestBody: List<EventUpload>): ResponseEntity<Any>
    {
        if (securityToken != token) {
            return ResponseEntity.badRequest().body("You are not authorized to do this request.");
        }

        return ResponseEntity.ok(fileStorageService.uploadFilesToS3(destinationFolder, requestBody))
    }
}