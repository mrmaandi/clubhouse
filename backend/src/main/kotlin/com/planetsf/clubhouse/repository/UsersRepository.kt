package com.planetsf.clubhouse.repository

import com.planetsf.clubhouse.model.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.PreparedStatementCreator
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.jdbc.support.KeyHolder
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import org.springframework.jdbc.core.PreparedStatementCreatorFactory
import org.springframework.jdbc.core.SqlParameter
import java.sql.Types


@Repository
class UsersRepository(val jdbcTemplate: JdbcTemplate) {

    fun getUsers(): List<User> {
        val sql = "SELECT * FROM users;"

        return jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            User(
                id = rs.getInt("id").toLong(),
                name = rs.getString("name")
            )
        }
    }

    fun addUser(userName: String): Long {
        val sql = "INSERT INTO users (name) VALUES (?) ON CONFLICT (name) DO NOTHING;"
        val holder: KeyHolder = GeneratedKeyHolder()

        val decParams = listOf(
            SqlParameter(Types.VARCHAR, "name"),
        )
        val preparedStatementCreatorFactory: PreparedStatementCreatorFactory = object : PreparedStatementCreatorFactory(sql, decParams) {
            init {
                setReturnGeneratedKeys(true)
                setGeneratedKeysColumnNames("id")
            }
        }

        val psc: PreparedStatementCreator = preparedStatementCreatorFactory.newPreparedStatementCreator(listOf(userName))

        jdbcTemplate.update(psc, holder);

        return holder.key!!.toLong()
    }
}