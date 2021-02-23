package com.planetsf.clubhouse

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class ClubhouseApplication

fun main(args: Array<String>) {
    runApplication<ClubhouseApplication>(*args)
}
