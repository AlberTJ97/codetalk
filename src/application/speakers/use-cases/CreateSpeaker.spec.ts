import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../test/mother/SpeakerMother'
import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { EmailAddress } from '../../shared/domain/EmailAddress'
import { Language } from '../../shared/domain/Language'
import { SpeakerAlreadyCreatedError } from '../domain/errors/SpeakerAlreadyCreatedError'
import { SpeakerAge } from '../domain/SpeakerAge'
import { SpeakerName } from '../domain/SpeakerName'
import { SpeakerRepository } from '../domain/SpeakerRepository'
import { SpeakerRepositoryMemory } from '../infrastructure/repositories/SpeakerRepositoryMemory'
import { CreateSpeaker, CreateSpeakerParams } from './CreateSpeaker'

function joyceLinParams(): CreateSpeakerParams {
  return {
    id: createJoyceLinId(),
    name: new SpeakerName(JOYCE_LIN.name),
    age: new SpeakerAge(JOYCE_LIN.age),
    email: new EmailAddress(JOYCE_LIN.email),
    language: Language.ENGLISH,
  }
}

describe('CreateSpeaker', () => {
  let speakerRepository: SpeakerRepository

  beforeEach(() => {
    speakerRepository = new SpeakerRepositoryMemory()
  })

  it('saves the speaker in the repository', async () => {
    const createSpeaker = new CreateSpeaker(speakerRepository)
    const joyceLinId = createJoyceLinId()
    const params = joyceLinParams()

    await createSpeaker.execute(params)

    expect(speakerRepository.exists(joyceLinId)).toBeTruthy()
  })

  it('has a non validated email', async () => {
    const createSpeaker = new CreateSpeaker(speakerRepository)
    const joyceLinId = createJoyceLinId()
    const params = joyceLinParams()

    await createSpeaker.execute(params)

    const speaker = await speakerRepository.findById(joyceLinId)
    expect(speaker?.hasValidatedEmail()).toBe(false)
  })

  it('fails if event already exists', async () => {
    await speakerRepository.save(createJoyceLinSpeaker())
    const createSpeaker = new CreateSpeaker(speakerRepository)
    const joyceLinId = createJoyceLinId()
    const params = joyceLinParams()

    const expectedError = new SpeakerAlreadyCreatedError(joyceLinId)
    await expect(createSpeaker.execute(params)).rejects.toThrowError(expectedError)
  })
})
