package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.model.User
import com.planetsf.clubhouse.service.UsersService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("users")
class UsersController(private val usersService: UsersService) {

    @GetMapping
    fun getUsers(): List<User> {
        return usersService.getUsers()
    }
}