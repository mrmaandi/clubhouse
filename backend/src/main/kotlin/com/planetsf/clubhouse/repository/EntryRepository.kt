package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.EntryDao
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class EntryRepository(val jdbcTemplate: JdbcTemplate) {
    fun addEntry(challengeId: String, userId: Long, entryTypeId: Long, request: AddEntryRequest) {
        val sql = "INSERT INTO entries(challenge_id, user_id, type_id, file_name) VALUES(?, ?, ?, ?);"

        jdbcTemplate.update(sql, challengeId.toLong(), userId, entryTypeId, request.fileName)
    }

    fun getEntries(): List<EntryDao> {
        val sql = "SELECT * FROM entries"

        val entries: List<EntryDao> = jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            EntryDao(
                id = rs.getLong("id"),
                challengeId = rs.getLong("challenge_id"),
                userId = rs.getLong("user_id"),
                entryTypeId = rs.getLong("type_id"),
                fileName = rs.getString("file_name"),
            )
        }
        return entries
    }
}