package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.model.AddChallengeRequest
import com.planetsf.clubhouse.dto.ChallengeDto
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Repository
class ChallengesRepository(val jdbcTemplate: JdbcTemplate) {
    fun getChallenges(): List<ChallengeDto> {
        val sql = "SELECT * FROM challenges"

        return jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            ChallengeDto(
                id = rs.getInt("id").toLong(),
                challengeNumber = rs.getInt("challenge_number").toLong(),
                name = rs.getString("name"),
                startTime = rs.getTimestamp("start_time").toLocalDateTime(),
                endTime = rs.getTimestamp("end_time").toLocalDateTime(),
            )
        }
    }

    fun addChallenge(request: AddChallengeRequest) {
        val sql = "INSERT INTO challenges(challenge_number, name, start_time, end_time) VALUES (?, ?, ?, ?)"

        val formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("YYYY-MM-DD HH:mm")

        jdbcTemplate.update(
            sql,
            request.challengeNumber,
            request.name,
            LocalDateTime.parse(request.startTime, formatter),
            LocalDateTime.parse(request.endTime, formatter)
        )
    }
}