package com.planetsf.clubhouse.service

import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.amazonaws.services.s3.transfer.TransferManagerBuilder
import com.planetsf.clubhouse.config.AwsS3Configuration
import com.planetsf.clubhouse.model.EventUploads
import com.planetsf.clubhouse.scheduled.CalendarSync
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service


@Service
class FileStorageService(private val s3Configuration: AwsS3Configuration) {
    private val log: Logger = LoggerFactory.getLogger(CalendarSync::class.java)

    fun uploadFilesToS3(destinationFolder: String, requestBody: EventUploads) {
        val s3Client = s3Configuration.amazonS3Client()
        val transferManager = TransferManagerBuilder.standard()
            .withS3Client(s3Client)
            .withMultipartUploadThreshold((5 * 1024 * 1025).toLong())
            .build()

        for (eventUpload in requestBody.eventUploads) {
            val contentInputStream = eventUpload.fileContent.toByteArray().inputStream()

            val metadata = ObjectMetadata()
            metadata.addUserMetadata("userId", eventUpload.userId)
            metadata.contentLength = contentInputStream.available().toLong()

            val request = PutObjectRequest(
                "clubhouse-sample-flips/$destinationFolder",
                eventUpload.fileName,
                contentInputStream,
                metadata
            )

            request.metadata = metadata
            transferManager.upload(request)
        }
        log.info("Successfully uploaded to S3")
    }
}