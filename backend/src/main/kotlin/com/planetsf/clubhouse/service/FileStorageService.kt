package com.planetsf.clubhouse.service

import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.amazonaws.services.s3.transfer.TransferManagerBuilder
import com.planetsf.clubhouse.config.AwsS3Configuration
import com.planetsf.clubhouse.model.EventUpload
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

    fun uploadFile(destinationFolder: String, fileName: String, fileContent: String) {
        val s3Client = s3Configuration.amazonS3Client()
        val transferManager = TransferManagerBuilder.standard()
            .withS3Client(s3Client)
            .withMultipartUploadThreshold((5 * 1024 * 1025).toLong())
            .build()
        val fileDecodeBase64 =
            decodeBase64((fileContent.substring(fileContent.indexOf(",") + 1)).toByteArray())
        val fileInputStream: InputStream = ByteArrayInputStream(fileDecodeBase64)
        val request = PutObjectRequest(
            "clubhouse-sample-flips/$destinationFolder",
            fileName,
            fileInputStream,
            null
        )
        transferManager.upload(request)
    }
}