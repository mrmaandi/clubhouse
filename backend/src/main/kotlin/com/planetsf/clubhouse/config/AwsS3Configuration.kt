package com.planetsf.clubhouse.config

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class AwsS3Configuration {
    @Value("\${aws.s3.access-key}") lateinit var accessKey: String
    @Value("\${aws.s3.secret-key}") lateinit var secretKey: String

    fun amazonS3Client(): AmazonS3 {
        val credentials = BasicAWSCredentials(accessKey, secretKey)
        return AmazonS3ClientBuilder
            .standard()
            .withRegion(Regions.EU_NORTH_1)
            .withCredentials(AWSStaticCredentialsProvider(credentials))
            .build()
    }
}