package com.planetsf.clubhouse.service

import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.amazonaws.services.s3.transfer.TransferManagerBuilder
import com.planetsf.clubhouse.config.AwsS3Configuration
import com.planetsf.clubhouse.model.EventUpload
import com.planetsf.clubhouse.model.EventUploads
import com.planetsf.clubhouse.scheduled.CalendarSync
import org.apache.tomcat.util.codec.binary.Base64.decodeBase64
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream

import java.io.InputStream


@Service
class FileStorageService(private val s3Configuration: AwsS3Configuration) {
    private val log: Logger = LoggerFactory.getLogger(CalendarSync::class.java)

    fun uploadFilesToS3(destinationFolder: String, requestBody: List<EventUpload>) {
        val s3Client = s3Configuration.amazonS3Client()
        val transferManager = TransferManagerBuilder.standard()
            .withS3Client(s3Client)
            .withMultipartUploadThreshold((5 * 1024 * 1025).toLong())
            .build()

        for (eventUpload in requestBody) {
            val base64EncodedFileContent = eventUpload.fileContent;
            val fileDecodeBase64 = decodeBase64((base64EncodedFileContent.substring(base64EncodedFileContent.indexOf(",")+1)).toByteArray())
            val fileInputStream: InputStream = ByteArrayInputStream(fileDecodeBase64)

            val metadata = ObjectMetadata()
            metadata.addUserMetadata("userId", eventUpload.userId)
            metadata.contentLength = fileInputStream.available().toLong()
            metadata.contentType = eventUpload.fileType

            val request = PutObjectRequest(
                "clubhouse-sample-flips/$destinationFolder",
                eventUpload.fileName,
                fileInputStream,
                metadata
            )

            request.metadata = metadata
            transferManager.upload(request)
        }
        log.info("Successfully uploaded to S3")
    }
}