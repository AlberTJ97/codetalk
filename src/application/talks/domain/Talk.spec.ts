import { createApiTalk } from '../../../../test/mother/TalkMother'
import { MaximumCospeakersReachedError } from './errors/MaximumCospeakersReachedError'

describe('Talk', () => {
  it('fails if cospeakers are greater than 4', () => {
    const cospeakers = [
      '51cb0a36-0d61-49e3-89a1-276af899b028',
      '30ddf8ac-fdf1-4828-9df6-a42dd4e132db',
      '10705038-d0ec-4181-be58-6aa2e282ec3e',
      'c0650351-b6aa-4ae1-9ac6-30af6f8d3778',
    ]

    expect(() => createApiTalk({ cospeakers })).toThrowError(new MaximumCospeakersReachedError())
  })
})