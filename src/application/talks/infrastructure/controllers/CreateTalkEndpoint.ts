import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { CreateTalkUseCase } from '../../use-cases/CreateTalkUsecase'
import { CreateTalkRequestDTO } from './dtos/CreateTalkRequestDTO'
import { TalkId } from '../../domain/TalkId'
import { TalkTitle } from '../../domain/TalkTitle'
import { TalkDescription } from '../../domain/TalkDescription'

@Controller('/v1/talks')
export class CreateTalkEndpoint {
  constructor(private readonly createTalk: CreateTalkUseCase) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Creates a talk',
    status: HttpStatus.CREATED,
  })
  @Post()
  async execute(@Body() body: CreateTalkRequestDTO) {
    await this.createTalk.execute({
      id: TalkId.fromPrimitives(body.id),
      title: TalkTitle.fromPrimitives(body.title),
      description: TalkDescription.fromPrimitives(body.description),
      cospeakers: body.cospeakers,
      language: body.language,
    })
  }
}
