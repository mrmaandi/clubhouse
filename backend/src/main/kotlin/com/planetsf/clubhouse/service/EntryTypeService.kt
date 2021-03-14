package com.planetsf.clubhouse.service

import com.planetsf.clubhouse.model.*
import com.planetsf.clubhouse.repository.ChallengesRepository
import com.planetsf.clubhouse.repository.EntryTypeRepository
import com.planetsf.clubhouse.repository.UsersRepository
import org.springframework.stereotype.Service


@Service
class EntryTypeService(
    val entryTypeRepository: EntryTypeRepository
) {
    fun getEntryTypes(): List<EntryType> {
        return entryTypeRepository.getEntryTypes()
    }
}