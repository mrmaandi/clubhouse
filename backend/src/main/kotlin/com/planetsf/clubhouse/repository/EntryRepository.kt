package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.dto.EntryDto
import com.planetsf.clubhouse.enum.EntryType
import com.planetsf.clubhouse.model.AddEntryRequest
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class EntryRepository(val jdbcTemplate: JdbcTemplate) {
    fun addEntry(challengeId: Int, userId: Long, addEntryRequest: AddEntryRequest) {
        val sql = "INSERT INTO entries(challenge_id, user_id, file_name, type_id) SELECT ?, ?, ?, et.id FROM entry_types et WHERE et.type = ?;"

        jdbcTemplate.update(sql, challengeId, userId, addEntryRequest.fileName, addEntryRequest.entryType.name)
    }

    fun getEntries(): List<EntryDto> {
        val sql = "SELECT e.id, challenge_id, user_id, file_name, type FROM entries e LEFT JOIN entry_types et ON e.type_id = et.id;"

        return jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            EntryDto(
                id = rs.getLong("id"),
                challengeId = rs.getLong("challenge_id"),
                userId = rs.getLong("user_id"),
                entryType = EntryType.valueOf(rs.getString("type")),
                fileName = rs.getString("file_name"),
            )
        }
    }
}