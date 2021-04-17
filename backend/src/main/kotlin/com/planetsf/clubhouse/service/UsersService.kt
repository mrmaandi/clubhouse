package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.model.User
import com.planetsf.clubhouse.repository.UsersRepository
import org.springframework.stereotype.Service


@Service
class UsersService(
    val usersRepository: UsersRepository
) {
    fun getUsers(): List<User> {
        return usersRepository.getUsers()
    }

    fun addUser(userName: String) {
        usersRepository.addUser(userName)
    }
}