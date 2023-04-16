import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../test/mother/SpeakerMother'
import { SpeakerNotFoundError } from '../domain/errors/SpeakerNotFoundError'
import { SpeakerId } from '../domain/SpeakerId'
import { SpeakerRepositoryMemory } from '../infrastructure/repositories/SpeakerRepositoryMemory'
import { GetSpeaker } from './GetSpeaker'

describe('GetSpeaker', () => {
  let speakerRepository: SpeakerRepositoryMemory

  beforeEach(() => {
    speakerRepository = new SpeakerRepositoryMemory()
  })

  it('returns the speaker by id', async () => {
    const expectedSpeakerId = createJoyceLinId()
    await speakerRepository.save(createJoyceLinSpeaker())
    const getSpeakerUseCase = new GetSpeaker(speakerRepository)

    const speaker = await getSpeakerUseCase.execute(expectedSpeakerId)

    const expectedSpeaker = createJoyceLinSpeaker({ id: expectedSpeakerId })
    expect(speaker).toEqual(expectedSpeaker)
  })

  it('fails if the speaker does not exist', async () => {
    const notExistentId = new SpeakerId('invalid-id')
    const getSpeakerUseCase = new GetSpeaker(speakerRepository)

    const expectedError = new SpeakerNotFoundError(notExistentId)
    await expect(getSpeakerUseCase.execute(notExistentId)).rejects.toThrowError(expectedError)
  })
})
