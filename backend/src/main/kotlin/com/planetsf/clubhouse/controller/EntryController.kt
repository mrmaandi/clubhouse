package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.Entry
import com.planetsf.clubhouse.service.EntryService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.lang.Exception


@RestController
@RequestMapping("entries")
class EntryController(private val entryService: EntryService) {
    @Value("\${request.security-token}")
    lateinit var token: String

    @GetMapping
    fun getEntries(): List<Entry> {
        return entryService.getEntries()
    }

    @PostMapping("/{challengeId}/add-entries")
    fun addEntries(
        @PathVariable challengeId: Int,
        @RequestParam securityToken: String,
        @RequestBody addEntryRequestList: List<AddEntryRequest>): ResponseEntity<Any> {
        if (token != securityToken) {
            return ResponseEntity.badRequest().body("You are not authorized to make this request.");
        }

        return try {
            val result = entryService.addEntries(challengeId, addEntryRequestList)
            ResponseEntity.ok(result)
        } catch (exception: Exception) {
            ResponseEntity.badRequest().body("An error occurred while trying to add entries.")
        }
    }
}