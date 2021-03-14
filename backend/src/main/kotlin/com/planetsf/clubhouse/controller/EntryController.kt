package com.planetsf.clubhouse.controller

import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.Entry
import com.planetsf.clubhouse.service.EntryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("entries")
class EntryController(private val entryService: EntryService) {
    @GetMapping
    fun getEntries(): List<Entry> {
        return entryService.getEntries()
    }

    @PostMapping("/{challengeId}/add-entries")
    fun addEntries(
        @PathVariable challengeId: String,
        @RequestBody requestBody: List<AddEntryRequest>): ResponseEntity<Int> {
        /*        if (securityToken != token) {
            return ResponseEntity.badRequest().body("You are not authorized to do this request.");
        }*/
        // return ResponseEntity.ok(fileStorageService.uploadFilesToS3(destinationFolder, requestBody))
        return ResponseEntity.ok(entryService.addEntries(challengeId, requestBody))
    }
}