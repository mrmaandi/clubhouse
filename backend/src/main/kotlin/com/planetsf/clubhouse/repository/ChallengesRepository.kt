package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.model.Challenge
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class ChallengesRepository(val jdbcTemplate: JdbcTemplate) {

    fun getEvents(): List<Challenge> {
        val sql = "SELECT * FROM challenges"

        val challenges: List<Challenge> = jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            Challenge(
                challengeNumber = rs.getInt("challenge_number").toLong()
            )
        }
        return challenges
    }
}