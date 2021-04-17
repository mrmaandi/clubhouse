package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.Entry
import com.planetsf.clubhouse.dto.EntryDto
import com.planetsf.clubhouse.repository.EntryRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
class EntryService(
    val fileStorageService: FileStorageService,
    val usersService: UsersService,
    val entryRepository: EntryRepository
) {
    @Value("\${aws.s3.base-url}")
    lateinit var baseUrl: String

    fun getEntries(): List<Entry> {
        val entryDtoList: List<EntryDto> = entryRepository.getEntries()
        val entries = mutableListOf<Entry>()

        for (entryDao in entryDtoList) {
            entries.add(
                Entry(
                    id = entryDao.id,
                    challengeNumber = entryDao.challengeId,
                    userId = entryDao.userId,
                    entryType = entryDao.entryType,
                    fileName = entryDao.fileName,
                    fileUrl = "$baseUrl/${entryDao.challengeId}/${entryDao.fileName}"
                )
            )
        }
        return entries
    }

    @Transactional
    fun addEntries(challengeId: Int, addEntryRequestList: List<AddEntryRequest>): Int {
        var users = usersService.getUsers()

        for (addEntryRequest in addEntryRequestList) {
            var userId: Long? = users.find { it.name == addEntryRequest.userName }?.id

            if (userId == null) {
                usersService.addUser(addEntryRequest.userName)
                users = usersService.getUsers()
                userId = users.find { it.name == addEntryRequest.userName }?.id
            }

            entryRepository.addEntry(challengeId, userId!!, addEntryRequest)
            fileStorageService.uploadFile(challengeId, addEntryRequest.fileName, addEntryRequest.fileContent)
        }
        return addEntryRequestList.size
    }
}