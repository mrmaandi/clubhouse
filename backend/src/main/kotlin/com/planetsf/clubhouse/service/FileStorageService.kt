package com.planetsf.clubhouse.service

import com.amazonaws.services.s3.model.PutObjectRequest
import com.amazonaws.services.s3.transfer.TransferManagerBuilder
import com.planetsf.clubhouse.config.AwsS3Configuration
import org.apache.tomcat.util.codec.binary.Base64.decodeBase64
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.InputStream


@Service
class FileStorageService(private val s3Configuration: AwsS3Configuration) {
    @Value("\${aws.s3.bucket}")
    lateinit var bucket: String

    fun uploadFile(destinationFolder: Int, fileName: String, fileContent: String) {
        val client = s3Configuration.amazonS3Client()
        val transferManager = TransferManagerBuilder.standard()
            .withS3Client(client)
            .withMultipartUploadThreshold((5 * 1024 * 1025).toLong())
            .build()
        val fileDecodedBase64 =
            decodeBase64((fileContent.substring(fileContent.indexOf(",") + 1)).toByteArray())
        val fileInputStream: InputStream = ByteArrayInputStream(fileDecodedBase64)
        val request = PutObjectRequest(
            "$bucket/$destinationFolder",
            fileName,
            fileInputStream,
            null
        )
        transferManager.upload(request)
    }
}