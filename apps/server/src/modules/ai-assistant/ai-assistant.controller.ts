import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AIAssistantService } from './ai-assistant.service';

class AssistantAttachmentDto {
  @IsOptional()
  @IsString()
  type?: 'image' | 'text';

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  data?: string;
}

class AskAssistantDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssistantAttachmentDto)
  attachments?: AssistantAttachmentDto[];
}

@Controller('api/ai')
export class AIAssistantController {
  constructor(private readonly aiAssistantService: AIAssistantService) {}

  @Post('ask')
  @HttpCode(HttpStatus.OK)
  async ask(@Body() body: AskAssistantDto) {
    const message = body?.message?.trim();

    if (!message) {
      return {
        success: false,
        message: 'Please provide a question or prompt.',
        data: null,
      };
    }

    const attachmentSummary = (body.attachments ?? [])
      .map((attachment) => {
        if (!attachment?.name) {
          return null;
        }

        if (attachment?.type === 'image') {
          return `${attachment.name} (image attachment)`;
        }

        if (attachment?.type === 'text' || attachment?.data) {
          try {
            const rawData = attachment.data ?? '';
            const decodedText = rawData
              ? Buffer.from(rawData, 'base64')
                  .toString('utf-8')
                  .replace(/\s+/g, ' ')
                  .trim()
              : '';

            if (decodedText) {
              return `${attachment.name} (text attachment: ${decodedText.slice(0, 500)})`;
            }

            return `${attachment.name} (text attachment)`;
          } catch {
            return `${attachment.name} (text attachment)`;
          }
        }

        return `${attachment.name} attachment`;
      })
      .filter(Boolean)
      .join(', ');

    return {
      success: true,
      message: 'Assistant answer generated successfully',
      data: {
        reply: await this.aiAssistantService.generateAnswer(
          message,
          attachmentSummary,
        ),
        timestamp: new Date().toISOString(),
      },
    };
  }
}
