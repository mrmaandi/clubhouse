package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.enum.EntryTypeEnum
import com.planetsf.clubhouse.model.AddEntryRequest
import com.planetsf.clubhouse.model.Entry
import com.planetsf.clubhouse.model.EntryType
import com.planetsf.clubhouse.repository.ChallengesRepository
import com.planetsf.clubhouse.repository.EntryRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service


@Service
class EntryService(
    val fileStorageService: FileStorageService,
    val usersService: UsersService,
    val entryTypeService: EntryTypeService,
    val entryRepository: EntryRepository,
    val challengesRepository: ChallengesRepository
) {
    @Value("\${aws.s3.base-url}")
    lateinit var baseUrl: String

    fun getEntries(): List<Entry> {
        val entryDaoList = entryRepository.getEntries()
        val entryTypes = entryTypeService.getEntryTypes()

        val entries = mutableListOf<Entry>()
        for (entryDao in entryDaoList) {
            entries.add(
                Entry(
                    id = entryDao.id,
                    challengeNumber = entryDao.challengeId,
                    userId = entryDao.userId,
                    entryType = getEntryType(entryTypes, entryDao.entryTypeId),
                    fileName = entryDao.fileName,
                    fileUrl = "$baseUrl${entryDao.challengeId}/${entryDao.fileName}"
                )
            )
        }
        return entries
    }

    fun addEntries(challengeId: String, entries: List<AddEntryRequest>): Int {
        var userIds = usersService.getUsers()
        val entryTypes = entryTypeService.getEntryTypes()

        for (entry in entries) {
            var userId: Long? = userIds.find { it.name == entry.userName }?.id

            if (userId == null) {
                usersService.addUser(entry.userName)
                userIds = usersService.getUsers()
                userId = userIds.find { it.name == entry.userName }?.id
            }

            entryTypes.find { it.type == EntryTypeEnum.valueOf(entry.entryType) }
                ?.let { entryType -> entryRepository.addEntry(challengeId, userId!!, entryType.id, entry) }
            fileStorageService.uploadFile(challengeId, entry.fileName, entry.fileContent)
        }
        return entries.size
    }

    private fun getEntryType(entryTypes: List<EntryType>, entryTypeId: Long): EntryTypeEnum {
        return entryTypes.first { it.id == entryTypeId }.type
    }
}