import { SpeakerRepository } from '../../domain/SpeakerRepository'
import { SpeakerId } from '../../domain/SpeakerId'
import { Speaker, SpeakerPrimitives } from '../../domain/Speaker'

export class SpeakerRepositoryMemory implements SpeakerRepository {
  private speakers: Map<string, SpeakerPrimitives> = new Map()

  async save(speaker: Speaker): Promise<void> {
    const speakerPrimitives = speaker.toPrimitives()

    this.speakers.set(speakerPrimitives.id, speakerPrimitives)
  }

  async findById(id: SpeakerId): Promise<Speaker | undefined> {
    const speakerPrimitives = this.speakers.get(id.toPrimitives())

    if (!speakerPrimitives) return undefined

    return Speaker.fromPrimitives(speakerPrimitives)
  }

  async exists(id: SpeakerId): Promise<boolean> {
    return this.speakers.has(id.toPrimitives())
  }
}