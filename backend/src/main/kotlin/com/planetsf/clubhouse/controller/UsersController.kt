package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.dto.UserDto
import com.planetsf.clubhouse.service.UsersService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("users")
class UsersController(private val usersService: UsersService) {

    @GetMapping
    fun getUsers(): List<UserDto> {
        return usersService.getUsers()
    }
}