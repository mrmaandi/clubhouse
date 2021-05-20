package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.dto.UserDto
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet


@Repository
class UsersRepository(val jdbcTemplate: JdbcTemplate) {
    fun getUsers(): List<UserDto> {
        val sql = "SELECT * FROM users;"

        return jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            UserDto(
                id = rs.getInt("id").toLong(),
                name = rs.getString("name")
            )
        }
    }

    fun addUser(userName: String) {
        val sql = "INSERT INTO users (name) VALUES (?) ON CONFLICT (name) DO NOTHING;"

        jdbcTemplate.update(sql, userName)
    }
}