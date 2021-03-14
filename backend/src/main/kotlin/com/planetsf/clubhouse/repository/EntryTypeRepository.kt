package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.enum.EntryTypeEnum
import com.planetsf.clubhouse.model.EntryType
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet


@Repository
class EntryTypeRepository(val jdbcTemplate: JdbcTemplate) {

    fun getEntryTypes(): List<EntryType> {
        val sql = "SELECT * FROM entry_types;"

        return jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            EntryType(
                id = rs.getInt("id").toLong(),
                type = EntryTypeEnum.valueOf(rs.getString("type"))
            )
        }
    }
}